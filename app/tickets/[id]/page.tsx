"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const BASE_URL = "https://ticketing-backend-i02l.onrender.com";

export default function TicketDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [ticket, setTicket] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionProcessing, setActionProcessing] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    setLoggedIn(Boolean(token));
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchTicket = async () => {
      try {
        const [ticketsRes, commentsRes] = await Promise.all([
          fetch(`${BASE_URL}/tickets`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${BASE_URL}/tickets/${id}/comments`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!ticketsRes.ok) throw new Error("Failed to load ticket");

        const ticketsData = await ticketsRes.json();
        const ticketData = ticketsData.find((item: any) => item.id == id);
        const commentsData = commentsRes.ok ? await commentsRes.json() : [];

        setTicket(ticketData);
        setComments(commentsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, router]);

  const handleAiReply = async () => {
    if (!ticket) return;
    setActionProcessing(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${BASE_URL}/tickets/${id}/ai-reply`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAiMessage(data.reply);
    } catch (error) {
      console.error(error);
    } finally {
      setActionProcessing(false);
    }
  };

  const handleAddComment = async () => {
    if (!message.trim()) return;
    setActionProcessing(true);
    const token = localStorage.getItem("token");

    try {
      await fetch(`${BASE_URL}/tickets/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      const commentsRes = await fetch(`${BASE_URL}/tickets/${id}/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const commentsData = await commentsRes.json();
      setComments(commentsData);
      setMessage("");
    } catch (error) {
      console.error(error);
    } finally {
      setActionProcessing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  const handleBack = () => {
    router.push("/tickets");
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-6 w-48 rounded-full bg-slate-200 animate-pulse"></div>
        <div className="h-40 rounded-2xl bg-slate-200 animate-pulse"></div>
      </div>
    );
  }

  if (!ticket) {
    return <div className="p-6 text-red-600">Ticket not found.</div>;
  }

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            onClick={handleBack}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            ← Back to tickets
          </button>
        </div>
        {loggedIn ? (
          <button
            onClick={handleLogout}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Logout
          </button>
        ) : null}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{ticket.title}</h1>
            <p className="text-sm text-slate-500">{ticket.email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {ticket.status}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {ticket.priority || "Medium"}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {ticket.category || "Uncategorized"}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Created</p>
            <p className="mt-2 text-sm text-slate-700">
              {ticket.created_at ? new Date(ticket.created_at).toLocaleString() : "Unknown"}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Email</p>
            <p className="mt-2 text-sm text-slate-700">{ticket.email}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-base font-semibold">Description</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{ticket.description}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.65fr_1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Comments</h2>
              <p className="text-sm text-slate-500">Latest conversation and AI responses.</p>
            </div>
            <button
              onClick={handleAiReply}
              disabled={actionProcessing}
              className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-60"
            >
              {actionProcessing ? "Working..." : "Generate AI Reply"}
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {comments.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                No comments yet.
              </div>
            ) : (
              comments.map((comment, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  {comment.message}
                </div>
              ))
            )}
          </div>

          {aiMessage && (
            <div className="mt-5 rounded-2xl bg-purple-50 p-4 text-sm text-purple-900">
              <p className="font-semibold">AI Reply</p>
              <p className="mt-2">{aiMessage}</p>
            </div>
          )}
        </section>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Add a comment</h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-black"
            placeholder="Write your response or summary..."
          />
          <button
            onClick={handleAddComment}
            disabled={actionProcessing || !message.trim()}
            className="mt-4 w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition disabled:opacity-60"
          >
            {actionProcessing ? "Sending..." : "Post comment"}
          </button>
        </aside>
      </div>
    </main>
  );
}
