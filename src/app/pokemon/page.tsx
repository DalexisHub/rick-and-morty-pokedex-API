import type { PokemonListResponse, SimplePokemon } from "@/types/pokemon";
import Image from "next/image";
import Link from "next/link";
import { IoMdList } from "react-icons/io";

async function getPokemons(): Promise<SimplePokemon[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error("Error al cargar pokemon");
  }

  const data: PokemonListResponse = await res.json();

  return data.results.map((pokemon, index) => ({
    name: pokemon.name,
    id: index + 1,
  }));
}

export default async function PokemonList() {
  const pokemons = await getPokemons();

  return (
    <div className="p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-12 text-left text-4xl font-bold text-white drop-shadow-lg">
          <IoMdList size={40} className="inline-block" /> Lista de Pokemons
          (ISR)
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {pokemons.map((pokemon) => (
            <Link
              key={pokemon.name}
              href={`/pokemon/${pokemon.name}`}
              className="transform transition hover:scale-105"
            >
              <div className="cursor-pointer rounded-xl bg-white p-6 text-gray-700 shadow-lg hover:shadow-2xl">
                <Image
                  width={100}
                  height={100}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                  alt={pokemon.name}
                  className="mx-auto h-32 w-32 object-contain"
                  priority={false}
                />
                <h2 className="mt-4 text-center text-xl font-bold capitalize">
                  {pokemon.name}
                </h2>
                <p className="text-center text-gray-500">
                  #{pokemon.id.toString().padStart(3, "0")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
