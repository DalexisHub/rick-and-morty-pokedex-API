import Image from "next/image";
import { GiPortal } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";
import CharacterList from "./CharacterList";
import CharacterSearch from "./CharacterSearch";
import { getAllCharacters } from "./data";
import rickAndMortyLogo from "./image.png";

export default async function Home() {
  const characters = await getAllCharacters();

  return (
    <main>
      <section className="bg-[radial-gradient(circle_at_76%_18%,rgba(190,242,100,0.28)_0,rgba(20,184,166,0.12)_30%,rgba(0,0,0,0)_62%),linear-gradient(180deg,#000_0%,#030604_54%,#000_100%)]">
        <div className="mx-auto grid min-h-[620px] max-w-7xl grid-cols-1 gap-10 px-4 py-16 md:grid-cols-[1fr_540px] md:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-lime-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl">
              <GiPortal size={22} />
              API REST
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-white md:text-6xl">
              Personajes de Rick and Morty
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Explora {characters.length} personajes con rutas estaticas,
              busqueda interactiva y detalle regenerado cada 10 dias.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#characters"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black shadow-[0_16px_40px_rgba(255,255,255,0.14)] transition hover:bg-lime-100"
              >
                <IoPeople size={20} />
                Ver lista
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Image
              src={rickAndMortyLogo}
              alt="Rick and Morty"
              className="h-auto w-full max-w-xl drop-shadow-[0_0_36px_rgba(190,242,100,0.34)]"
              priority
            />
          </div>
        </div>
      </section>

      <div id="search">
        <CharacterSearch />
      </div>

      <section id="characters" className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">
              Lista de personajes
            </h2>
            <p className="mt-1 text-white/50">
              Datos obtenidos con cache forzado y render estatico.
            </p>
          </div>
          <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-lime-100 backdrop-blur-xl">
            {characters.length} registros
          </span>
        </div>

        <CharacterList characters={characters} />
      </section>
    </main>
  );
}
