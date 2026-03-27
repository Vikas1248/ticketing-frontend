"use client";

import Link from "next/link";
import TicketForm from "./components/TicketForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-slate-900/75 p-6 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-400">
              Landing dashboard
            </p>
            <h2 className="mt-5 text-3xl font-semibold text-white">
              Quick overview
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              A compact left panel for your metrics, navigation, and support actions.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-3xl bg-slate-950/80 p-4 border border-white/10">
                <p className="text-sm text-slate-400">Open tickets</p>
                <p className="mt-2 text-2xl font-semibold text-white">12</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-4 border border-white/10">
                <p className="text-sm text-slate-400">AI suggestions</p>
                <p className="mt-2 text-2xl font-semibold text-white">4</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-4 border border-white/10">
                <p className="text-sm text-slate-400">Resolved today</p>
                <p className="mt-2 text-2xl font-semibold text-white">8</p>
              </div>
            </div>

            <div className="mt-10 grid gap-3">
              <Link href="/tickets" className="rounded-2xl bg-sky-500 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-sky-400">
                Browse tickets
              </Link>
              <Link href="/admin/login" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/10">
                Admin login
              </Link>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-xl">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-400">
                    Welcome back
                  </p>
                  <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
                    Simplified support, now in two panels.
                  </h1>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
                    The left panel holds metrics and quick links, while the top panel delivers status, actions, and ticket creation.
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-950/90 p-5 text-sm text-slate-300">
                  <p className="font-semibold text-white">Today</p>
                  <p className="mt-3">8 new tickets</p>
                  <p className="mt-1">2 responses pending</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl">
                <h2 className="text-lg font-semibold text-white">Why this layout?</h2>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  A compact left panel keeps navigation and KPIs visible, while the wide top panel keeps your next action front and center.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-300">
                  <li>• Clear metrics at a glance</li>
                  <li>• Direct access to tickets and admin</li>
                  <li>• Fast ticket creation without clutter</li>
                </ul>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl">
                <h2 className="text-lg font-semibold text-white">Next steps</h2>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  Keep this landing page neat and let users dive into ticket details using built-in support workflows.
                </p>
                <div className="mt-6 space-y-3 text-sm text-slate-300">
                  <p>• Start with a new ticket below.</p>
                  <p>• Browse current tickets fast.</p>
                  <p>• Use AI suggestions to reply faster.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-50 p-8 shadow-xl text-slate-950">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Create a support ticket</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Quickly capture an issue and keep support moving with the same dashboard experience.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <TicketForm />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
