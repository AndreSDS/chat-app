import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { SessionProvider } from "@/components/SessionProvider";
import { UserButton } from "@/components/UserButton";
import { getServerSession } from "next-auth/next";

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

export default async function RootLayout({
  children,
  chats,
}: Readonly<{
  children: React.ReactNode;
  chats: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-2 md:px-5`}
      >
        <SessionProvider session={session}>
          <header
            className="text-white font-bold bg-green-900 text-2xl p-2 rounded-lg rounded-t-none
          shadow-md shadow-blue-300 flex items-center justify-between
        "
          >
            <div className="flex flex-row">
              <Link href="/">Chat</Link>
              <Link href="/about" className="ml-5 font-light">
                About
              </Link>
            </div>

            <UserButton />
          </header>
          <div className="flex flex-col md:flex-row">
            {chats}
            <div className="flex-grow">{children}</div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
