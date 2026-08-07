const artigos = [
  {
    slug: "exemplo-artigo",
    categoria: "Energia Solar",
    titulo: "Qual o melhor gerador solar para propriedade rural em 2026?",
    respostaDireta:
      "Resposta direta: um kit solar de 3kWp com bateria de 5kWh atende bem uma propriedade rural pequena a media, cobrindo bomba d'agua, iluminacao e eletrodomesticos basicos, com custo entre R$ 15.000 e R$ 22.000 instalado.",
    resumo: [
      "Potencia recomendada: 3kWp para propriedades pequenas",
      "Autonomia media: 1-2 dias sem sol direto",
      "Prazo de instalacao: 5-10 dias uteis",
    ],
    tabela: [
      { modelo: "Kit 3kWp", preco: "R$ 15.000 - 18.000", idealPara: "Sitio pequeno" },
      { modelo: "Kit 5kWp", preco: "R$ 22.000 - 28.000", idealPara: "Fazenda media" },
    ],
    faq: [
      { pergunta: "Quanto tempo dura a bateria?", resposta: "Resposta direta aqui." },
    ],
  },
];

export function generateStaticParams() {
  return artigos.map((a) => ({ slug: a.slug }));
}

export default async function ArtigoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artigo = artigos.find((a) => a.slug === slug);

  if (!artigo) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <p>Artigo nao encontrado.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <p className="text-sm text-gray-500 mb-2">{artigo.categoria}</p>
      <h1 className="text-3xl font-semibold mb-4">{artigo.titulo}</h1>

      <p className="text-lg mb-6">{artigo.respostaDireta}</p>

      <div className="border rounded-lg p-5 mb-8 bg-gray-50">
        <h2 className="font-medium mb-2">Resumo rapido</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          {artigo.resumo.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <table className="w-full text-sm mb-8 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left border">Modelo</th>
            <th className="p-2 text-left border">Preco aprox.</th>
            <th className="p-2 text-left border">Ideal para</th>
          </tr>
        </thead>
        <tbody>
          {artigo.tabela.map((linha, i) => (
            <tr key={i}>
              <td className="p-2 border">{linha.modelo}</td>
              <td className="p-2 border">{linha.preco}</td>
              <td className="p-2 border">{linha.idealPara}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-medium mb-3">Perguntas frequentes</h2>
      <div className="space-y-3">
        {artigo.faq.map((item, i) => (
          <div key={i}>
            <p className="font-medium">{item.pergunta}</p>
            <p className="text-sm text-gray-600">{item.resposta}</p>
          </div>
        ))}
      </div>
    </main>
  );
}