import { Manrope } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import { MessagesProvider } from "../context/MessagesContext";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Sheffgram | Social Feed",
  description: "Share updates, add posts, and stay connected.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <MessagesProvider>
          <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
              <Link href="/" className="text-lg font-semibold text-slate-900">
                Sheffgram
              </Link>
              <NavBar />
            </div>
          </header>
          <main className="pt-20 sm:pt-24">{children}</main>
        </MessagesProvider>
      </body>
    </html>
  );
}
