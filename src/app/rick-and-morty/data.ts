import type { Character, CharacterListResponse } from "@/types/rick-and-morty";
import { cache } from "react";

const API_URL = "https://rickandmortyapi.com/api/character";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson<T>(
  url: string,
  revalidateSeconds?: number,
): Promise<T> {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const res = await fetch(
      url,
      revalidateSeconds
        ? { next: { revalidate: revalidateSeconds } }
        : { cache: "force-cache" },
    );

    if (res.ok) {
      return res.json();
    }

    const retryAfter = Number(res.headers.get("retry-after"));
    const delay = Number.isFinite(retryAfter)
      ? retryAfter * 1000
      : 1000 * (attempt + 1);
    await wait(delay);
  }

  throw new Error("No se pudo cargar la informacion de personajes.");
}

function chunkIds(total: number, size: number) {
  const ids = Array.from({ length: total }, (_, index) => index + 1);
  const chunks: number[][] = [];

  for (let index = 0; index < ids.length; index += size) {
    chunks.push(ids.slice(index, index + size));
  }

  return chunks;
}

export const getAllCharacters = cache(
  async (revalidateSeconds?: number): Promise<Character[]> => {
    const firstData = await fetchJson<CharacterListResponse>(
      API_URL,
      revalidateSeconds,
    );
    const chunks = chunkIds(firstData.info.count, 100);
    const characters: Character[] = [];

    for (const ids of chunks) {
      const data = await fetchJson<Character[]>(
        `${API_URL}/${ids.join(",")}`,
        revalidateSeconds,
      );
      characters.push(...data);
    }

    return characters;
  },
);

export const getCharacterById = cache(
  async (
    id: string,
    revalidateSeconds?: number,
  ): Promise<Character | undefined> => {
    const characters = await getAllCharacters(revalidateSeconds);
    return characters.find((character) => String(character.id) === id);
  },
);
