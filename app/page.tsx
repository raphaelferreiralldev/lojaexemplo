import { produtos } from "@/lib/produtos"
import ProdutoCard from "@/components/ProdutoCard"

export default function Home({ searchParams }: { searchParams: { cat?: string } }) {
  const categoria = searchParams?.cat
  const lista = categoria ? produtos.filter((p) => p.categoria === categoria) : produtos

  const categorias = ["Roupas", "Calçados", "Acessórios"]

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero */}
      <section className="bg-black text-white rounded-3xl p-10 mb-10 flex flex-col items-start justify-center min-h-[220px]">
        <span className="text-rose-400 text-sm font-semibold uppercase tracking-widest mb-2">Nova Coleção</span>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Estilo que combina<br />com você.
        </h1>
        <p className="text-gray-400 mb-6">Roupas, calçados e acessórios com frete grátis acima de R$ 200.</p>
        <a
          href="?cat=Roupas"
          className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors text-sm"
        >
          Ver coleção
        </a>
      </section>

      {/* Filtros */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <a
          href="/"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !categoria ? "bg-black text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
          }`}
        >
          Todos
        </a>
        {categorias.map((cat) => (
          <a
            key={cat}
            href={`?cat=${cat}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              categoria === cat
                ? "bg-black text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
            }`}
          >
            {cat}
          </a>
        ))}
      </div>

      {/* Grid de produtos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {lista.map((produto) => (
          <ProdutoCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  )
}
