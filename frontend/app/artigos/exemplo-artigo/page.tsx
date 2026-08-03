export default function ArtigoExemplo() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <p className="text-sm text-gray-500 mb-2">Energia Solar</p>
      <h1 className="text-3xl font-semibold mb-4">
        Qual o melhor gerador solar para propriedade rural em 2026?
      </h1>

      <p className="text-lg mb-6">
        Resposta direta: um kit solar de 3kWp com bateria de 5kWh atende bem
        uma propriedade rural pequena a média, cobrindo bomba d'água,
        iluminação e eletrodomésticos básicos, com custo entre R$ 15.000 e
        R$ 22.000 instalado.
      </p>

      <div className="border rounded-lg p-5 mb-8 bg-gray-50">
        <h2 className="font-medium mb-2">Resumo rápido</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Potência recomendada: 3kWp para propriedades pequenas</li>
          <li>Autonomia média: 1-2 dias sem sol direto</li>
          <li>Prazo de instalação: 5-10 dias úteis</li>
        </ul>
      </div>

      <table className="w-full text-sm mb-8 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left border">Modelo</th>
            <th className="p-2 text-left border">Preço aprox.</th>
            <th className="p-2 text-left border">Ideal para</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border">Kit 3kWp</td>
            <td className="p-2 border">R$ 15.000 - 18.000</td>
            <td className="p-2 border">Sítio pequeno</td>
          </tr>
          <tr>
            <td className="p-2 border">Kit 5kWp</td>
            <td className="p-2 border">R$ 22.000 - 28.000</td>
            <td className="p-2 border">Fazenda média</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-xl font-medium mb-3">
        Vale a pena investir em energia solar numa propriedade pequena?
      </h2>
      <p className="mb-6">
        Conteúdo do artigo entra aqui — texto gerado pelo GPT seguindo o
        template.
      </p>

      <h2 className="text-xl font-medium mb-3">Perguntas frequentes</h2>
      <div className="space-y-3">
        <div>
          <p className="font-medium">Quanto tempo dura a bateria?</p>
          <p className="text-sm text-gray-600">Resposta direta aqui.</p>
        </div>
      </div>
    </main>
  );
}