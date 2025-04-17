"use client";

import { useParams } from "next/navigation";
import NotFoundPage from "@/app/components/shared/NotFoundPage";
import { dummyBattles, dummyStartups, dummyTournaments, dummyTournamentStartups } from "@/app/constants/dummyData";

type Participant = {
  id: string;
  name: string;
  score: number | null;
};

type Battle = {
  id: string;
  title: string;
  date: string;
  status: "Em andamento" | "Concluída";
  tournament: string;
  tournamentId: string;
  participants: Participant[];
  winner: string | null;
  judges: string[];
  description: string;
};

export default function BattleDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const battle = dummyBattles.find((b) => b.id.toString() === id);

  if (!battle) {
    return (
      <NotFoundPage
        resourceType="batalha"
        resourceId={id}
        backPath="/dashboard/battles"
        backLabel="Voltar para Batalhas"
      />
    );
  }

  const tournament = dummyTournaments.find((t) => t.id === battle.tournament_id);
  const participants = [
    {
      id: battle.startup1_id.toString(),
      name: dummyStartups.find((s) => s.id === battle.startup1_id)?.name || "Desconhecido",
      score: battle.completed
        ? dummyTournamentStartups.find((ts) => ts.startup_id === battle.startup1_id)?.current_score ?? null
        : null,
    },
    {
      id: battle.startup2_id.toString(),
      name: dummyStartups.find((s) => s.id === battle.startup2_id)?.name || "Desconhecido",
      score: battle.completed
        ? dummyTournamentStartups.find((ts) => ts.startup_id === battle.startup2_id)?.current_score ?? null
        : null,
    },
  ];

  const battleDetails: Battle = {
    id: battle.id.toString(),
    title: `Batalha de Inovação ${battle.id}`,
    date: new Date(battle.created_at).toLocaleDateString("pt-BR"),
    status: battle.completed ? "Concluída" : "Em andamento",
    tournament: tournament?.name || "Torneio Desconhecido",
    tournamentId: tournament?.id.toString() || "",
    participants,
    winner: battle.winner_id
      ? dummyStartups.find((s) => s.id === battle.winner_id)?.name || "Desconhecido"
      : null,
    judges: ["Ana Silva", "Carlos Mendes", "Patrícia Ferreira"],
    description: "Uma batalha emocionante onde startups apresentam soluções para desafios do mercado financeiro.",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{battleDetails.title}</h2>
        <span
          className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
            battleDetails.status === "Concluída" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
          }`}
        >
          {battleDetails.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Informações Gerais</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Título</dt>
              <dd className="mt-1 text-sm text-gray-900">{battleDetails.title}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Data</dt>
              <dd className="mt-1 text-sm text-gray-900">{battleDetails.date}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Torneio</dt>
              <dd className="mt-1 text-sm text-blue-600 hover:underline">
                <a href={`/dashboard/tournaments/${battleDetails.tournamentId}`}>{battleDetails.tournament}</a>
              </dd>
            </div>
            {battleDetails.winner && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Vencedor</dt>
                <dd className="mt-1 text-sm font-medium text-green-600">{battleDetails.winner}</dd>
              </div>
            )}
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Participantes</h3>
          <div className="space-y-3">
            {battleDetails.participants.map((participant: Participant) => (
              <div key={participant.id} className="p-3 border rounded-md bg-gray-50">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">{participant.name}</p>
                  {battleDetails.status === "Concluída" && (
                    <p className="text-sm font-medium">Pontuação: {participant.score}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-medium mt-6 mb-2">Jurados</h3>
          <ul className="list-disc list-inside space-y-1">
            {battleDetails.judges.map((judge: string, index: number) => (
              <li key={index} className="text-sm text-gray-700">{judge}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Descrição</h3>
        <p className="text-gray-700">{battleDetails.description}</p>
      </div>
    </div>
  );
}