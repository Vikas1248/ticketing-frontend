"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const router = useRouter();

  // 🔐 Protect route
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, []);

  const fetchTickets = async () => {
    const res = await fetch("https://ticketing-backend-i02l.onrender.com/tickets");
    const data = await res.json();
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(
      `https://ticketing-backend-i02l.onrender.com/tickets/${id}?status=${status}`,
      {
        method: "PUT",
      }
    );
    fetchTickets();
  };

  return (
    <div className="p-6">
      {/* 🔴 Logout button */}
      <button
        onClick={() => {
          localStorage.removeItem("isAdmin");
          router.push("/admin/login");
        }}
        className="mb-4 bg-red-500 text-white px-4 py-2"
      >
        Logout
      </button>

      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

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
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="border text-center">
              <td>{ticket.title}</td>
              <td>{ticket.email}</td>

              {/* ✅ Colored status */}
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