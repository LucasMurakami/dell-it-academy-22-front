"use client";

import Link from "next/link";
import { dummyBattles, dummyTournaments, dummyTournamentStartups, dummyStartups } from "@/app/constants/dummyData";

export default function BattleHistory() {
  const historyItems = dummyBattles.map((battle) => {
    const tournament = dummyTournaments.find((t) => t.id === battle.tournament_id);

    const startup1Data = dummyTournamentStartups.find((ts) => ts.startup_id === battle.startup1_id);
    const startup1 = dummyStartups.find((s) => s.id === battle.startup1_id);

    const startup2Data = dummyTournamentStartups.find((ts) => ts.startup_id === battle.startup2_id);
    const startup2 = dummyStartups.find((s) => s.id === battle.startup2_id);

    return {
      id: battle.id,
      date: new Date(battle.created_at).toLocaleDateString("pt-BR"),
      tournament: tournament?.name || "Torneio Desconhecido",
      battleStage: battle.round_number ? `Rodada ${battle.round_number}` : "Eliminatórias",
      startup1: {
        name: startup1?.name || "Desconhecido",
        score: battle.completed ? startup1Data?.current_score || 0 : null,
      },
      startup2: {
        name: startup2?.name || "Desconhecido",
        score: battle.completed ? startup2Data?.current_score || 0 : null,
      },
      result: battle.completed
        ? battle.winner_id === battle.startup1_id
          ? "Vitória"
          : "Derrota"
        : "Em andamento",
    };
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Histórico de Batalhas</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Torneio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Batalha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Startup A
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Startup B
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resultado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Detalhes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {historyItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tournament}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.battleStage}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">{item.startup1.name}</div>
                    {item.startup1.score !== null && (
                      <div className="text-xs text-gray-500 ml-2">Pontos: {item.startup1.score}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">{item.startup2.name}</div>
                    {item.startup2.score !== null && (
                      <div className="text-xs text-gray-500 ml-2">Pontos: {item.startup2.score}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      item.result === "Vitória"
                        ? "bg-green-100 text-green-800"
                        : item.result === "Derrota"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.result}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/dashboard/history/battles/${item.id}`} className="text-blue-600 hover:text-blue-900">
                    Ver detalhes
                  </Link>
                </td>
              </tr>
            ))}
            {historyItems.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  Nenhum registro de batalha encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}