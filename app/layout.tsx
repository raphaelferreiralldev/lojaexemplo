import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { CarrinhoProvider } from "@/lib/CarrinhoContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NOVA — Moda & Estilo",
  description: "Loja de moda com roupas, calçados e acessórios. Qualidade e estilo no melhor preço.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={geist.className}>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <CarrinhoProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CarrinhoProvider>
      </body>
    </html>
  )
}
