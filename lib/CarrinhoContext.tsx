"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Produto } from "./produtos"

export type ItemCarrinho = {
  produto: Produto
  quantidade: number
}

type CarrinhoContextType = {
  itens: ItemCarrinho[]
  adicionarItem: (produto: Produto) => void
  removerItem: (id: number) => void
  alterarQuantidade: (id: number, quantidade: number) => void
  limparCarrinho: () => void
  total: number
  totalItens: number
}

const CarrinhoContext = createContext<CarrinhoContextType | null>(null)

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([])

  useEffect(() => {
    const salvo = localStorage.getItem("carrinho")
    if (salvo) setItens(JSON.parse(salvo))
  }, [])

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens))
  }, [itens])

  function adicionarItem(produto: Produto) {
    setItens((prev) => {
      const existente = prev.find((i) => i.produto.id === produto.id)
      if (existente) {
        return prev.map((i) =>
          i.produto.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
        )
      }
      return [...prev, { produto, quantidade: 1 }]
    })
  }

  function removerItem(id: number) {
    setItens((prev) => prev.filter((i) => i.produto.id !== id))
  }

  function alterarQuantidade(id: number, quantidade: number) {
    if (quantidade <= 0) {
      removerItem(id)
      return
    }
    setItens((prev) =>
      prev.map((i) => (i.produto.id === id ? { ...i, quantidade } : i))
    )
  }

  function limparCarrinho() {
    setItens([])
  }

  const total = itens.reduce((acc, i) => acc + i.produto.preco * i.quantidade, 0)
  const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0)

  return (
    <CarrinhoContext.Provider
      value={{ itens, adicionarItem, removerItem, alterarQuantidade, limparCarrinho, total, totalItens }}
    >
      {children}
    </CarrinhoContext.Provider>
  )
}

export function useCarrinho() {
  const ctx = useContext(CarrinhoContext)
  if (!ctx) throw new Error("useCarrinho deve ser usado dentro de CarrinhoProvider")
  return ctx
}
