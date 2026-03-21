"use client";
import { useEffect, useState } from "react";

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    const res = await fetch("http://127.0.0.1:8000/tickets");
    const data = await res.json();
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">All Tickets</h1>

      <ul>
        {tickets.map((t: any, index) => (
          <li key={index} className="border p-2 mb-2">
            <strong>{t.title}</strong> - {t.description} ({t.email})
          </li>
        ))}
      </ul>
    </main>
  );
}