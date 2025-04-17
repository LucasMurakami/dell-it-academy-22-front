import { FaCalendarAlt } from "react-icons/fa";

export default function EventHistory() {
  return (
    <section className="w-full py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-3">Histórico de Eventos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Acesse e visualize os resultados de todos os torneios já realizados
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center gap-3 mb-4">
              <FaCalendarAlt className="text-blue-600" />
              <span className="text-sm text-gray-500">12/01/2025</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Pitch Battle SP</h3>
            <p className="text-gray-600 mb-4">16 startups competiram pelo prêmio de melhor solução em educação.</p>
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <span className="font-medium">Vencedor: EduNext</span>
              <a href="#" className="text-blue-600 hover:text-blue-800">Ver detalhes</a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center gap-3 mb-4">
              <FaCalendarAlt className="text-blue-600" />
              <span className="text-sm text-gray-500">05/02/2025</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">HealthTech Summit</h3>
            <p className="text-gray-600 mb-4">8 startups da área de saúde apresentaram soluções inovadoras.</p>
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <span className="font-medium">Vencedor: HealthSync</span>
              <a href="#" className="text-blue-600 hover:text-blue-800">Ver detalhes</a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center gap-3 mb-4">
              <FaCalendarAlt className="text-blue-600" />
              <span className="text-sm text-gray-500">18/03/2025</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fintech Challenge</h3>
            <p className="text-gray-600 mb-4">12 startups financeiras disputaram o prêmio de inovação bancária.</p>
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <span className="font-medium">Vencedor: InovaPay</span>
              <a href="#" className="text-blue-600 hover:text-blue-800">Ver detalhes</a>
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <a href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
            Ver histórico completo de eventos
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}