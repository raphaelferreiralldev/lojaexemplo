"use client"

import { useCarrinho } from "@/lib/CarrinhoContext"
import { formatarPreco } from "@/lib/produtos"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"

export default function CarrinhoPage() {
  const { itens, removerItem, alterarQuantidade, total } = useCarrinho()

  if (itens.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Seu carrinho está vazio</h2>
        <p className="text-gray-500 mb-8">Adicione produtos para continuar.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Explorar loja
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Meu Carrinho</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Itens */}
        <div className="md:col-span-2 space-y-4">
          {itens.map(({ produto, quantidade }) => (
            <div key={produto.id} className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={produto.imagem}
                  alt={produto.nome}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{produto.nome}</h3>
                <p className="text-sm text-gray-500 mb-3">{produto.categoria}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alterarQuantidade(produto.id, quantidade - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-medium">{quantidade}</span>
                    <button
                      onClick={() => alterarQuantidade(produto.id, quantidade + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900">
                      {formatarPreco(produto.preco * quantidade)}
                    </span>
                    <button
                      onClick={() => removerItem(produto.id)}
                      className="text-gray-400 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo */}
        <div className="bg-white rounded-2xl p-6 shadow-sm h-fit sticky top-24">
          <h2 className="font-bold text-lg text-gray-900 mb-4">Resumo do pedido</h2>

          <div className="space-y-3 text-sm text-gray-600 mb-4">
            {itens.map(({ produto, quantidade }) => (
              <div key={produto.id} className="flex justify-between">
                <span className="truncate mr-2">{produto.nome} × {quantidade}</span>
                <span className="font-medium whitespace-nowrap">{formatarPreco(produto.preco * quantidade)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 mb-6">
            <div className="flex justify-between font-bold text-gray-900 text-lg">
              <span>Total</span>
              <span>{formatarPreco(total)}</span>
            </div>
            {total >= 200 && (
              <p className="text-green-600 text-xs mt-1">Frete grátis aplicado!</p>
            )}
          </div>

          <Link
            href="/checkout"
            className="block w-full bg-black text-white text-center py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors"
          >
            Finalizar compra
          </Link>

          <Link
            href="/"
            className="block text-center text-sm text-gray-500 mt-3 hover:text-black transition-colors"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  )
}
