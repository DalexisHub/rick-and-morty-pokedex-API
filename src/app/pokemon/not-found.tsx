import Link from "next/link";
import { IoSearch } from "react-icons/io5";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-68px)] items-center justify-center p-8">
      <div className="max-w-lg rounded-xl bg-white p-8 text-center text-gray-800 shadow-2xl">
        <IoSearch className="mx-auto mb-4 text-purple-700" size={56} />
        <h2 className="mb-3 text-3xl font-bold">Pokemon no encontrado</h2>
        <p className="mb-6 text-gray-600">
          El Pokemon que buscas no existe o no esta disponible.
        </p>
        <Link
          href="/pokemon"
          className="inline-block rounded-lg bg-black px-6 py-3 font-bold text-white transition hover:bg-purple-900"
        >
          Volver al Pokedex
        </Link>
      </div>
    </div>
  );
}
