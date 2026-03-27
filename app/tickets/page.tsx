"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL = "https://ticketing-backend-i02l.onrender.com";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");

    fetch(`${BASE_URL}/tickets`, {
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
      <div className="p-6 animate-pulse space-y-3">
        <div className="h-6 bg-gray-300 w-1/3 rounded"></div>
        <div className="h-4 bg-gray-300 w-2/3 rounded"></div>
      </div>
    );

  if (error)
    return <p className="p-6 text-red-500">❌ {error}</p>;

  return (
    <main className="p-8 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">📋 Tickets Dashboard</h1>
          <p className="text-sm text-gray-500">
            Manage and track support requests
          </p>
        </div>

        <input
          placeholder="🔍 Search tickets..."
          className="border p-2 rounded-lg text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🔥 Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total</p>
          <h2 className="text-xl font-bold">{tickets.length}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Open</p>
          <h2 className="text-xl font-bold">
            {tickets.filter((t) => t.status === "Open").length}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">High Priority</p>
          <h2 className="text-xl font-bold text-red-500">
            {tickets.filter((t) => t.priority === "High").length}
          </h2>
        </div>
      </div>

      {/* Empty State */}
      {filteredTickets.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">🎫 No tickets found</p>
          <p className="text-sm">Try adjusting your search</p>
        </div>
      )}

      {/* Ticket Cards */}
      <div className="space-y-4">
        {filteredTickets.map((t: any) => (
          <Link key={t.id} href={`/tickets/${t.id}`}>
            <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">

              {/* Top Row */}
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">{t.title}</h2>

                <span className="text-xs text-gray-400">
                  #{t.id}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {t.description}
              </p>

              {/* Tags */}
              <div className="flex gap-2 mt-3">

                {/* Status */}
                <span className={`px-2 py-1 text-xs rounded 
                  ${t.status === "Open" && "bg-yellow-100 text-yellow-700"}
                  ${t.status === "In Progress" && "bg-blue-100 text-blue-700"}
                  ${t.status === "Resolved" && "bg-green-100 text-green-700"}
                `}>
                  {t.status}
                </span>

                {/* Priority */}
                <span className={`px-2 py-1 text-xs rounded 
                  ${t.priority === "High" && "bg-red-100 text-red-700"}
                  ${t.priority === "Medium" && "bg-yellow-100 text-yellow-700"}
                  ${t.priority === "Low" && "bg-green-100 text-green-700"}
                `}>
                  {t.priority}
                </span>

                {/* Category */}
                <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700">
                  {t.category || "Other"}
                </span>

                {/* AI Badge */}
                <span className="px-2 py-1 text-xs rounded bg-purple-200 text-purple-800">
                  🤖 AI
                </span>
              </div>

              {/* Footer */}
              <div className="flex justify-between mt-4 text-xs text-gray-500">
                <span>{t.email}</span>
                <span>
                  {t.created_at
                    ? new Date(t.created_at).toLocaleDateString()
                    : ""}
                </span>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}