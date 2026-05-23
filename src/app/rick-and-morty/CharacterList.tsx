"use client";

import type { Character } from "@/types/rick-and-morty";
import Link from "next/link";
import { useState } from "react";
import CharacterImage from "./CharacterImage";

const PAGE_SIZE = 24;

const statusColor: Record<Character["status"], string> = {
  Alive: "bg-lime-300/90 text-black",
  Dead: "bg-red-400/90 text-black",
  unknown: "bg-white/14 text-white",
};

export default function CharacterList({
  characters,
}: {
  characters: Character[];
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleCharacters = characters.slice(0, visibleCount);
  const hasMore = visibleCount < characters.length;

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visibleCharacters.map((character) => (
          <Link
            key={character.id}
            href={`/rick-and-morty/character/${character.id}`}
            className="overflow-hidden rounded-[26px] border border-white/15 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15"
          >
            <CharacterImage
              src={character.image}
              alt={character.name}
              width={300}
              height={300}
              className="h-56 w-full object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-white/45">
                  #{character.id}
                </span>
                <span
                  className={`${statusColor[character.status]} rounded-full px-2.5 py-1 text-xs font-semibold`}
                >
                  {character.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white">
                {character.name}
              </h3>
              <p className="mt-1 text-sm text-white/45">
                {character.species} - {character.gender}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((current) =>
                Math.min(current + PAGE_SIZE, characters.length),
              )
            }
            className="rounded-full border border-white/10 bg-white px-6 py-3 font-semibold text-black shadow-[0_16px_40px_rgba(255,255,255,0.12)] transition hover:bg-lime-100"
          >
            Mostrar mas
          </button>
        </div>
      ) : null}
    </>
  );
}
