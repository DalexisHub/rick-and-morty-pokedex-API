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
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="max-w-lg rounded-[28px] border border-red-300/20 bg-white/8 p-8 text-center shadow-2xl backdrop-blur-2xl">
        <IoAlertCircle className="mx-auto mb-4 text-red-400" size={56} />
        <h2 className="mb-3 text-3xl font-semibold text-white">
          Algo salio mal
        </h2>
        <p className="mb-6 text-white/60">
          No pudimos cargar la informacion de Rick and Morty.
        </p>
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-lime-100"
        >
          <IoRefresh size={20} />
          Intentar nuevamente
        </button>
      </div>
    </div>
  );
}
