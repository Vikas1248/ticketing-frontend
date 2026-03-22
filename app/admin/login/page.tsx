"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://ticketing-backend-i02l.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // ✅ store JWT + role
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("role", data.role);

        router.push("/admin/dashboard");
      } else {
        alert(data.detail || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="border p-6 rounded w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          className="w-full mb-3 p-2 border"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-3 p-2 border"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white p-2">
          Login
        </button>
      </form>
    </div>
  );
}