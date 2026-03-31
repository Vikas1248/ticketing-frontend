"use client";

import Link from "next/link";
import TicketForm from "./components/TicketForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-400">
                Simplified support
              </p>
              <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
                A cleaner dashboard with only the essentials.
              </h1>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                No left panel, no clutter — just a strong top section for hero copy, key metrics, and quick actions.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/tickets" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 hover:bg-sky-400">
                  Browse tickets
                </Link>
                <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20">
                  Login
                </Link>
              </div>
            </div>

            <div className="grid w-full max-w-md gap-4 sm:grid-cols-2 lg:max-w-none lg:grid-cols-1">
              <div className="rounded-3xl bg-slate-950/90 p-5 text-slate-300">
                <p className="text-sm text-slate-400">Open tickets</p>
                <p className="mt-3 text-3xl font-semibold text-white">12</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 text-slate-300">
                <p className="text-sm text-slate-400">Pending replies</p>
                <p className="mt-3 text-3xl font-semibold text-white">2</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-white">Fast ticket creation</h2>
            <p className="mt-4 text-sm text-slate-400">Capture requests quickly and route them with confidence.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-white">AI reply help</h2>
            <p className="mt-4 text-sm text-slate-400">Use suggestions to answer faster without extra steps.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-white">Single-panel focus</h2>
            <p className="mt-4 text-sm text-slate-400">Keep the layout clean and easy to scan on every screen.</p>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-slate-50 p-8 shadow-xl text-slate-950">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Create a support ticket</h2>
              <p className="mt-2 text-sm text-slate-600">Submit a request directly from the landing page, with no extra dashboard sidebar.</p>
            </div>
          </div>
          <div className="mt-6">
            <TicketForm />
          </div>
        </div>
      </div>
    </main>
  );
}
