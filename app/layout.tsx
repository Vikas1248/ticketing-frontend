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
      <body className="h-full flex">

        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white p-5 hidden md:block">
          <h1 className="text-xl font-bold mb-6">🎫 Support AI</h1>

          <nav className="space-y-2">
            <Link href="/tickets">
              <div className="p-2 rounded hover:bg-gray-700 cursor-pointer">
                📋 Tickets
              </div>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          {children}
        </div>

      </body>
    </html>
  );
}