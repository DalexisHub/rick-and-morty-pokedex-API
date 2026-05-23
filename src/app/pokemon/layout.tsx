import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { IoGameController } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Pokedex - Next.js",
  description: "Explora el mundo Pokemon",
};

interface PokemonLayoutProps {
  children: ReactNode;
}

export default function PokemonLayout({ children }: PokemonLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-900">
      <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <Link
            href="/pokemon"
            className="text-2xl font-bold text-white transition hover:text-purple-300"
          >
            <IoGameController size={30} className="inline-block" /> Pokedex
            Next.js
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
