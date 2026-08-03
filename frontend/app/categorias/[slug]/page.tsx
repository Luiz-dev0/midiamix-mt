const categorias = [
  { nome: "Energia Solar", slug: "energia-solar", descricao: "Geradores, placas e kits solares para propriedade rural" },
  { nome: "Maquinário Agrícola", slug: "maquinario", descricao: "Tratores, implementos e ferramentas para o campo" },
  { nome: "Veículos & Acessórios", slug: "veiculos", descricao: "4x4, utilitários e acessórios para estrada e fazenda" },
  { nome: "Cidades de MT", slug: "cidades-mt", descricao: "Economia, agronegócio e custo de vida por cidade" },
];

const artigosExemplo = [
  { titulo: "Qual o melhor gerador solar para propriedade rural em 2026?", slug: "exemplo-artigo" },
];

export function generateStaticParams() {
  return categorias.map((cat) => ({ slug: cat.slug }));
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoria = categorias.find((cat) => cat.slug === slug);

  if (!categoria) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <p>Categoria não encontrada.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <a href="/" className="text-sm text-gray-500 hover:underline">
        ← Voltar
      </a>
      <h1 className="text-3xl font-semibold mt-2 mb-2">{categoria.nome}</h1>
      <p className="text-gray-600 mb-8">{categoria.descricao}</p>

      <div className="space-y-3">
        {artigosExemplo.map((artigo) => (
            <a
          
            key={artigo.slug}
            href={`/artigos/${artigo.slug}`}
            className="block border rounded-lg p-4 hover:border-gray-400 transition"
          >
            {artigo.titulo}
          </a>
        ))}
      </div>
    </main>
  );
}