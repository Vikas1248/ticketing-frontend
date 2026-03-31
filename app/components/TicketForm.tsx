"use client";
import { useState } from "react";

interface TicketFormProps {
  onCreated?: () => void;
}

export default function TicketForm({ onCreated }: TicketFormProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch("https://ticketing-backend-i02l.onrender.com/tickets", {
        method: "POST",
        headers,
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Response:", data);

      alert("✅ Ticket Created Successfully!");

      setForm({ title: "", description: "", email: "" });
      onCreated?.();
    } catch (error) {
      console.error(error);
      alert("❌ Error creating ticket");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <button className="bg-blue-500 text-white px-4 py-2">
        Create Ticket
      </button>
    </form>
  );
}