"use client";
import { useEffect, useState } from "react";

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("https://ticketing-backend-i02l.onrender.com")
      .then((res) => res.json())
      .then((data) => setTickets(data));
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">All Tickets</h1>

      {tickets.map((t: any) => (
        <div key={t.id} className="border p-4 mb-2 rounded">
          <h2 className="font-semibold">{t.title}</h2>
          <p>{t.description}</p>
          <p className="text-sm text-gray-500">{t.email}</p>
        </div>
      ))}
    </main>
  );
}