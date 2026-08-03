const categorias = [
  { nome: "Energia Solar", slug: "energia-solar", descricao: "Geradores, placas e kits solares para propriedade rural" },
  { nome: "Maquinário Agrícola", slug: "maquinario", descricao: "Tratores, implementos e ferramentas para o campo" },
  { nome: "Veículos & Acessórios", slug: "veiculos", descricao: "4x4, utilitários e acessórios para estrada e fazenda" },
  { nome: "Cidades de MT", slug: "cidades-mt", descricao: "Economia, agronegócio e custo de vida por cidade" },
];

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-2">Guia de compras e negocios do Mato Grosso</h1>
      <p className="text-gray-600 mb-10">Reviews, comparativos e economia regional para o produtor e empresario de MT.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {categorias.map((cat) => (
  <a
    key={cat.slug}
    href={`/categorias/${cat.slug}`}
    className="border rounded-lg p-5 hover:border-gray-400 transition"
  >
    <h2 className="text-lg font-medium mb-1">{cat.nome}</h2>
    <p className="text-sm text-gray-600">{cat.descricao}</p>
  </a>
))}
      </div>
    </main>
  );
}