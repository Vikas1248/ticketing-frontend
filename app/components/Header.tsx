"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(Boolean(token));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setLoggedIn(false);
    router.push("/login");
  };

  return (
    <div className="h-14 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <div className="font-semibold text-lg">🤖 Support AI</div>

      <div className="flex items-center gap-4">
        {loggedIn ? (
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Logout
          </button>
        ) : null}
      </div>
    </div>
  );
}
