import Link from "next/link";
import { dummyTournaments } from "@/app/constants/dummyData";

export default function TournamentHistory() {
  const tournamentsByYear = dummyTournaments.reduce((acc, tournament) => {
    const year = new Date(tournament.created_at).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(tournament);
    return acc;
  }, {} as Record<number, typeof dummyTournaments>);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Histórico de Torneios</h2>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Todos
          </button>
          <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
            Participei
          </button>
          <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
            Organizei
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Filtrar por:</span>
          <select className="border border-gray-300 rounded-md p-1 text-sm">
            <option>Todos os anos</option>
            {Object.keys(tournamentsByYear)
              .sort((a, b) => Number(b) - Number(a))
              .map((year) => (
                <option key={year}>{year}</option>
              ))}
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {Object.keys(tournamentsByYear)
          .sort((a, b) => Number(b) - Number(a))
          .map((year) => (
            <div key={year}>
              <h3 className="text-lg font-medium text-gray-800 mb-4">{year}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tournamentsByYear[Number(year)].map((tournament) => (
                  <div
                    key={tournament.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div
                      className={`h-2 ${
                        tournament.status === "Concluído"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                    ></div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-800">{tournament.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Criado em:{" "}
                        {new Date(tournament.created_at).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <div className="flex items-center mt-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            tournament.status === "Concluído"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {tournament.status}
                        </span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-xs text-gray-500">
                          {tournament.champion_id
                            ? "Campeão definido"
                            : "Sem campeão"}
                        </span>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {tournament.status === "Concluído"
                            ? "Concluído"
                            : "Em andamento"}
                        </span>
                        <Link
                          href={`/dashboard/tournaments/${tournament.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Ver detalhes
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}