import Link from "next/link";
import { GiPortal } from "react-icons/gi";
import { IoGameController, IoRocket } from "react-icons/io5";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_70%_20%,rgba(190,242,100,0.18)_0,rgba(20,184,166,0.08)_28%,rgba(0,0,0,0)_60%),linear-gradient(180deg,#000_0%,#030604_54%,#000_100%)] px-4 py-10 text-white">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl flex-col justify-center">
        <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-lime-100 backdrop-blur-2xl">
          <IoRocket size={20} />
          Laboratorio Next.js
        </div>

        <h1 className="max-w-3xl text-5xl font-semibold leading-tight md:text-7xl">
          Pokedex y Rick and Morty API
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
          Aplicacion con rutas estaticas, rutas dinamicas, SSG, ISR, CSR,
          busqueda en tiempo real y consumo de APIs publicas.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/rick-and-morty"
            className="rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15"
          >
            <GiPortal className="mb-4 text-lime-300" size={34} />
            <h2 className="text-2xl font-semibold">Rick and Morty</h2>
            <p className="mt-2 text-sm leading-6 text-white/55">
              TAREA con busqueda CSR, rutas por personaje e ISR cada 10 dias.
            </p>
          </Link>

          <Link
            href="/pokemon"
            className="rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15"
          >
            <IoGameController className="mb-4 text-purple-300" size={34} />
            <h2 className="text-2xl font-semibold">Pokedex</h2>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Laboratorio con App Router, generateStaticParams e ISR.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
