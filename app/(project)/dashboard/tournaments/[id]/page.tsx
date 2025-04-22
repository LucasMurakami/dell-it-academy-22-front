"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import NotFoundPage from "@/app/components/shared/NotFoundPage";

import { getTournamentById, Tournament } from "@/app/api/backend/tournamentsApi";
import { getTournamentStartupsByTournament } from "@/app/api/backend/tournamentStartupsApi";
import { Battle, getBattlesByTournament } from "@/app/api/backend/battlesApi";

export default function TournamentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [participants, setParticipants] = useState<number>(0);
  const [totalBattles, setTotalBattles] = useState<number>(0);
  const [battlesCompleted, setBattlesCompleted] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        const tournamentData = await getTournamentById(Number(id));
        if (!tournamentData) {
          setError("Torneio não encontrado.");
          setLoading(false);
          return;
        }
        setTournament(tournamentData);

        const tournamentId = Number(tournamentData.id);

        const startups = await getTournamentStartupsByTournament(tournamentId);
        const participantsCount = startups.length;
        setParticipants(participantsCount); 

        const expectedTotalBattles = participantsCount > 0 ? participantsCount - 1 : 0;

        const battles = await getBattlesByTournament(Number(id));
        const completedBattles = battles.filter((b: Battle) => b.completed).length;

        setTotalBattles(expectedTotalBattles);
        setBattlesCompleted(completedBattles);
      } catch (err) {
        console.error("Erro ao carregar os detalhes do torneio:", err);
        setError("Erro ao carregar os detalhes do torneio. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentDetails();
  }, [id]);

  if (loading) {
    return <p>Carregando detalhes do torneio...</p>;
  }

  if (error) {
    return (
      <NotFoundPage
        resourceType="torneio"
        resourceId={id}
        backPath="/dashboard/tournaments"
        backLabel="Voltar para Torneios"
      />
    );
  }

  const progress = totalBattles > 0 ? Math.round((battlesCompleted / totalBattles) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
      >
        Voltar
      </button>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Detalhes do Torneio {tournament?.name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Informações Gerais</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Nome do Torneio</dt>
              <dd className="mt-1 text-sm text-gray-900">{tournament?.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Data de Criação</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(tournament?.createdAt ?? "").toLocaleDateString("pt-BR", {
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
                    tournament?.status === "Ativo"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {tournament?.status}
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