"use client"

import Link from "next/link"
import { useCarrinho } from "@/lib/CarrinhoContext"
import { ShoppingBag } from "lucide-react"

export default function Header() {
  const { totalItens } = useCarrinho()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight text-black">
          NOVA
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-black transition-colors">Início</Link>
          <Link href="/?cat=Roupas" className="hover:text-black transition-colors">Roupas</Link>
          <Link href="/?cat=Calçados" className="hover:text-black transition-colors">Calçados</Link>
          <Link href="/?cat=Acessórios" className="hover:text-black transition-colors">Acessórios</Link>
        </nav>

        <Link href="/carrinho" className="relative flex items-center gap-1 text-black hover:opacity-70 transition-opacity">
          <ShoppingBag className="w-6 h-6" />
          {totalItens > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalItens}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
