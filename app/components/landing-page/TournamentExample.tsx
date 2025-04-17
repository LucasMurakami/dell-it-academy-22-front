import { startups } from "@/app/constants/startups";

export default function TournamentExample() {
  const exampleStartups = startups.slice(0, 4);
  
  return (
    <section className="w-full py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-3">Exemplo de Torneio</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visualize como seria um torneio organizado em nossa plataforma
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Torneio de Inovação 2025</h3>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Em andamento</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">Participantes</h4>
              <div className="space-y-2">
                {exampleStartups.map((startup) => (
                  <div key={startup.name} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-blue-700 text-xs">{startup.name.charAt(0)}</span>
                      </div>
                      <span>{startup.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{startup.year}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">Próximas Rodadas</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span>Semifinal 1</span>
                  <span className="text-sm text-blue-700">18/04/2025 - 14:00</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span>Semifinal 2</span>
                  <span className="text-sm text-blue-700">18/04/2025 - 16:00</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                  <span>Final</span>
                  <span className="text-sm text-yellow-700">19/04/2025 - 10:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}