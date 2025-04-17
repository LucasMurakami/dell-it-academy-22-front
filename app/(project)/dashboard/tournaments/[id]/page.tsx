"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import NotFoundPage from "@/app/components/shared/NotFoundPage";
import { dummyTournaments, dummyTournamentStartups, dummyBattles } from "@/app/constants/dummyData";

export default function TournamentDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tournament, setTournament] = useState(() =>
    dummyTournaments.find((t) => t.id.toString() === id) || null
  );

  if (!tournament) {
    return (
      <NotFoundPage
        resourceType="torneio"
        resourceId={id}
        backPath="/dashboard/tournaments"
        backLabel="Voltar para Torneios"
      />
    );
  }

  const participants = dummyTournamentStartups.filter((ts) => ts.tournament_id === tournament.id).length;
  const totalBattles = Math.ceil(participants / 2);
  const battlesCompleted = dummyBattles.filter((b) => b.tournament_id === tournament.id && b.completed).length;

  const progress = totalBattles > 0 ? Math.round((battlesCompleted / totalBattles) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Detalhes do Torneio {tournament.name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Informações Gerais</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Nome do Torneio</dt>
              <dd className="mt-1 text-sm text-gray-900">{tournament.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Data de Criação</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(tournament.created_at).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    tournament.status === "Ativo"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {tournament.status}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Estatísticas</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Total de Participantes</dt>
              <dd className="mt-1 text-sm text-gray-900">{participants}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Batalhas Realizadas</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {battlesCompleted} de {totalBattles}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Progresso</dt>
              <dd className="mt-1">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{progress}% concluído</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}