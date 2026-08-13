"use client";

import { useState } from "react";
import Link from "next/link";

type Artigo = {
  slug: string;
  title: string;
  coverImageUrl?: string | null;
  category?: { name: string };
};

export default function Carrossel({ artigos }: { artigos: Artigo[] }) {
  const [index, setIndex] = useState(0);
  const total = artigos.length;

  function anterior() {
    setIndex((i) => (i - 1 + total) % total);
  }

  function proximo() {
    setIndex((i) => (i + 1) % total);
  }

  return (
    <div className="relative -mx-6 sm:mx-0 overflow-hidden rounded-none sm:rounded-lg">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {artigos.map((artigo) => (
          <Link
            key={artigo.slug}
            href={`/artigos/${artigo.slug}`}
            className="relative shrink-0 w-full h-56 sm:h-96"
          >
            <img
              src={artigo.coverImageUrl!}
              alt={artigo.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <p className="text-xs sm:text-sm text-orange-400 font-medium mb-1">
                {artigo.category?.name}
              </p>
              <p className="text-white text-lg sm:text-2xl font-semibold leading-snug max-w-2xl">
                {artigo.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            onClick={anterior}
            aria-label="Anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/80 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={proximo}
            aria-label="Próximo"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/80 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-3 right-4 flex gap-1.5">
            {artigos.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Ir para destaque ${i + 1}`}
                className={`w-2 h-2 rounded-full transition ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}