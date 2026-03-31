"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-xl">
          <div className="space-y-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-400">
                Support, simplified
              </p>
              <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
                One place for tickets, agents, and admins.
              </h1>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Login to manage requests or browse open tickets instantly.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/tickets" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 hover:bg-sky-400">
                Browse tickets
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
