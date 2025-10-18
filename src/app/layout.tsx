import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import ThemeSwitch from "@/components/ThemeSwitch";

export const metadata: Metadata = {
  title: "SceneBoard",
  description: "Kısa film/sahne öneri yönetimi (Lite)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen">
        <header className="border-b border-white/10 sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/40">
          <div className="container-app flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-xl">🎬</span> SceneBoard
            </Link>
            <nav className="flex items-center gap-1">
              <ThemeSwitch />
              <Link href="/" className="btn-ghost">Liste</Link>
              <Link href="/items/new" className="btn">+ Yeni Öneri</Link>
            </nav>
          </div>
        </header>
        <main className="container-app py-8">{children}</main>
        <footer className="container-app py-10 text-xs text-[rgb(var(--muted))]">
          <div className="border-t border-white/10 pt-6">© {new Date().getFullYear()} SceneBoard</div>
        </footer>
      </body>
    </html>
  );
}
