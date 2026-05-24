export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-xl mb-3">NOVA</h3>
          <p className="text-sm leading-relaxed">
            Moda e estilo para o seu dia a dia. Qualidade, conforto e design em cada peça.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Atendimento</h4>
          <ul className="text-sm space-y-2">
            <li>Segunda a Sexta: 9h–18h</li>
            <li>contato@lojanovo.com.br</li>
            <li>(11) 99999-9999</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Pagamentos</h4>
          <p className="text-sm">Aceitamos cartão de crédito, débito, Pix e boleto bancário.</p>
          <p className="text-xs mt-3">Parcele em até 12x sem juros.</p>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center text-xs py-4">
        © {new Date().getFullYear()} NOVA. Todos os direitos reservados.
      </div>
    </footer>
  )
}
