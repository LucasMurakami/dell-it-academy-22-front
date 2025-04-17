import Link from "next/link";

export default function AdminBattles() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Administração de Batalhas</h2>
      
      <div className="flex mb-6 flex-wrap gap-4">
        <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
          Todas as batalhas
        </button>
        <button className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200">
          Batalhas pendentes
        </button>
        <button className="px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200">
          Batalhas concluídas
        </button>
        <button className="px-3 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200">
          Criar batalha
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Torneio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Startups
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data e Hora
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{i}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {i <= 3 ? "Inovação Tech 2025" : "Startup Summit"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {i <= 2 ? "InovaPay vs HealthSync" : i === 3 ? "EduNext vs AgroVision" : "FitLife vs DataFlow"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {i === 1 ? "18/04/2025 - 14:00" : 
                   i === 2 ? "19/04/2025 - 15:30" : 
                   i === 3 ? "20/04/2025 - 10:00" :
                   i === 4 ? "15/04/2025 - 10:00" : 
                   "12/04/2025 - 16:30"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    i <= 3 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                  }`}>
                    {i <= 3 ? "Pendente" : "Concluída"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <Link href={`/dashboard/battles/${i}/edit`} className="text-blue-600 hover:text-blue-900">
                      Editar
                    </Link>
                    <Link href={`/dashboard/battles/${i}/manage`} className="text-purple-600 hover:text-purple-900">
                      Gerenciar
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}