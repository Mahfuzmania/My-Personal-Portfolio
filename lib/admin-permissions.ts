import { z } from "zod";

export const adminRoles = ["owner", "admin", "editor", "viewer"] as const;
export const adminRoleSchema = z.enum(adminRoles);

export type AdminRole = z.infer<typeof adminRoleSchema>;
export type AdminPermission =
  | "content.read"
  | "content.write"
  | "blog.read"
  | "blog.write"
  | "inbox.read"
  | "inbox.write"
  | "users.manage";

const permissionMap: Record<AdminRole, AdminPermission[]> = {
  owner: ["content.read", "content.write", "blog.read", "blog.write", "inbox.read", "inbox.write", "users.manage"],
  admin: ["content.read", "content.write", "blog.read", "blog.write", "inbox.read", "inbox.write", "users.manage"],
  editor: ["content.read", "content.write", "blog.read", "blog.write", "inbox.read", "inbox.write"],
  viewer: ["content.read", "blog.read", "inbox.read"],
};

export function normalizeAdminRole(role: string | undefined | null): AdminRole {
  const parsed = adminRoleSchema.safeParse(role ?? "");
  return parsed.success ? parsed.data : "viewer";
}

export function hasAdminPermission(role: string | undefined | null, permission: AdminPermission) {
  const normalizedRole = normalizeAdminRole(role);
  return permissionMap[normalizedRole].includes(permission);
}
