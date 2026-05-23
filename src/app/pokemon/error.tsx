"use client";

import { useEffect } from "react";
import { IoAlertCircle, IoRefresh } from "react-icons/io5";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-68px)] items-center justify-center p-8">
      <div className="max-w-lg rounded-xl bg-white p-8 text-center text-gray-800 shadow-2xl">
        <IoAlertCircle className="mx-auto mb-4 text-red-500" size={56} />
        <h2 className="mb-3 text-3xl font-bold">Algo salio mal</h2>
        <p className="mb-6 text-gray-600">
          No pudimos cargar la informacion del Pokedex.
        </p>
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 font-bold text-white transition hover:bg-purple-900"
        >
          <IoRefresh size={20} />
          Intentar nuevamente
        </button>
      </div>
    </div>
  );
}
