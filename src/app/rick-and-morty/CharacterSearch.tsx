"use client";

import type {
  Character,
  CharacterFilters,
  CharacterListResponse,
} from "@/types/rick-and-morty";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { IoSearch, IoSparkles } from "react-icons/io5";
import CharacterImage from "./CharacterImage";

const initialFilters: CharacterFilters = {
  name: "",
  status: "",
  type: "",
  gender: "",
};

const statusOptions = ["alive", "dead", "unknown"];
const genderOptions = ["female", "male", "genderless", "unknown"];

function buildQuery(filters: CharacterFilters) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value.trim()) {
      params.set(key, value.trim());
    }
  });

  return params.toString();
}

export default function CharacterSearch() {
  const [filters, setFilters] = useState<CharacterFilters>(initialFilters);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const query = useMemo(() => buildQuery(filters), [filters]);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setMessage("");

      try {
        const url = query
          ? `https://rickandmortyapi.com/api/character/?${query}`
          : "https://rickandmortyapi.com/api/character";
        const res = await fetch(url, { signal: controller.signal });

        if (res.status === 404) {
          setCharacters([]);
          setMessage("No se encontraron personajes.");
          return;
        }

        if (!res.ok) {
          throw new Error("No se pudo buscar personajes.");
        }

        const data: CharacterListResponse = await res.json();
        setCharacters(data.results);
      } catch (error) {
        if (!controller.signal.aborted) {
          setCharacters([]);
          setMessage(
            error instanceof Error
              ? error.message
              : "No se pudo buscar personajes.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 350);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [query]);

  return (
    <section className="border-y border-white/10 bg-white/10 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="inline-flex items-center gap-2 text-2xl font-semibold text-white">
              <IoSearch size={26} />
              Busqueda en tiempo real
            </h2>
            <p className="mt-1 text-sm text-white/50">
              Filtra por nombre, estado, tipo y genero.
            </p>
          </div>
          {loading ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-2 text-sm font-semibold text-cyan-100">
              <IoSparkles size={18} />
              Buscando...
            </span>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <input
            value={filters.name}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            placeholder="Nombre"
            className="h-12 rounded-full border border-white/15 bg-black/70 px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-lime-200/70 focus:bg-black"
          />
          <select
            value={filters.status}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                status: event.target.value,
              }))
            }
            className="h-12 rounded-full border border-white/15 bg-black/70 px-4 text-sm text-white outline-none transition focus:border-lime-200/70 focus:bg-black"
          >
            <option value="">Estado</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <input
            value={filters.type}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                type: event.target.value,
              }))
            }
            placeholder="Tipo"
            className="h-12 rounded-full border border-white/15 bg-black/70 px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-lime-200/70 focus:bg-black"
          />
          <select
            value={filters.gender}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                gender: event.target.value,
              }))
            }
            className="h-12 rounded-full border border-white/15 bg-black/70 px-4 text-sm text-white outline-none transition focus:border-lime-200/70 focus:bg-black"
          >
            <option value="">Genero</option>
            {genderOptions.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {characters.map((character) => (
            <Link
              key={character.id}
              href={`/rick-and-morty/character/${character.id}`}
              className="overflow-hidden rounded-[24px] border border-white/15 bg-black/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition hover:-translate-y-1 hover:bg-white/10"
            >
              <CharacterImage
                src={character.image}
                alt={character.name}
                width={300}
                height={300}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="font-semibold text-white">{character.name}</h3>
                <p className="mt-1 text-sm text-white/45">
                  {character.status} - {character.species}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {message ? (
          <p className="mt-6 rounded-[18px] border border-yellow-300/20 bg-yellow-300/10 px-4 py-3 text-sm text-yellow-100">
            {message}
          </p>
        ) : null}
      </div>
    </section>
  );
}
