"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");

    fetch("https://ticketing-backend-i02l.onrender.com/tickets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((data) => {
        setTickets(data);
        setFilteredTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load tickets");
        setLoading(false);
      });
  }, []);

  // 🔍 Search filter
  useEffect(() => {
    const filtered = tickets.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTickets(filtered);
  }, [search, tickets]);

  if (loading)
    return (
      <div className="p-6 animate-pulse">
        <div className="h-6 bg-gray-300 w-1/3 mb-4 rounded"></div>
        <div className="h-4 bg-gray-300 w-2/3 rounded"></div>
      </div>
    );

  if (error) return <p className="p-6">{error}</p>;

  return (
    <main className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🎫 Tickets</h1>

        <input
          placeholder="Search tickets..."
          className="border p-2 rounded-lg text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredTickets.length === 0 && <p>No tickets found</p>}

      {/* Ticket Cards */}
      <div className="space-y-3">
        {filteredTickets.map((t: any) => (
          <Link key={t.id} href={`/tickets/${t.id}`}>
            <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer">
              
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">{t.title}</h2>

                {/* Status Badge */}
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    t.status === "Open"
                      ? "bg-green-100 text-green-700"
                      : t.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {t.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {t.description}
              </p>

              <div className="text-xs text-gray-400 mt-2">
                {t.email}
              </div>

            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}