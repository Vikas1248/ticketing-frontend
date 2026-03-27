"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://ticketing-backend-i02l.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("role", data.role);
        router.push("/admin/dashboard");
      } else {
        alert(data.detail || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleRegister} className="border p-6 rounded w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          className="w-full mb-3 p-2 border"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-3 p-2 border"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white p-2">
          Register
        </button>

        <div className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link href="/admin/login" className="underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
