import { LoginRequest, LoginResponse } from "@/types/auth";
import { safeJson } from "@/utils/safeJson";

export async function login(payload: { username: string; password: string }) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => null);
    throw new Error(json?.message ?? `Login failed (${res.status})`);
  }

  return res.json();  
}

export async function logout() {
  await fetch("/api/auth/logout", { method: "POST" });
}
