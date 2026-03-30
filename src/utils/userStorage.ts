// src/utils/userStorage.ts

const USER_KEY = "user_info";

export interface UserInfo {
  id: string | number;
  name: string;
  email: string;
}

// ── Save ──────────────────────────────────────────────────────────────────────
export function setUserInfo(user: UserInfo): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// ── Read ──────────────────────────────────────────────────────────────────────
export function getUserInfo(): UserInfo | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserInfo;
  } catch {
    return null;
  }
}

// ── Clear (call on logout) ────────────────────────────────────────────────────
export function clearUserInfo(): void {
  localStorage.removeItem(USER_KEY);
}