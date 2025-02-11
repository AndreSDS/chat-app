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
  title: "NextJS Chat App",
  description: "ChatGPT brought to you by NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-2 md:px-5`}
      >
        <header
          className="text-white font-bold bg-green-900 text-2xl px-2 rounded-lg rounded-t-none
          shadow-md shadow-blue-300
        "
        >
          <div className="flex flex-row">
            <Link href="/">Chat</Link>
            <Link href="/about" className="ml-5 font-light">
              About
            </Link>
          </div>
          <div></div>
        </header>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow">{children}</div>
        </div>
      </body>
    </html>
  );
}
