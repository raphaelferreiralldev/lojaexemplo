"use client"

import Image from "next/image"
import Link from "next/link"
import { Produto, formatarPreco } from "@/lib/produtos"
import { useCarrinho } from "@/lib/CarrinhoContext"
import { ShoppingCart, Star } from "lucide-react"
import { useState } from "react"

export default function ProdutoCard({ produto }: { produto: Produto }) {
  const { adicionarItem } = useCarrinho()
  const [adicionado, setAdicionado] = useState(false)

  function handleAdicionar(e: React.MouseEvent) {
    e.preventDefault()
    adicionarItem(produto)
    setAdicionado(true)
    setTimeout(() => setAdicionado(false), 1500)
  }

  return (
    <Link href={`/produto/${produto.id}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative overflow-hidden aspect-[4/5]">
          <Image
            src={produto.imagem}
            alt={produto.nome}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <span className="absolute top-3 left-3 bg-white text-xs font-semibold text-gray-600 px-2 py-1 rounded-full">
            {produto.categoria}
          </span>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-1 text-amber-400 mb-1">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs text-gray-500">{produto.avaliacao}</span>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{produto.nome}</h3>
          <div className="flex items-center justify-between mt-3">
            <span className="text-base font-bold text-gray-900">{formatarPreco(produto.preco)}</span>
            <button
              onClick={handleAdicionar}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full transition-all duration-200 ${
                adicionado
                  ? "bg-green-500 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {adicionado ? "Adicionado!" : "Adicionar"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
