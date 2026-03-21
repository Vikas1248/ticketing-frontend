"use client";
import { useEffect, useState } from "react";

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://ticketing-backend-i02l.onrender.com/tickets")
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load tickets");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">All Tickets</h1>

      {tickets.length === 0 && <p>No tickets found</p>}

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