"use client";

import { useState } from "react";

export default function AdminPage() {
  const [titulo, setTitulo] = useState("");
  const [slug, setSlug] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");

  async function criarArtigo(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Salvando...");

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: titulo,
          slug,
          categoryId: categoriaId,
          metaDescription,
          content,
        }),
      });

      if (!res.ok) throw new Error("Falha ao criar artigo");

      setStatus("Artigo criado como rascunho.");
      setTitulo("");
      setSlug("");
      setCategoriaId("");
      setMetaDescription("");
      setContent("");
    } catch (err) {
      setStatus("Erro ao salvar. Confere se a API esta rodando.");
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">Novo artigo</h1>

      <form onSubmit={criarArtigo} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Titulo</label>
          <input
            className="w-full border rounded p-2"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Slug (URL)</label>
          <input
            className="w-full border rounded p-2"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="melhor-gerador-solar-fazenda"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">ID da categoria</label>
          <input
            className="w-full border rounded p-2"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            placeholder="cole o id gerado pelo Prisma"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Meta description</label>
          <input
            className="w-full border rounded p-2"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            maxLength={155}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Conteudo (Markdown)</label>
          <textarea
            className="w-full border rounded p-2 h-64"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
        >
          Salvar rascunho
        </button>

        {status && <p className="text-sm text-gray-600">{status}</p>}
      </form>
    </main>
  );
}