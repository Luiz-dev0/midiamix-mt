export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-gray-900 text-gray-300 text-sm">
      <div className="max-w-5xl mx-auto px-6 py-10 grid sm:grid-cols-3 gap-8">
        <div>
          <p className="text-white font-semibold mb-2">MidiaMix MT</p>
          <p className="text-gray-400">
            Conteudo, reviews e economia regional de Mato Grosso.
          </p>
        </div>

        <div>
          <p className="text-white font-medium mb-2">Categorias</p>
          <ul className="space-y-1">
            <li>
              <a href="/categorias/energia-solar" className="hover:text-white">
                Energia Solar
              </a>
            </li>
            <li>
              <a href="/categorias/maquinario" className="hover:text-white">
                Maquinario Agricola
              </a>
            </li>
            <li>
              <a href="/categorias/veiculos" className="hover:text-white">
                Veiculos & Acessorios
              </a>
            </li>
            <li>
              <a href="/categorias/cidades-mt" className="hover:text-white">
                Cidades de MT
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-white font-medium mb-2">Aviso</p>
          <p className="text-gray-400">
            Este site pode conter links de afiliado. Podemos ganhar comissao
            em compras feitas atraves deles, sem custo extra para voce.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800 px-6 py-4 text-center text-gray-500">
        © {new Date().getFullYear()} MidiaMix MT. Todos os direitos reservados.
      </div>
    </footer>
  );
}