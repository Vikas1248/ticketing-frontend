"use client";

import Link from "next/link";
import TicketForm from "./components/TicketForm";

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen">

      {/* HERO */}
      <div className="text-center py-16 px-6">
        <h1 className="text-4xl font-bold mb-4">
          AI Support Ticketing System
        </h1>

        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Create and manage support tickets, collaborate with your team,
          and resolve issues faster with an intelligent platform.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/tickets">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              View Tickets
            </button>
          </Link>

          <Link href="/admin/login">
            <button className="border px-6 py-3 rounded-lg hover:bg-gray-200">
              Admin Login
            </button>
          </Link>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 px-6 max-w-5xl mx-auto mb-16">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">🎫 Ticket Management</h3>
          <p className="text-sm text-gray-600">
            Create, assign, and track tickets efficiently.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">💬 Team Collaboration</h3>
          <p className="text-sm text-gray-600">
            Add comments and resolve issues faster.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">🤖 AI Assistance</h3>
          <p className="text-sm text-gray-600">
            Smart suggestions to speed up support.
          </p>
        </div>
      </div>

      {/* CREATE TICKET SECTION */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow mb-20">
        <h2 className="text-xl font-bold mb-4 text-center">
          Create Support Ticket 🎫
        </h2>

        <TicketForm />
      </div>

    </main>
  );
}