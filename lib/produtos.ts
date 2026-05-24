export type Produto = {
  id: number
  nome: string
  preco: number
  descricao: string
  imagem: string
  categoria: string
  avaliacao: number
}

export const produtos: Produto[] = [
  {
    id: 1,
    nome: "Camiseta Essencial",
    preco: 89.9,
    descricao: "Camiseta 100% algodão com corte slim. Confortável para o dia a dia, disponível em diversas cores.",
    imagem: "https://picsum.photos/seed/camisa1/400/500",
    categoria: "Roupas",
    avaliacao: 4.8,
  },
  {
    id: 2,
    nome: "Jaqueta Jeans",
    preco: 229.9,
    descricao: "Jaqueta jeans clássica com lavagem diferenciada. Versátil e estilosa para qualquer ocasião.",
    imagem: "https://picsum.photos/seed/jaqueta2/400/500",
    categoria: "Roupas",
    avaliacao: 4.6,
  },
  {
    id: 3,
    nome: "Calça Jogger",
    preco: 159.9,
    descricao: "Calça jogger com elástico e cordão. Conforto máximo sem abrir mão do estilo.",
    imagem: "https://picsum.photos/seed/calca3/400/500",
    categoria: "Roupas",
    avaliacao: 4.7,
  },
  {
    id: 4,
    nome: "Tênis Casual",
    preco: 249.9,
    descricao: "Tênis casual com solado em EVA. Leve, confortável e ideal para o uso diário.",
    imagem: "https://picsum.photos/seed/tenis4/400/500",
    categoria: "Calçados",
    avaliacao: 4.9,
  },
  {
    id: 5,
    nome: "Sandália Minimalista",
    preco: 139.9,
    descricao: "Sandália de couro sintético com design minimalista. Elegante e confortável.",
    imagem: "https://picsum.photos/seed/sandalia5/400/500",
    categoria: "Calçados",
    avaliacao: 4.5,
  },
  {
    id: 6,
    nome: "Mochila Urbana",
    preco: 189.9,
    descricao: "Mochila com compartimento para notebook até 15\". Resistente à água e com design moderno.",
    imagem: "https://picsum.photos/seed/mochila6/400/500",
    categoria: "Acessórios",
    avaliacao: 4.8,
  },
  {
    id: 7,
    nome: "Óculos Retrô",
    preco: 119.9,
    descricao: "Óculos de sol com armação retrô e lente UV400. Proteção e estilo em um só acessório.",
    imagem: "https://picsum.photos/seed/oculos7/400/500",
    categoria: "Acessórios",
    avaliacao: 4.4,
  },
  {
    id: 8,
    nome: "Relógio Slim",
    preco: 349.9,
    descricao: "Relógio analógico de pulseira em couro. Design slim e elegante para qualquer ocasião.",
    imagem: "https://picsum.photos/seed/relogio8/400/500",
    categoria: "Acessórios",
    avaliacao: 4.9,
  },
]

export function getProduto(id: number): Produto | undefined {
  return produtos.find((p) => p.id === id)
}

export function formatarPreco(preco: number): string {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}
