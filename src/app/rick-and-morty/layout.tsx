import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { GiPortal } from "react-icons/gi";

export const metadata: Metadata = {
  title: "Rick and Morty - Next.js",
  description: "Personajes de Rick and Morty con SSG, CSR e ISR",
};

export default function RickAndMortyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link
            href="/rick-and-morty"
            className="inline-flex items-center gap-2 text-xl font-semibold text-white transition hover:text-lime-200"
          >
            <GiPortal size={30} />
            Rick and Morty
          </Link>
          <Link
            href="/pokemon"
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition hover:bg-white/20 hover:text-white"
          >
            Pokedex
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
