import type { Character } from "@/types/rick-and-morty";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  IoCalendar,
  IoFilm,
  IoLink,
  IoLocation,
  IoPlanet,
} from "react-icons/io5";
import CharacterImage from "../../CharacterImage";
import { getAllCharacters, getCharacterById } from "../../data";

export const revalidate = 864000;

interface CharacterPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getCharacter(id: string): Promise<Character> {
  const character = await getCharacterById(id, 864000);

  if (!character) {
    notFound();
  }

  return character;
}

export async function generateStaticParams() {
  const characters = await getAllCharacters(864000);

  return characters.map((character) => ({
    id: String(character.id),
  }));
}

export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { id } = await params;
  const character = await getCharacter(id);

  return {
    title: `${character.name} - Rick and Morty`,
    description: `Detalle de ${character.name}`,
  };
}

const statusColor: Record<Character["status"], string> = {
  Alive: "bg-lime-300/90 text-black",
  Dead: "bg-red-400/90 text-black",
  unknown: "bg-white/14 text-white",
};

function getEpisodeNumber(url: string) {
  return url.split("/").at(-1) ?? url;
}

export default async function CharacterDetail({ params }: CharacterPageProps) {
  const { id } = await params;
  const character = await getCharacter(id);

  const details = [
    ["ID", character.id],
    ["Nombre", character.name],
    ["Estado", character.status],
    ["Especie", character.species],
    ["Tipo", character.type || "Sin tipo registrado"],
    ["Genero", character.gender],
    ["Origen", character.origin.name],
    ["Origen URL", character.origin.url || "Sin URL"],
    ["Ubicacion", character.location.name],
    ["Ubicacion URL", character.location.url || "Sin URL"],
    ["Imagen", character.image],
    ["Endpoint", character.url],
    ["Creado", new Date(character.created).toLocaleString("es-PE")],
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="overflow-hidden rounded-[32px] border border-white/15 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
        <section className="grid grid-cols-1 md:grid-cols-[360px_1fr]">
          <div className="bg-[radial-gradient(circle_at_center,rgba(190,242,100,0.62)_0,rgba(20,184,166,0.25)_42%,rgba(0,0,0,0)_76%)] p-8">
            <CharacterImage
              src={character.image}
              alt={character.name}
              width={300}
              height={300}
              className="mx-auto h-72 w-72 rounded-[28px] object-cover shadow-2xl"
              priority
            />
          </div>

          <div className="p-8">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-sm font-semibold text-white/65">
                #{character.id}
              </span>
              <span
                className={`${statusColor[character.status]} rounded-full px-3 py-1 text-sm font-semibold`}
              >
                {character.status}
              </span>
            </div>
            <h1 className="text-5xl font-semibold text-white">
              {character.name}
            </h1>
            <p className="mt-3 text-lg text-white/55">
              {character.species} - {character.gender}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-[22px] border border-white/10 bg-black/45 p-4">
                <IoPlanet className="mb-2 text-lime-300" size={24} />
                <p className="text-sm text-white/35">Origen</p>
                <p className="font-semibold text-white">
                  {character.origin.name}
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-black/45 p-4">
                <IoLocation className="mb-2 text-cyan-300" size={24} />
                <p className="text-sm text-white/35">Ubicacion actual</p>
                <p className="font-semibold text-white">
                  {character.location.name}
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-black/45 p-4">
                <IoFilm className="mb-2 text-yellow-300" size={24} />
                <p className="text-sm text-white/35">Episodios</p>
                <p className="font-semibold text-white">
                  {character.episode.length}
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-black/45 p-4">
                <IoCalendar className="mb-2 text-pink-300" size={24} />
                <p className="text-sm text-white/35">Creado</p>
                <p className="font-semibold text-white">
                  {new Date(character.created).toLocaleDateString("es-PE")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 p-8">
          <h2 className="mb-5 text-2xl font-semibold text-white">
            Campos del response
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {details.map(([label, value]) => (
              <div
                key={label}
                className="rounded-[20px] border border-white/10 bg-black/45 p-4"
              >
                <p className="text-xs font-semibold uppercase text-lime-200">
                  {label}
                </p>
                <p className="mt-1 break-words text-sm text-white/65">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[20px] border border-white/10 bg-black/45 p-4">
            <p className="mb-3 text-xs font-semibold uppercase text-lime-200">
              Episodios
            </p>
            <div className="flex flex-wrap gap-2">
              {character.episode.map((episode) => (
                <a
                  key={episode}
                  href={episode}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-sm text-white/65 transition hover:bg-white/12 hover:text-white"
                >
                  <IoLink size={14} />
                  Episodio {getEpisodeNumber(episode)}
                </a>
              ))}
            </div>
          </div>
        </section>

        <div className="border-t border-white/10 bg-black/35 p-8">
          <Link
            href="/rick-and-morty"
            className="inline-block rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-lime-100"
          >
            &larr; Volver a la lista
          </Link>
        </div>
      </div>
    </main>
  );
}
