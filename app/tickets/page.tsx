"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TicketForm from "../components/TicketForm";

const BASE_URL = "https://ticketing-backend-i02l.onrender.com";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const fetchTickets = async () => {
    const token = localStorage.getItem("token");
    setLoggedIn(Boolean(token));

    if (!token) {
      setError("Please login to view tickets.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/tickets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to load tickets");
      }

      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    fetchTickets();
  }, []);

  const filteredTickets = useMemo(
    () =>
      tickets.filter((ticket) =>
        ticket.title.toLowerCase().includes(search.toLowerCase())
      ),
    [search, tickets]
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

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
    <main className="p-6 max-w-5xl mx-auto space-y-10">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Tickets</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your tickets from one place.
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <input
            className="w-full max-w-sm rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-black"
            placeholder="Search tickets"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Logout
            </button>
          ) : null}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Create a ticket</h2>
            <p className="mt-1 text-sm text-slate-500">
              Submit a new support request without leaving the page.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <TicketForm onCreated={fetchTickets} />
        </div>
      </section>

      <section>
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

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {ticket.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
