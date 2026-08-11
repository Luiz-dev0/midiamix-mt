import { getCategorias, getArtigos } from "../../../lib/api";

export async function generateStaticParams() {
  const categorias = await getCategorias();
  return categorias.map((cat) => ({ slug: cat.slug }));
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categorias = await getCategorias();
  const categoria = categorias.find((cat) => cat.slug === slug);

  if (!categoria) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <p>Categoria não encontrada.</p>
      </main>
    );
  }

  const artigos = await getArtigos(slug);

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <a href="/" className="text-sm text-gray-500 hover:underline">
        ← Voltar
      </a>
      <h1 className="text-3xl font-semibold mt-2 mb-2">{categoria.name}</h1>

      <div className="space-y-3 mt-8">
        {artigos.length === 0 && (
          <p className="text-gray-500">Nenhum artigo publicado ainda.</p>
        )}
        {artigos.map((artigo) => (
          <a
            key={artigo.slug}
            href={`/artigos/${artigo.slug}`}
            className="block border rounded-lg p-4 hover:border-gray-400 transition"
          >
            {artigo.title}
          </a>
        ))}
      </div>
    </main>
  );
}