"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Ticket = {
  id: number;
  title: string;
  description: string;
  email: string;
  status: string;
  created_at?: string;
};

const API_URL = "https://ticketing-backend-i02l.onrender.com";

export default function AgentDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "agent") {
      router.push("/login");
      return;
    }

    fetchTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const fetchTickets = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/tickets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        router.push("/login");
        return;
      }

      const data = await res.json();
      setTickets(data);
    } catch (error) {
      console.error(error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = useMemo(
    () =>
      tickets.filter((ticket) => {
        const matchesSearch =
          ticket.title.toLowerCase().includes(search.toLowerCase()) ||
          ticket.email.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
      }),
    [tickets, search]
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
          <p className="text-sm text-slate-600">Loading agent dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Agent Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Your assigned tickets
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Review ticket requests, respond quickly, and keep your queue moving.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                router.push("/login");
              }}
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <input
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-black"
            placeholder="Search tickets by title or requester"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredTickets.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
            <p className="text-lg font-semibold">No tickets found.</p>
            <p className="mt-2 text-sm">Try a different search or refresh the page.</p>
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Ticket #{ticket.id}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-900">
                      {ticket.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">
                      {ticket.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {ticket.status}
                    </span>
                    <span className="text-xs text-slate-500">
                      {ticket.created_at ? new Date(ticket.created_at).toLocaleDateString() : "No date"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
