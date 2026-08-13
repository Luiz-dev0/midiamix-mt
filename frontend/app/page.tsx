import Link from "next/link";
import { getCategorias, getArtigos } from "../lib/api";
import Carrossel from "./components/Carrossel";

export async function generateStaticParams() {
  return [];
}

export default async function Home() {
  const categorias = await getCategorias();
  const artigos = await getArtigos();

  const recentes = [...artigos]
    .sort((a, b) =>
      (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")
    )
    .slice(0, 6);

  const destaques = recentes.filter((a) => a.coverImageUrl);

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-2">
        Guia de compras e negócios do Mato Grosso
      </h1>

      <p className="text-gray-600 mb-10">
        Reviews, comparativos e economia regional para o produtor e
        empresário de MT.
      </p>

      {destaques.length > 0 && (
        <div className="mb-16">
          <h2 className="text-xl font-semibold mb-4">Destaques</h2>
          <Carrossel artigos={destaques} />
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4 mb-16">
        {categorias.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categorias/${cat.slug}`}
            className="border rounded-lg p-5 hover:border-gray-400 transition"
          >
            <h2 className="text-lg font-medium">{cat.name}</h2>
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Artigos recentes</h2>

      <div className="space-y-3">
        {recentes.length === 0 && (
          <p className="text-gray-500">Nenhum artigo publicado ainda.</p>
        )}

        {recentes.map((artigo) => (
          <Link
            key={artigo.slug}
            href={`/artigos/${artigo.slug}`}
            className="block border rounded-lg p-4 hover:border-gray-400 transition"
          >
            <p className="text-sm text-gray-500">
              {artigo.category?.name}
            </p>

            <p className="font-medium">{artigo.title}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}