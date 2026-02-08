"use client";

import { useState } from "react";
import Link from "next/link";
import { RegisterUserRequest } from "@/types/user";
import { registerUser } from "@/services/userService";

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterUserRequest>({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function updateField<K extends keyof RegisterUserRequest>(
    key: K,
    value: RegisterUserRequest[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await registerUser(form);
      setSuccessMessage("User created successfully.");
      setForm({ username: "", email: "", password: "" });
    } catch (err: any) {
      setErrorMessage(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mx-auto max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Create an account</h1>
        <p className="mt-1 text-sm text-gray-600">Create a new user.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Username *</label>
            <input
              value={form.username}
              onChange={(e) => updateField("username", e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-sm outline-none text-gray-700"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email *</label>
            <input
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              type="email"
              className="mt-1 w-full rounded border px-3 py-2 text-sm outline-none text-gray-700 focus:border-gray-400"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password *</label>
            <input
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              type="password"
              className="mt-1 w-full rounded border px-3 py-2 text-sm outline-none text-gray-700 focus:border-gray-400"
              autoComplete="new-password"
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
            {isSubmitting ? "Creating..." : "Register"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
