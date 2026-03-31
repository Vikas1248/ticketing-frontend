"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

const API_URL = "https://ticketing-backend-i02l.onrender.com";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("role", data.role);

        if (data.role === "admin") {
          router.push("/admin/dashboard");
        } else if (data.role === "agent") {
          router.push("/agent/dashboard");
        } else {
          router.push("/tickets");
        }
      } else {
        setErrorMessage(data.detail || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to connect to the server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
          <p className="mt-2 text-sm text-slate-500">
            Login with your email and password to continue.
          </p>
        </div>

        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="login-email">
          Email
        </label>
        <input
          id="login-email"
          className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-black"
          placeholder="you@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="mb-2 mt-4 block text-sm font-medium text-slate-700" htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-black"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errorMessage ? (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-md bg-black px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? "Logging in…" : "Login"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-500">
          New here? <Link href="/admin/register" className="font-medium text-black underline">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
