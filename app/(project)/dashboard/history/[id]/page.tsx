"use client";

import { useParams } from "next/navigation";
import NotFoundPage from "@/app/components/shared/NotFoundPage";
import { dummyBattles, dummyTournaments, dummyStartups } from "@/app/constants/dummyData";

export default function HistoryDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const dummyHistory = dummyBattles.map((battle) => {
    const tournament = dummyTournaments.find((t) => t.id === battle.tournament_id);
    const winner = dummyStartups.find((s) => s.id === battle.winner_id);

    return {
      id: battle.id.toString(),
      title: `Histórico da Batalha ${battle.id}`,
      date: new Date(battle.created_at).toLocaleDateString("pt-BR"),
      type: "Batalha",
      relatedId: battle.id.toString(),
      relatedName: tournament?.name || "Torneio Desconhecido",
      placement: winner ? `Vencedor: ${winner.name}` : "Sem vencedor",
      participants: [
        dummyStartups.find((s) => s.id === battle.startup1_id)?.name || "Desconhecido",
        dummyStartups.find((s) => s.id === battle.startup2_id)?.name || "Desconhecido",
      ],
      notes: "Uma batalha emocionante entre startups.",
      feedback: "Ótima execução e criatividade.",
    };
  });

  const record = dummyHistory.find((h) => h.id === id);

  if (!record) {
    return (
      <NotFoundPage
        resourceType="registro histórico"
        resourceId={id}
        backPath="/dashboard/history"
        backLabel="Voltar para Histórico"
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {record.title}
        </h2>
        <span
          className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
            record.type === "Torneio"
              ? "bg-purple-100 text-purple-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {record.type}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Informações do Evento</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Data</dt>
              <dd className="mt-1 text-sm text-gray-900">{record.date}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">{record.type}</dt>
              <dd className="mt-1 text-sm text-blue-600 hover:underline">
                <a href={`/dashboard/battles/${record.relatedId}`}>
                  {record.relatedName}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Colocação</dt>
              <dd className="mt-1 text-sm font-medium text-amber-600">{record.placement}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Participantes</h3>
          <ul className="list-disc list-inside space-y-1">
            {record.participants.map((participant: string, index: number) => (
              <li key={index} className="text-sm text-gray-700">{participant}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Notas</h3>
          <p className="text-gray-700">{record.notes}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Feedback</h3>
          <p className="text-gray-700">{record.feedback}</p>
        </div>
      </div>
    </div>
  );
}