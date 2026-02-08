"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";
import type { LoginRequest } from "@/types/auth";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState<LoginRequest>({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function updateField<K extends keyof LoginRequest>(key: K, value: LoginRequest[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!form.username.trim() || !form.password.trim()) {
      setErrorMessage("Please enter your username and password.");
      return;
    }

    setIsSubmitting(true);
    try { 
      await login(form);

      setSuccessMessage("Login successful.");
      setForm({ username: "", password: "" });
 
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err?.message ?? "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mx-auto max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Login</h1> 

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Username *</label>
            <input
              value={form.username}
              onChange={(e) => updateField("username", e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-sm outline-none focus:border-gray-400"
              autoComplete="username"
              placeholder="mor_2314"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password *</label>
            <input
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              type="password"
              className="mt-1 w-full rounded border px-3 py-2 text-sm outline-none focus:border-gray-400"
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>

          {errorMessage && (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="rounded border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
