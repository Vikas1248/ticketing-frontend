"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import TicketForm from "../components/TicketForm";

const BASE_URL = "https://ticketing-backend-i02l.onrender.com";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to view tickets.");
      setLoading(false);
      return;
    }

    fetch(`${BASE_URL}/tickets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load tickets");
        return res.json();
      })
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load tickets.");
        setLoading(false);
      });
  }, []);

  const filteredTickets = useMemo(
    () =>
      tickets.filter((ticket) =>
        ticket.title.toLowerCase().includes(search.toLowerCase())
      ),
    [search, tickets]
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-6 w-40 rounded-full bg-slate-200 animate-pulse mb-3"></div>
        <div className="h-4 w-60 rounded-full bg-slate-200 animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Tickets</h1>
          <p className="mt-1 text-sm text-slate-500">
            {filteredTickets.length} results from {tickets.length} tickets.
          </p>
        </div>

        <input
          className="w-full max-w-sm rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-black"
          placeholder="Search tickets by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mb-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Create a support ticket</h2>
        <p className="mt-2 text-sm text-slate-500">
          Submit a new ticket directly from your authenticated dashboard.
        </p>
        <div className="mt-6">
          <TicketForm />
        </div>
      </div>

      {filteredTickets.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-600">
          No tickets found. Try a different search term.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <Link
              key={ticket.id}
              href={`/tickets/${ticket.id}`}
              className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{ticket.title}</h2>
                  <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                    {ticket.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {ticket.status}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {ticket.priority || "Medium"}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:justify-between">
                <span>{ticket.email}</span>
                <span>{ticket.created_at ? new Date(ticket.created_at).toLocaleDateString() : ""}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
