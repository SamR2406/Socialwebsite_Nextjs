import { Manrope } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Social Stream | Social Feed",
  description: "Share updates, add posts, and stay connected.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
            <Link href="/" className="text-lg font-semibold text-slate-900">
              Social Stream
            </Link>
            <nav className="flex gap-3 text-sm font-semibold">
              <Link
                href="/"
                className="rounded-full px-4 py-2 text-slate-700 hover:bg-slate-100"
              >
                Home
              </Link>
              <Link
                href="/post"
                className="rounded-full bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
              >
                Post
              </Link>
              <Link
                href="/chat"
                className="rounded-full px-4 py-2 text-slate-700 hover:bg-slate-100"
              >
                Chat
              </Link>
              <Link
                href="/profile"
                className="rounded-full px-4 py-2 text-slate-700 hover:bg-slate-100"
              >
                Profile
              </Link>
              <Link
                href="/help"
                className="rounded-full px-4 py-2 text-slate-700 hover:bg-slate-100"
              >
                Help
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
