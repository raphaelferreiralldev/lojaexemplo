"use client"

import { getProduto, formatarPreco } from "@/lib/produtos"
import { useCarrinho } from "@/lib/CarrinhoContext"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ShoppingCart, Star, ArrowLeft, Shield, Truck, RefreshCw } from "lucide-react"
import { useState, use } from "react"

export default function PaginaProduto({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const produto = getProduto(Number(id))
  const { adicionarItem } = useCarrinho()
  const [adicionado, setAdicionado] = useState(false)

  if (!produto) notFound()

  function handleAdicionar() {
    adicionarItem(produto)
    setAdicionado(true)
    setTimeout(() => setAdicionado(false), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Voltar para loja
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Imagem */}
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={produto.imagem}
            alt={produto.nome}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <span className="absolute top-4 left-4 bg-white text-xs font-semibold text-gray-600 px-3 py-1.5 rounded-full">
            {produto.categoria}
          </span>
        </div>

        {/* Detalhes */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1 text-amber-400 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(produto.avaliacao) ? "fill-current" : "fill-gray-200 text-gray-200"}`} />
            ))}
            <span className="text-sm text-gray-500 ml-1">{produto.avaliacao} de 5</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{produto.nome}</h1>
          <p className="text-gray-500 leading-relaxed mb-6">{produto.descricao}</p>

          <div className="text-4xl font-bold text-gray-900 mb-2">
            {formatarPreco(produto.preco)}
          </div>
          <p className="text-sm text-gray-500 mb-8">
            ou 12x de {formatarPreco(produto.preco / 12)} sem juros
          </p>

          <button
            onClick={handleAdicionar}
            className={`flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-base font-semibold transition-all duration-200 ${
              adicionado
                ? "bg-green-500 text-white"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            {adicionado ? "Adicionado ao carrinho!" : "Adicionar ao carrinho"}
          </button>

          <Link
            href="/checkout"
            className="flex items-center justify-center w-full py-4 mt-3 rounded-2xl border-2 border-black text-base font-semibold text-black hover:bg-gray-50 transition-colors"
          >
            Comprar agora
          </Link>

          {/* Diferenciais */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm text-gray-500">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-5 h-5 text-gray-700" />
              <span>Frete grátis acima de R$ 200</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Shield className="w-5 h-5 text-gray-700" />
              <span>Compra 100% segura</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RefreshCw className="w-5 h-5 text-gray-700" />
              <span>Troca grátis em 30 dias</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
