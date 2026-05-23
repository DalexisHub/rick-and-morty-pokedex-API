import Link from "next/link";
import { IoSearch } from "react-icons/io5";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="max-w-lg rounded-[28px] border border-lime-300/20 bg-white/8 p-8 text-center shadow-2xl backdrop-blur-2xl">
        <IoSearch className="mx-auto mb-4 text-lime-300" size={56} />
        <h2 className="mb-3 text-3xl font-semibold text-white">
          Personaje no encontrado
        </h2>
        <p className="mb-6 text-white/60">
          El personaje solicitado no existe en esta dimension.
        </p>
        <Link
          href="/rick-and-morty"
          className="inline-block rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-lime-100"
        >
          Volver a personajes
        </Link>
      </div>
    </div>
  );
}
