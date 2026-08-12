"use client";

import { useState } from "react";

type Categoria = {
  id: string;
  name: string;
  slug: string;
};

export default function SiteHeader({ categorias }: { categorias: Categoria[] }) {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-black text-white">
  <div className="relative flex items-center px-4 h-16">
    <button
      onClick={() => setAberto(true)}
      aria-label="Abrir menu"
      className="p-2 -ml-2 rounded hover:bg-gray-800 transition z-10"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 6h18M3 12h18M3 18h18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>

    <a
      href="/"
      className="absolute left-1/2 -translate-x-1/2"
    >
      <img src="/logo.svg" alt="MidiaMix MT" className="h-8" />
    </a>
  </div>
</header>

      {aberto && (
        <div
          onClick={() => setAberto(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform duration-200 ${
          aberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b">
          <span className="font-semibold">Categorias</span>
          <button
            onClick={() => setAberto(false)}
            aria-label="Fechar menu"
            className="p-2 rounded hover:bg-gray-100 transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {categorias.map((cat) => (
            <a
              key={cat.slug}
              href={`/categorias/${cat.slug}`}
              onClick={() => setAberto(false)}
              className="block px-3 py-2 rounded hover:bg-gray-100 transition"
            >
              {cat.name}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}