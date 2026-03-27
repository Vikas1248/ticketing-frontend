"use client";

import Link from "next/link";
import TicketForm from "./components/TicketForm";

export default function Home() {
  return (
    <main className="bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.24),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.2),_transparent_30%)]" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-sky-300/15 px-4 py-1 text-sm font-semibold uppercase tracking-[0.34em] text-sky-300">
              AI-powered support
            </span>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Smarter ticketing for teams that respond faster.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Centralize requests, automate responses with AI, and keep every conversation moving toward resolution.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/tickets" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400">
                Browse tickets
              </Link>
              <Link href="/admin/login" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/20">
                Admin login
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white">Fast ticket creation</h3>
            <p className="mt-3 text-sm text-slate-300">
              Capture issue details quickly and route tickets to the right team instantly.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white">AI reply suggestions</h3>
            <p className="mt-3 text-sm text-slate-300">
              Use automated suggestions to draft responses faster and keep customers informed.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white">Team collaboration</h3>
            <p className="mt-3 text-sm text-slate-300">
              Add notes, share comment threads, and resolve issues with full visibility.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white text-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-500">Live demo</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
                Start tickets with smarter context and immediate visibility.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                The platform keeps request details, requester email, and ticket status in one place so your support team can move faster without missing anything.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900">
                  AI ticket insights
                </span>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900">
                  Status automation
                </span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-slate-900">Create a ticket now</h3>
              <p className="mt-2 text-sm text-slate-500">
                Fill in the ticket details below and see how easy it is to capture support issues.
              </p>
              <div className="mt-6">
                <TicketForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">99%</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-950">Resolution rate</h3>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500"><span className="text-sky-500">AI</span></p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-950">Automated responses</h3>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Business</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-950">Team friendly</h3>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Launch</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-950">Ready to use</h3>
          </div>
        </div>
      </section>
    </main>
  );
}
