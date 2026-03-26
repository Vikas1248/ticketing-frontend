"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TicketDetail() {
  const { id } = useParams();

  const [ticket, setTicket] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const BASE_URL = "https://ticketing-backend-i02l.onrender.com";

  // 🤖 AI Reply
  const generateAIReply = async () => {
    setAiLoading(true);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${BASE_URL}/tickets/${id}/ai-reply`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setMessage(data.reply);
    } catch (err) {
      console.error("AI error:", err);
    }

    setAiLoading(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        // Fetch ticket
        const res = await fetch(`${BASE_URL}/tickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const t = data.find((t: any) => t.id == id);
        setTicket(t);

        // Fetch comments
        const cRes = await fetch(`${BASE_URL}/tickets/${id}/comments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const cData = await cRes.json();
        setComments(cData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  // ➕ Add Comment
  const addComment = async () => {
    const token = localStorage.getItem("token");

    await fetch(`${BASE_URL}/tickets/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });

    setMessage("");

    const res = await fetch(`${BASE_URL}/tickets/${id}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setComments(data);
  };

  if (!ticket) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 grid grid-cols-2 gap-6">
      
      {/* LEFT: Ticket Info */}
      <div className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold">{ticket.title}</h2>
        <p className="mt-2">{ticket.description}</p>

        <div className="mt-4 space-y-1 text-sm">
          <p><b>Status:</b> {ticket.status}</p>
          <p><b>Priority:</b> {ticket.priority}</p>
          <p><b>Email:</b> {ticket.email}</p>
        </div>
      </div>

      {/* RIGHT: Comments */}
      <div className="border p-4 rounded-xl shadow flex flex-col">
        <h3 className="text-lg font-bold mb-3">Comments</h3>

        {/* 🤖 AI BUTTON */}
        <button
          onClick={generateAIReply}
          className="bg-purple-600 text-white px-3 py-2 rounded-lg mb-2 hover:bg-purple-700 flex items-center gap-2"
        >
          {aiLoading && (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
          )}
          {aiLoading ? "Generating..." : "🤖 Generate AI Reply"}
        </button>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {comments.map((c, i) => (
            <div key={i} className="bg-blue-50 p-2 rounded text-sm">
              {c.message}
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <div className="mt-3 flex gap-2">
          <input
            className="border p-2 flex-1 rounded"
            placeholder="🤖 AI suggested reply will appear here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={addComment}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Send
          </button>
        </div>

        {/* 🔁 Regenerate */}
        <button
          onClick={generateAIReply}
          className="text-xs text-purple-600 mt-1 text-left"
        >
          🔁 Regenerate AI Reply
        </button>
      </div>
    </div>
  );
}