"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Ticket = {
  id: number;
  title: string;
  description: string;
  email: string;
  status: string;
};

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔐 Protect route (JWT based)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
    }
  }, []);

  const fetchTickets = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const res = await fetch(
        "https://ticketing-backend-i02l.onrender.com/tickets",
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔐 IMPORTANT
          },
        }
      );

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <p className="text-sm text-slate-600">Loading tickets…</p>
      </div>
    );
  }

  const updateStatus = async (id: number, status: string) => {
    const token = localStorage.getItem("token");

    await fetch(
      `https://ticketing-backend-i02l.onrender.com/tickets/${id}?status=${status}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // 🔐 IMPORTANT
        },
      }
    );

    fetchTickets();
  };

  return (
    <div className="p-6">
      {/* 🔴 Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          router.push("/admin/login");
        }}
        className="mb-4 bg-red-500 text-white px-4 py-2"
      >
        Logout
      </button>

      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {!tickets.length ? (
        <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          No tickets found yet. When a ticket is created, it will appear here.
        </div>
      ) : null}

      <table className="w-full border">
        <thead>
          <tr className="border">
            <th>Title</th>
            <th>Email</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket: Ticket) => (
            <tr key={ticket.id} className="border text-center">
              <td>{ticket.title}</td>
              <td>{ticket.email}</td>

              <td>
                <span
                  className={
                    ticket.status === "Open"
                      ? "text-green-600 font-semibold"
                      : ticket.status === "In Progress"
                      ? "text-yellow-600 font-semibold"
                      : "text-blue-600 font-semibold"
                  }
                >
                  {ticket.status}
                </span>
              </td>

              <td>
                <select
                  value={ticket.status}
                  onChange={(e) =>
                    updateStatus(ticket.id, e.target.value)
                  }
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}