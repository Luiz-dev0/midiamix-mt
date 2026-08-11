import { getArtigos, getArtigoPorSlug } from "../../../lib/api";

export async function generateStaticParams() {
  const artigos = await getArtigos();
  if (artigos.length === 0) {
    return [{ slug: "placeholder" }];
  }
  return artigos.map((a) => ({ slug: a.slug }));
}

export default async function ArtigoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artigo = await getArtigoPorSlug(slug);

  if (!artigo) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <p>Artigo não encontrado.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      {artigo.category && (
        <p className="text-sm text-gray-500 mb-2">{artigo.category.name}</p>
      )}
      <h1 className="text-3xl font-semibold mb-4">{artigo.title}</h1>

      <div className="prose max-w-none">
        <p>{artigo.content}</p>
      </div>
    </main>
  );
}