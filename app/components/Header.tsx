"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [role, setRole] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    setLoggedIn(Boolean(token));
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setLoggedIn(false);
    setRole(null);
    router.push("/login");
  };

  return (
    <div className="h-14 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <div className="font-semibold text-lg">🤖 Support AI</div>

      <div className="flex gap-6 text-sm items-center">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link href="/tickets" className="hover:text-blue-600">
          Tickets
        </Link>

        {!loggedIn ? (
          <Link href="/login" className="hover:text-blue-600">
            Login
          </Link>
        ) : (
          <>
            {role === "admin" && (
              <Link href="/admin/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
            )}
            {role === "agent" && (
              <Link href="/agent/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
            )}
            {role !== "admin" && role !== "agent" && (
              <Link href="/tickets" className="hover:text-blue-600">
                My Tickets
              </Link>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
