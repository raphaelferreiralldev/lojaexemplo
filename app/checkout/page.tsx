"use client"

import { useState } from "react"
import { useCarrinho } from "@/lib/CarrinhoContext"
import { formatarPreco } from "@/lib/produtos"
import Link from "next/link"
import { CreditCard, QrCode, FileText, CheckCircle, ArrowLeft, Lock } from "lucide-react"

type FormaPagamento = "cartao" | "pix" | "boleto"

export default function CheckoutPage() {
  const { itens, total, limparCarrinho } = useCarrinho()
  const [forma, setForma] = useState<FormaPagamento>("cartao")
  const [pedidoFeito, setPedidoFeito] = useState(false)

  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    cep: "",
    numero: "",
    cartaoNome: "",
    cartaoNumero: "",
    cartaoValidade: "",
    cartaoCvv: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    limparCarrinho()
    setPedidoFeito(true)
  }

  if (pedidoFeito) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Pedido confirmado!</h2>
        <p className="text-gray-500 mb-2">Obrigado pela sua compra.</p>
        <p className="text-gray-500 mb-8">Você receberá um e-mail de confirmação em breve.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
        >
          Voltar para a loja
        </Link>
      </div>
    )
  }

  if (itens.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-gray-500 mb-4">Seu carrinho está vazio.</p>
        <Link href="/" className="text-black font-semibold underline">Voltar para a loja</Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link href="/carrinho" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Voltar ao carrinho
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Finalizar compra</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Formulário */}
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
          {/* Dados pessoais */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Dados pessoais</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm text-gray-600 block mb-1">Nome completo</label>
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="Maria Silva"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">E-mail</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="maria@email.com"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">CPF</label>
                <input
                  name="cpf"
                  value={form.cpf}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="000.000.000-00"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">CEP</label>
                <input
                  name="cep"
                  value={form.cep}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="00000-000"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Número</label>
                <input
                  name="numero"
                  value={form.numero}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="123"
                />
              </div>
            </div>
          </div>

          {/* Pagamento */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Forma de pagamento</h2>

            {/* Abas */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {([
                { key: "cartao", label: "Cartão", icon: CreditCard },
                { key: "pix", label: "Pix", icon: QrCode },
                { key: "boleto", label: "Boleto", icon: FileText },
              ] as const).map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setForma(key)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    forma === key
                      ? "border-black bg-black text-white"
                      : "border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </div>

            {/* Cartão */}
            {forma === "cartao" && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Nome no cartão</label>
                  <input
                    name="cartaoNome"
                    value={form.cartaoNome}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    placeholder="MARIA SILVA"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Número do cartão</label>
                  <input
                    name="cartaoNumero"
                    value={form.cartaoNumero}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Validade</label>
                    <input
                      name="cartaoValidade"
                      value={form.cartaoValidade}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                      placeholder="MM/AA"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">CVV</label>
                    <input
                      name="cartaoCvv"
                      value={form.cartaoCvv}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                      placeholder="123"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Parcelas</label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors">
                    <option>1x de {formatarPreco(total)} sem juros</option>
                    <option>2x de {formatarPreco(total / 2)} sem juros</option>
                    <option>3x de {formatarPreco(total / 3)} sem juros</option>
                    <option>6x de {formatarPreco(total / 6)} sem juros</option>
                    <option>12x de {formatarPreco(total / 12)} sem juros</option>
                  </select>
                </div>
              </div>
            )}

            {/* Pix */}
            {forma === "pix" && (
              <div className="text-center py-6">
                <div className="w-40 h-40 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-2">Escaneie o QR Code com o app do seu banco</p>
                <p className="text-xs text-gray-400">O QR Code será gerado após confirmar o pedido</p>
                <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3">
                  <p className="text-sm text-green-700 font-medium">Desconto de 5% no Pix!</p>
                  <p className="text-xl font-bold text-green-700 mt-1">{formatarPreco(total * 0.95)}</p>
                </div>
              </div>
            )}

            {/* Boleto */}
            {forma === "boleto" && (
              <div className="text-center py-6">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">O boleto será gerado após a confirmação</p>
                <p className="text-xs text-gray-400">Vencimento em 3 dias úteis</p>
                <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-3">
                  <p className="text-sm text-gray-600">Valor total:</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{formatarPreco(total)}</p>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-2xl font-bold text-base hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Confirmar pedido
          </button>
        </form>

        {/* Resumo */}
        <div className="bg-white rounded-2xl p-6 shadow-sm h-fit sticky top-24">
          <h2 className="font-bold text-gray-900 mb-4">Resumo</h2>
          <div className="space-y-3 text-sm text-gray-600 mb-4">
            {itens.map(({ produto, quantidade }) => (
              <div key={produto.id} className="flex justify-between">
                <span className="truncate mr-2">{produto.nome} × {quantidade}</span>
                <span className="font-medium whitespace-nowrap">{formatarPreco(produto.preco * quantidade)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between font-bold text-gray-900 text-lg">
              <span>Total</span>
              <span>{formatarPreco(forma === "pix" ? total * 0.95 : total)}</span>
            </div>
            {forma === "pix" && (
              <p className="text-green-600 text-xs mt-1">Desconto de 5% aplicado no Pix</p>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Compra protegida pelo MercadoPago
          </p>
        </div>
      </div>
    </div>
  )
}
