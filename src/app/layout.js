import { Manrope } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";

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
            <NavBar />
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
