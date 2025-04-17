import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { dummyTournaments } from "@/app/constants/dummyData";

export default function ListTournaments() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Todos os Torneios</h2>
        <Link 
          href="/dashboard/tournaments/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <FaPlus size={12} />
          <span>Novo Torneio</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyTournaments.map((tournament) => (
          <div key={tournament.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className={`h-3 ${
              tournament.status === "Ativo" ? "bg-green-500" : 
              tournament.status === "Concluído" ? "bg-yellow-500" : 
              "bg-gray-500"
            }`}></div>
            <div className="p-5">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800">{tournament.name}</h3>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  tournament.status === "Ativo" ? "bg-green-100 text-green-800" : 
                  tournament.status === "Concluído" ? "bg-yellow-100 text-yellow-800" : 
                  "bg-gray-100 text-gray-800"
                }`}>
                  {tournament.status}
                </span>
              </div>
              
              <p className="text-gray-500 text-sm mt-2">
                {tournament.champion_id ? "Campeão definido" : "Sem campeão ainda"}
              </p>
              
              <div className="mt-4 flex items-center text-sm">
                <svg className="text-gray-400 mr-1" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"></line>
                  <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"></line>
                  <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"></line>
                </svg>
                <span className="text-gray-600">
                  {new Date(tournament.created_at).toLocaleDateString("pt-BR")}
                </span>
              </div>
              
              <div className="mt-4 border-t border-gray-100 pt-4 flex justify-between">
                <Link href={`/dashboard/tournaments/${tournament.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Ver detalhes
                </Link>
                {tournament.status === "Ativo" && (
                  <Link href={`/dashboard/tournaments/${tournament.id}/manage`} className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                    Gerenciar
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}