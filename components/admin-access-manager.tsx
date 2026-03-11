"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type AdminRole = "owner" | "admin" | "editor" | "viewer";

type AdminUser = {
  id: string;
  username: string;
  role: AdminRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

type UserDraft = {
  role: AdminRole;
  active: boolean;
  newPassword: string;
};

const fallbackRoleOptions: AdminRole[] = ["owner", "admin", "editor", "viewer"];

export function AdminAccessManager() {
  const [csrfToken, setCsrfToken] = useState("");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [drafts, setDrafts] = useState<Record<string, UserDraft>>({});
  const [roleOptions, setRoleOptions] = useState<AdminRole[]>(fallbackRoleOptions);
  const [canManageUsers, setCanManageUsers] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [userError, setUserError] = useState<string | null>(null);

  const [newUsername, setNewUsername] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState<AdminRole>("editor");

  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [changingPassword, setChangingPassword] = useState(false);

  const usersById = useMemo(() => {
    return Object.fromEntries(users.map((user) => [user.id, user]));
  }, [users]);

  useEffect(() => {
    let ignore = false;
    fetch("/api/admin/csrf")
      .then((response) => response.json())
      .then((payload: { token?: string }) => {
        if (!ignore && payload?.token) {
          setCsrfToken(payload.token);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  async function loadUsers() {
    setLoadingUsers(true);
    setUserError(null);
    setUserStatus(null);
    try {
      const response = await fetch("/api/admin/users", {
        method: "GET",
        cache: "no-store",
      });
      const data = await response.json();

      if (response.status === 403) {
        setCanManageUsers(false);
        setUsers([]);
        setDrafts({});
        setLoadingUsers(false);
        return;
      }

      if (!response.ok) {
        setUserError(data.error ?? "Unable to load user accounts.");
        setLoadingUsers(false);
        return;
      }

      const nextUsers = (data.users ?? []) as AdminUser[];
      const nextRoles = (data.roleOptions ?? fallbackRoleOptions) as AdminRole[];
      setCanManageUsers(true);
      setUsers(nextUsers);
      setRoleOptions(nextRoles);
      setDrafts(
        Object.fromEntries(
          nextUsers.map((user) => [
            user.id,
            {
              role: user.role,
              active: user.active,
              newPassword: "",
            },
          ]),
        ),
      );
      setLoadingUsers(false);
    } catch {
      setLoadingUsers(false);
      setUserError("Network error. Unable to load user accounts.");
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadUsers();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function handleCreateUser(event: FormEvent) {
    event.preventDefault();
    setUserError(null);
    setUserStatus(null);

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(csrfToken ? { "x-csrf-token": csrfToken } : {}),
        },
        body: JSON.stringify({
          username: newUsername.trim(),
          password: newUserPassword,
          role: newUserRole,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setUserError(data.details ?? data.error ?? "Unable to create user.");
        return;
      }

      setNewUsername("");
      setNewUserPassword("");
      setNewUserRole("editor");
      setUserStatus("User account created.");
      await loadUsers();
    } catch {
      setUserError("Network error. Unable to create user.");
    }
  }

  async function handleSaveUser(userId: string) {
    const draft = drafts[userId];
    const baseline = usersById[userId];
    if (!draft || !baseline) {
      return;
    }

    const payload: { role?: AdminRole; active?: boolean; newPassword?: string } = {};
    if (draft.role !== baseline.role) {
      payload.role = draft.role;
    }
    if (draft.active !== baseline.active) {
      payload.active = draft.active;
    }
    if (draft.newPassword.trim()) {
      payload.newPassword = draft.newPassword.trim();
    }
    if (!Object.keys(payload).length) {
      setUserStatus("No changes to save.");
      setUserError(null);
      return;
    }

    setUserError(null);
    setUserStatus(null);

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(csrfToken ? { "x-csrf-token": csrfToken } : {}),
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        setUserError(data.details ?? data.error ?? "Unable to update user.");
        return;
      }

      setUserStatus("User updated.");
      await loadUsers();
    } catch {
      setUserError("Network error. Unable to update user.");
    }
  }

  async function handleChangePassword(event: FormEvent) {
    event.preventDefault();
    setPasswordError(null);
    setPasswordStatus(null);

    if (nextPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    setChangingPassword(true);
    try {
      const response = await fetch("/api/admin/account/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(csrfToken ? { "x-csrf-token": csrfToken } : {}),
        },
        body: JSON.stringify({
          currentPassword,
          newPassword: nextPassword,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setPasswordError(data.details ?? data.error ?? "Unable to change password.");
        setChangingPassword(false);
        return;
      }

      setCurrentPassword("");
      setNextPassword("");
      setConfirmPassword("");
      setChangingPassword(false);
      setPasswordStatus("Password changed successfully.");
    } catch {
      setChangingPassword(false);
      setPasswordError("Network error. Unable to change password.");
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
      <article className="card card-pad">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Security</p>
        <h2 className="section-title mt-2 text-2xl font-semibold tracking-tight">Change Password</h2>
        <p className="mt-2 text-sm text-muted">Update your current admin password without editing environment files.</p>

        <form className="mt-4 grid gap-3" onSubmit={handleChangePassword}>
          <label className="grid gap-1.5 text-sm">
            <span className="text-muted">Current password</span>
            <input
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className="rounded-xl border border-border bg-surface px-3 py-2.5"
              required
              minLength={8}
            />
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="text-muted">New password</span>
            <input
              type="password"
              value={nextPassword}
              onChange={(event) => setNextPassword(event.target.value)}
              className="rounded-xl border border-border bg-surface px-3 py-2.5"
              required
              minLength={8}
            />
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="text-muted">Confirm new password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="rounded-xl border border-border bg-surface px-3 py-2.5"
              required
              minLength={8}
            />
          </label>
          <button
            type="submit"
            disabled={changingPassword}
            className="mt-1 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-70"
          >
            {changingPassword ? "Updating..." : "Update Password"}
          </button>
        </form>

        {passwordStatus ? <p className="mt-3 text-sm text-emerald-400">{passwordStatus}</p> : null}
        {passwordError ? <p className="mt-3 text-sm text-red-400">{passwordError}</p> : null}
      </article>

      <article className="card card-pad">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Access Control</p>
            <h2 className="section-title mt-2 text-2xl font-semibold tracking-tight">Users and Roles</h2>
            <p className="mt-2 text-sm text-muted">Add admin users, assign roles, and rotate credentials.</p>
          </div>
          <button
            type="button"
            onClick={loadUsers}
            disabled={loadingUsers}
            className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent/50 hover:text-accent disabled:opacity-60"
          >
            {loadingUsers ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {!canManageUsers ? (
          <p className="mt-4 rounded-xl border border-border bg-surface/75 p-3 text-sm text-muted">
            Your account can edit content, but user and role management is restricted to owner/admin roles.
          </p>
        ) : (
          <>
            <form className="mt-4 grid gap-3 rounded-xl border border-border bg-surface/75 p-3 md:grid-cols-[1.2fr_1fr_0.9fr_auto] md:items-end" onSubmit={handleCreateUser}>
              <label className="grid gap-1.5 text-sm">
                <span className="text-muted">Username</span>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(event) => setNewUsername(event.target.value)}
                  className="rounded-xl border border-border bg-surface px-3 py-2.5"
                  required
                  minLength={3}
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="text-muted">Temporary password</span>
                <input
                  type="password"
                  value={newUserPassword}
                  onChange={(event) => setNewUserPassword(event.target.value)}
                  className="rounded-xl border border-border bg-surface px-3 py-2.5"
                  required
                  minLength={8}
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="text-muted">Role</span>
                <select
                  value={newUserRole}
                  onChange={(event) => setNewUserRole(event.target.value as AdminRole)}
                  className="rounded-xl border border-border bg-surface px-3 py-2.5"
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                Add User
              </button>
            </form>

            <div className="mt-4 grid gap-2">
              {users.map((user) => {
                const draft = drafts[user.id];
                if (!draft) {
                  return null;
                }
                return (
                  <div key={user.id} className="grid gap-2 rounded-xl border border-border bg-surface/75 p-3 md:grid-cols-[1.35fr_0.85fr_0.8fr_1fr_auto] md:items-end">
                    <div className="grid gap-0.5">
                      <p className="text-sm font-semibold">{user.username}</p>
                      <p className="text-xs text-muted">Updated {new Date(user.updatedAt).toLocaleString()}</p>
                    </div>
                    <label className="grid gap-1 text-sm">
                      <span className="text-muted">Role</span>
                      <select
                        value={draft.role}
                        onChange={(event) =>
                          setDrafts((current) => ({
                            ...current,
                            [user.id]: { ...current[user.id], role: event.target.value as AdminRole },
                          }))
                        }
                        className="rounded-xl border border-border bg-surface px-3 py-2.5"
                      >
                        {roleOptions.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-1 text-sm">
                      <span className="text-muted">Status</span>
                      <select
                        value={draft.active ? "active" : "inactive"}
                        onChange={(event) =>
                          setDrafts((current) => ({
                            ...current,
                            [user.id]: { ...current[user.id], active: event.target.value === "active" },
                          }))
                        }
                        className="rounded-xl border border-border bg-surface px-3 py-2.5"
                      >
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                      </select>
                    </label>
                    <label className="grid gap-1 text-sm">
                      <span className="text-muted">Reset password (optional)</span>
                      <input
                        type="password"
                        value={draft.newPassword}
                        onChange={(event) =>
                          setDrafts((current) => ({
                            ...current,
                            [user.id]: { ...current[user.id], newPassword: event.target.value },
                          }))
                        }
                        className="rounded-xl border border-border bg-surface px-3 py-2.5"
                        minLength={8}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => handleSaveUser(user.id)}
                      className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent/50 hover:text-accent"
                    >
                      Save
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {userStatus ? <p className="mt-3 text-sm text-emerald-400">{userStatus}</p> : null}
        {userError ? <p className="mt-3 text-sm text-red-400">{userError}</p> : null}
      </article>
    </div>
  );
}
