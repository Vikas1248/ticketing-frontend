"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  if (typeof window === "undefined") return;  // ✅ SSR safety

  const token = localStorage.getItem("token");

  fetch("https://ticketing-backend-i02l.onrender.com/tickets", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("API failed"); // ✅ better handling
      return res.json();
    })
    .then((data) => {
      setTickets(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setError("Failed to load tickets");
      setLoading(false);
    });
}, []);

  if (loading) return <p className="p-6">Loading tickets...</p>;
  if (error) return <p className="p-6">{error}</p>;

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">All Tickets</h1>

      {tickets.length === 0 && <p>No tickets found</p>}

      {tickets.map((t: any) => (
        <Link key={t.id} href={`/tickets/${t.id}`}>
          <div className="border p-4 mb-2 rounded cursor-pointer hover:bg-gray-100">
            <h2 className="font-semibold">{t.title}</h2>
            <p>{t.description}</p>
            <p className="text-sm text-gray-500">{t.email}</p>
          </div>
        </Link>
      ))}
    </main>
  );
}