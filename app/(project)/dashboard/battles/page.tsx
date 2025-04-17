import Link from "next/link";
import { dummyBattles, dummyTournaments } from "@/app/constants/dummyData";

export default function ListBattles() {
  const pendingBattles = dummyBattles.filter((battle) => !battle.completed);
  const recentBattles = dummyBattles.filter((battle) => battle.completed);

  const getTournamentName = (tournamentId: number) => {
    const tournament = dummyTournaments.find((t) => t.id === tournamentId);
    return tournament?.name || "Torneio Desconhecido";
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Minhas Batalhas</h2>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Batalhas Pendentes</h3>
          <div className="space-y-4">
            {pendingBattles.map((battle) => (
              <div
                key={battle.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">Batalha #{battle.id}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Torneio: {getTournamentName(battle.tournament_id)}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                    Pendente
                  </span>
                </div>
                <div className="mt-3 flex items-center text-sm text-gray-500">
                  <svg
                    className="mr-1 w-4 h-4"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    stroke="currentColor"
                    fill="none"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"></line>
                    <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"></line>
                    <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"></line>
                  </svg>
                  {new Date(battle.created_at).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="mt-4 border-t border-gray-100 pt-4 flex justify-between items-center">
                  <div className="flex space-x-3">
                    <span className="text-sm text-gray-500">Rodada: {battle.round_number || "N/A"}</span>
                  </div>
                  <Link
                    href={`/dashboard/battles/${battle.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Ver detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Batalhas Recentes</h3>
          <div className="space-y-4">
            {recentBattles.map((battle) => (
              <div
                key={battle.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">Batalha #{battle.id}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Torneio: {getTournamentName(battle.tournament_id)}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Concluída
                  </span>
                </div>
                <div className="mt-3 flex items-center text-sm text-gray-500">
                  <svg
                    className="mr-1 w-4 h-4"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    stroke="currentColor"
                    fill="none"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"></line>
                    <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"></line>
                    <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"></line>
                  </svg>
                  {new Date(battle.created_at).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="mt-4 border-t border-gray-100 pt-4 flex justify-between items-center">
                  <div className="flex space-x-3 items-center">
                    <span className="text-sm text-gray-500">Rodada: {battle.round_number || "N/A"}</span>
                    <div className="ml-4 text-sm font-medium text-green-600">
                      Vencedor: Startup {battle.winner_id}
                    </div>
                  </div>
                  <Link
                    href={`/dashboard/battles/${battle.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Ver detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}