import { FaUserPlus, FaTrophy, FaChartLine, FaHistory } from "react-icons/fa";

export default function Features() {
  return (
    <section id="recursos" className="w-full py-16 px-6 -mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-all">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-5">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Gestão de Startups</h3>
            <p className="text-gray-600">
              Cadastre, edite e organize as startups participantes dos seus eventos com facilidade.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-all">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-5">
              <FaTrophy className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Sorteios Automáticos</h3>
            <p className="text-gray-600">
              Crie torneios e rodadas com sorteios automáticos e justos entre os participantes.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-all">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-5">
              <FaChartLine className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Relatórios Detalhados</h3>
            <p className="text-gray-600">
              Acesse métricas e relatórios completos de cada torneio e participante.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-all">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-5">
              <FaHistory className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Histórico Completo</h3>
            <p className="text-gray-600">
              Mantenha registros organizados de todos os eventos realizados na plataforma.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}