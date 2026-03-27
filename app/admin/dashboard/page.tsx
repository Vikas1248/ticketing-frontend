"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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

const STATUS_OPTIONS = ["All", "Open", "In Progress", "Resolved"];

const statusStyles: Record<string, string> = {
  Open: "bg-emerald-100 text-emerald-700",
  "In Progress": "bg-amber-100 text-amber-700",
  Resolved: "bg-sky-100 text-sky-700",
};

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [savingIds, setSavingIds] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
    }
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
        router.push("/admin/login");
        return;
      }

      const data = await res.json();
      setTickets(data);
    } catch (error) {
      console.error(error);
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const stats = useMemo(
    () => ({
      total: tickets.length,
      open: tickets.filter((ticket) => ticket.status === "Open").length,
      inProgress: tickets.filter((ticket) => ticket.status === "In Progress").length,
      resolved: tickets.filter((ticket) => ticket.status === "Resolved").length,
    }),
    [tickets]
  );

  const filteredTickets = useMemo(
    () =>
      tickets.filter((ticket) => {
        const matchesSearch =
          ticket.title.toLowerCase().includes(search.toLowerCase()) ||
          ticket.email.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === "All" || ticket.status === statusFilter;

        return matchesSearch && matchesStatus;
      }),
    [tickets, search, statusFilter]
  );

  const updateStatus = async (id: number, status: string) => {
    const token = localStorage.getItem("token");
    setSavingIds((current) => [...current, id]);

    try {
      const res = await fetch(`${API_URL}/tickets/${id}?status=${status}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Unable to update status");
      }

      setTickets((current) =>
        current.map((ticket) =>
          ticket.id === id ? { ...ticket, status } : ticket
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setSavingIds((current) => current.filter((item) => item !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
          <p className="text-sm text-slate-600">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Admin SaaS Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Support tickets at a glance
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Review incoming requests, prioritize active work, and keep response times low.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                router.push("/admin/login");
              }}
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Logout
            </button>
            <Link
              href="/tickets"
              className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View public tickets
            </Link>
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total requests</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{stats.total}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Open tickets</p>
            <p className="mt-3 text-3xl font-semibold text-emerald-700">{stats.open}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">In progress</p>
            <p className="mt-3 text-3xl font-semibold text-amber-700">{stats.inProgress}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Resolved</p>
            <p className="mt-3 text-3xl font-semibold text-sky-700">{stats.resolved}</p>
          </div>
        </div>

        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-black"
              placeholder="Search by title or requester email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex flex-wrap gap-3">
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => setStatusFilter(option)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    statusFilter === option
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredTickets.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
            <p className="text-lg font-semibold">No tickets match your filters.</p>
            <p className="mt-2 text-sm">Try adjusting the search or status filter.</p>
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
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
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[ticket.status] || "bg-slate-100 text-slate-700"}`}>
                      {ticket.status}
                    </span>
                    <span className="text-xs text-slate-500">
                      {ticket.created_at ? new Date(ticket.created_at).toLocaleDateString() : "No date"}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-slate-500">{ticket.email}</div>
                  <div className="flex flex-wrap gap-3">
                    <select
                      value={ticket.status}
                      onChange={(e) => updateStatus(ticket.id, e.target.value)}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none"
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                    <Link
                      href={`/tickets/${ticket.id}`}
                      className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      View details
                    </Link>
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
