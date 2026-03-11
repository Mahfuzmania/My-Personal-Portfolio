import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { hashPassword, verifyPassword } from "@/lib/auth-password";
import { adminRoleSchema } from "@/lib/admin-permissions";

const adminUserSchema = z.object({
  id: z.string().min(3),
  username: z.string().min(3).max(128),
  role: adminRoleSchema,
  active: z.boolean(),
  passwordHash: z.string().min(16),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const adminUserFileSchema = z.object({
  users: z.array(adminUserSchema),
});

type AdminUserRecord = z.infer<typeof adminUserSchema>;

export type AdminUserPublic = Omit<AdminUserRecord, "passwordHash">;

const adminUsersDir = path.join(process.cwd(), "data");
const adminUsersFile = path.join(adminUsersDir, "admin-users.json");

const createUserSchema = z.object({
  username: z.string().min(3).max(128),
  password: z.string().min(8).max(256),
  role: adminRoleSchema,
});

const updateUserSchema = z.object({
  role: adminRoleSchema.optional(),
  active: z.boolean().optional(),
  newPassword: z.string().min(8).max(256).optional(),
});

function normalizeUsername(value: string) {
  return value.trim().toLowerCase();
}

function toPublicUser(user: AdminUserRecord): AdminUserPublic {
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    active: user.active,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function buildBootstrapUserFromEnv(): AdminUserRecord | null {
  const username = normalizeUsername(process.env.ADMIN_USERNAME ?? "");
  const passwordHash = process.env.ADMIN_PASSWORD_HASH ?? "";
  if (!username || !passwordHash) {
    return null;
  }

  const now = new Date().toISOString();
  return {
    id: "local-admin",
    username,
    role: "owner",
    active: true,
    passwordHash,
    createdAt: now,
    updatedAt: now,
  };
}

async function writeUsers(users: AdminUserRecord[]) {
  await fs.mkdir(adminUsersDir, { recursive: true });
  await fs.writeFile(adminUsersFile, JSON.stringify({ users }, null, 2), "utf-8");
}

async function readUsers(): Promise<AdminUserRecord[]> {
  await fs.mkdir(adminUsersDir, { recursive: true });

  let users: AdminUserRecord[] = [];
  try {
    const raw = await fs.readFile(adminUsersFile, "utf-8");
    const parsed = adminUserFileSchema.parse(JSON.parse(raw));
    users = parsed.users.map((user) => ({
      ...user,
      username: normalizeUsername(user.username),
    }));
  } catch {
    users = [];
  }

  const bootstrap = buildBootstrapUserFromEnv();
  let changed = false;

  if (bootstrap && !users.some((user) => user.username === bootstrap.username)) {
    users.unshift(bootstrap);
    changed = true;
  }

  const hasActiveOwner = users.some((user) => user.role === "owner" && user.active);
  if (!hasActiveOwner && users.length > 0) {
    users[0] = {
      ...users[0],
      role: "owner",
      active: true,
      updatedAt: new Date().toISOString(),
    };
    changed = true;
  }

  if (changed || !(await fileExists(adminUsersFile))) {
    await writeUsers(users);
  }

  return users;
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function assertOwnerSafety(before: AdminUserRecord[], after: AdminUserRecord[]) {
  const beforeOwners = before.filter((user) => user.role === "owner" && user.active).length;
  const afterOwners = after.filter((user) => user.role === "owner" && user.active).length;
  if (beforeOwners > 0 && afterOwners === 0) {
    throw new Error("At least one active owner account is required.");
  }
}

export async function listAdminUsers() {
  const users = await readUsers();
  return users.map(toPublicUser);
}

export async function verifyAdminCredentials(username: string, rawPassword: string): Promise<AdminUserPublic | null> {
  const users = await readUsers();
  const normalizedUsername = normalizeUsername(username);
  const user = users.find((item) => item.username === normalizedUsername && item.active);
  if (!user) {
    return null;
  }

  const valid = await verifyPassword(rawPassword, user.passwordHash);
  if (!valid) {
    return null;
  }

  return toPublicUser(user);
}

export async function createAdminUser(input: z.infer<typeof createUserSchema>) {
  const payload = createUserSchema.parse({
    ...input,
    username: normalizeUsername(input.username),
  });

  const users = await readUsers();
  if (users.some((user) => user.username === payload.username)) {
    throw new Error("A user with this username already exists.");
  }

  const now = new Date().toISOString();
  const passwordHash = await hashPassword(payload.password);
  const nextUser: AdminUserRecord = {
    id: randomUUID(),
    username: payload.username,
    role: payload.role,
    active: true,
    passwordHash,
    createdAt: now,
    updatedAt: now,
  };

  const nextUsers = [...users, nextUser];
  await writeUsers(nextUsers);
  return toPublicUser(nextUser);
}

export async function updateAdminUser(id: string, updates: z.infer<typeof updateUserSchema>) {
  const payload = updateUserSchema.parse(updates);
  const users = await readUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) {
    return null;
  }

  const current = users[index];
  const next: AdminUserRecord = {
    ...current,
    role: payload.role ?? current.role,
    active: payload.active ?? current.active,
    updatedAt: new Date().toISOString(),
  };

  if (payload.newPassword) {
    next.passwordHash = await hashPassword(payload.newPassword);
  }

  const nextUsers = [...users];
  nextUsers[index] = next;
  assertOwnerSafety(users, nextUsers);
  await writeUsers(nextUsers);
  return toPublicUser(next);
}

export async function changeCurrentAdminPassword(userId: string, currentPassword: string, newPassword: string) {
  const users = await readUsers();
  const index = users.findIndex((user) => user.id === userId);
  if (index < 0) {
    throw new Error("User account not found.");
  }

  const account = users[index];
  const validCurrent = await verifyPassword(currentPassword, account.passwordHash);
  if (!validCurrent) {
    throw new Error("Current password is incorrect.");
  }

  const nextPasswordHash = await hashPassword(newPassword);
  const nextUsers = [...users];
  nextUsers[index] = {
    ...account,
    passwordHash: nextPasswordHash,
    updatedAt: new Date().toISOString(),
  };
  await writeUsers(nextUsers);
  return toPublicUser(nextUsers[index]);
}

export async function setAdminPasswordByUsername(username: string, newPassword: string) {
  const normalizedUsername = normalizeUsername(username);
  const users = await readUsers();
  const index = users.findIndex((user) => user.username === normalizedUsername);
  if (index < 0) {
    return null;
  }

  const nextUsers = [...users];
  nextUsers[index] = {
    ...nextUsers[index],
    passwordHash: await hashPassword(newPassword),
    updatedAt: new Date().toISOString(),
  };
  await writeUsers(nextUsers);
  return toPublicUser(nextUsers[index]);
}
