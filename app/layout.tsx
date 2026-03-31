import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Support Dashboard",
  description: "Ticketing SaaS Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full flex flex-col">

        {/* 🔝 TOP NAVBAR */}
        <div className="h-14 bg-white border-b flex items-center justify-between px-6 shadow-sm">
          
          {/* Logo */}
          <div className="font-semibold text-lg">
            🤖 Support AI
          </div>

          {/* Navigation Links */}
          <div className="flex gap-6 text-sm items-center">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/tickets" className="hover:text-blue-600">
              Tickets
            </Link>
            <Link href="/login" className="hover:text-blue-600">
              Login
            </Link>
          </div>

        </div>

        {/* 🔽 MAIN LAYOUT */}
        <div className="flex flex-1">

          {/* Sidebar */}
          <div className="w-60 bg-gray-900 text-white p-5 hidden md:block">
            <h2 className="text-lg font-bold mb-6">Dashboard</h2>

            <nav className="space-y-2">
              <Link href="/tickets">
                <div className="p-2 rounded hover:bg-gray-700 cursor-pointer">
                  🎫 Tickets
                </div>
              </Link>
            </nav>

            {/* Optional User Info */}
            <div className="mt-10 text-sm text-gray-400">
              Logged in as Admin
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
            {children}
          </div>

        </div>

      </body>
    </html>
  );
}