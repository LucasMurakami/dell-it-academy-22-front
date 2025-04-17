export default function HowItWorks() {
  return (
    <section className="w-full py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-3">Como Funciona</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Organize seus torneios de startups em apenas quatro passos simples
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 relative border-t-4 border-blue-500">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
            <h3 className="text-xl font-semibold mb-3 pt-2">Cadastre Startups</h3>
            <p className="text-gray-600">
              Adicione todas as startups participantes com seus detalhes e informações.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 relative border-t-4 border-blue-500">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
            <h3 className="text-xl font-semibold mb-3 pt-2">Configure Torneios</h3>
            <p className="text-gray-600">
              Defina critérios, rodadas e formato de avaliação para o seu evento.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 relative border-t-4 border-blue-500">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
            <h3 className="text-xl font-semibold mb-3 pt-2">Realize o Evento</h3>
            <p className="text-gray-600">
              Gerencie apresentações, colete avaliações e feedbacks dos jurados.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 relative border-t-4 border-blue-500">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
            <h3 className="text-xl font-semibold mb-3 pt-2">Compartilhe Resultados</h3>
            <p className="text-gray-600">
              Exporte e compartilhe relatórios, resultados e métricas do evento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}