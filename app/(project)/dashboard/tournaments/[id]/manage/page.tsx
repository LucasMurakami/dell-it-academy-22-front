"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaTrophy, FaPlay, FaEye } from "react-icons/fa";

import AlertModal from "@/app/components/shared/AlertModal";
import BattleModal from "@/app/components/tournament/BattleModal";
import Loading from "@/app/components/shared/Loading";
import TournamentBracket from '@/app/components/tournament/TournamentBracket';
import TournamentParticipantsList from "@/app/components/tournament/TournamentParticipantsList";
import TournamentWinner from '@/app/components/tournament/TournamentWinner';

import { getEventTypes } from "@/app/api/backend/eventTypesApi";
import { getTournamentById, Tournament } from "@/app/api/backend/tournamentsApi";
import { Battle, getBattlesByTournament, updateBattle } from "@/app/api/backend/battlesApi";
import { getTournamentStartupsByTournament, TournamentStartup } from "@/app/api/backend/tournamentStartupsApi";
import { BattleEvent, createBattleEvent } from "@/app/api/backend/battleEventsApi";
import { getStartupById, Startup } from "@/app/api/backend/startupsApi";

export default function ManageTournamentPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [battles, setBattles] = useState<Battle[]>([]);
  const [tournamentStartups, setTournamentStartups] = useState<TournamentStartup[]>([]);
  const [startups, setStartups] = useState<{ [key: number]: Startup }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeBattle, setActiveBattle] = useState<Battle | null>(null);
  const [savingBattle, setSavingBattle] = useState(false);
  const [totalRounds, setTotalRounds] = useState(0);
  const [totalExpectedBattles, setTotalExpectedBattles] = useState(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [lastBattleSaved, setLastBattleSaved] = useState<number>(0);

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        setLoading(true);

        const tournamentData = await getTournamentById(Number(id));
        if (!tournamentData) {
          setError("Torneio não encontrado");
          return;
        }
        setTournament(tournamentData);

        const startupData = await getTournamentStartupsByTournament(Number(id));
        setTournamentStartups(startupData);

        const participantsCount = startupData.length;
        const rounds = tournamentData.rounds || Math.ceil(Math.log2(participantsCount));
        setTotalRounds(rounds);

        const expectedTotalBattles = participantsCount > 0 ? participantsCount - 1 : 0;
        setTotalExpectedBattles(expectedTotalBattles);

        const battleData = await getBattlesByTournament(Number(id));
        setBattles(battleData);

        const startups: { [key: number]: Startup } = {};
        for (const ts of startupData) {
          if (ts.startup) {
            try {
              const startupInfo = await getStartupById(ts.startup);
              if (startupInfo) {
                startups[ts.startup] = startupInfo;
              }
            } catch (err) {
              console.error(`Erro ao buscar detalhes da startup ${ts.startup}:`, err);
            }
          }
        }
        setStartups(startups);
      } catch (err) {
        console.error("Erro ao carregar dados do torneio:", err);
        setError("Erro ao carregar os dados do torneio. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentData();
  }, [id]);  

  const canBattleBeExecuted = (battle: Battle) => {
    if (battle.completed) return false;

    if (battle.battleNumber! > 1 && (!battle.startup1 || !battle.startup2)) return false;

    const battleRound = calculateRoundNumber(battle.battleNumber!);
    
    if (battleRound === 1) return true;
    
    const previousRound = battleRound - 1;
    
    const previousRoundBattles = battles.filter(b => {
      const round = calculateRoundNumber(b.battleNumber!);
      return round === previousRound;
    });
    
    const allPreviousRoundBattlesCompleted = previousRoundBattles.every(b => b.completed);
    
    if (!allPreviousRoundBattlesCompleted) return false;
    
    return true;
  };

  const calculateRoundNumber = (battleNumber: number): number => {
    const participants = tournamentStartups.length;
    
    let matchesInPreviousRounds = 0;
    let currentRound = 1;
    
    while (currentRound <= totalRounds) {
      const matchesInThisRound = Math.floor(participants / Math.pow(2, currentRound));
      if (battleNumber <= matchesInPreviousRounds + matchesInThisRound) {
        return currentRound;
      }
      matchesInPreviousRounds += matchesInThisRound;
      currentRound++;
    }
    
    return totalRounds;
  };

  const battlesWithRounds = battles.map((battle) => {
    const calculatedRound = calculateRoundNumber(battle.battleNumber!);
    return {
      ...battle,
      roundNumber: calculatedRound,
    };
  });

  const handleBattleSelect = (battle: Battle) => {
    if (!canBattleBeExecuted(battle)) return;
    setActiveBattle(battle);
  };

const handleBattleSave = useCallback(async (
  startup1EventObjects: BattleEvent[],
  startup2EventObjects: BattleEvent[]
) => {
  if (!activeBattle) return;

  setSavingBattle(true);

  try {
    const eventTypes = await getEventTypes();

    const calculateNewScore = (events: BattleEvent[], currentScore: number) => {
      return events.reduce((total, event) => {
        const eventType = eventTypes.find((et: { id: number; scoreModifier: number }) => et.id === event.eventType);
        if (!eventType) return total;
        return total + eventType.scoreModifier;
      }, currentScore);
    };

    const tournamentStartup1 = tournamentStartups.find(ts => ts.id === activeBattle.startup1);
    const tournamentStartup2 = tournamentStartups.find(ts => ts.id === activeBattle.startup2);

    if (!tournamentStartup1 || !tournamentStartup2) {
      throw new Error("TournamentStartups não encontradas");
    }

    const startup1NewScore = calculateNewScore(startup1EventObjects, tournamentStartup1.currentScore || 0);
    const startup2NewScore = calculateNewScore(startup2EventObjects, tournamentStartup2.currentScore || 0);

    let winnerTournamentStartupId = null;
    let isSharkFight = false;

    if (startup1NewScore > startup2NewScore) {
      winnerTournamentStartupId = tournamentStartup1.id;
    } else if (startup2NewScore > startup1NewScore) {
      winnerTournamentStartupId = tournamentStartup2.id;
    } else {
      isSharkFight = true;
    }

    const allEvents = [...startup1EventObjects, ...startup2EventObjects];
    for (const event of allEvents) {
      await createBattleEvent({
        battle: activeBattle.id!,
        startup: event.startup!,
        eventType: event.eventType!,
      });
    }

    await updateBattle(activeBattle.id!, {
      ...activeBattle,
      completed: true,
      winner: winnerTournamentStartupId,
      sharkFight: isSharkFight
    });

    const refreshedStartups = await getTournamentStartupsByTournament(Number(id));
    setTournamentStartups(refreshedStartups);

    const refreshBattles = await getBattlesByTournament(Number(id));
    setBattles(refreshBattles);

    setLastBattleSaved(prev => prev + 1);
    
    if (isSharkFight) {
      const startup1 = startups[tournamentStartup1.startup as number];
      const startup2 = startups[tournamentStartup2.startup as number];
      
      const sharkFightMessage = `SHARK FIGHT! Houve um empate entre ${startup1.name} e ${startup2.name}. 
      Ambas as startups obtiveram a mesma pontuação (${startup1NewScore} pontos). 
      Um Shark Fight será necessário para determinar o vencedor!`;
      
      setAlertMessage(sharkFightMessage);
      setIsAlertOpen(true);
    }
    
    setActiveBattle(null);
  } catch (err) {
    console.error("Erro ao salvar resultado da batalha:", err);
    setAlertMessage("Não foi possível salvar o resultado. Tente novamente.");
    setIsAlertOpen(true);
  } finally {
    setSavingBattle(false);
  }
}, [activeBattle, id, tournamentStartups, startups]);

  const getPendingBattles = () => {
    return battles.filter((b) => !b.completed && canBattleBeExecuted(b));
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
    setAlertMessage(null);
  };

  const isTournamentCompleted = useMemo(() => {
    return (
      tournament?.status === "COMPLETED" || 
      (battles.length === totalExpectedBattles && battles.every(b => b.completed))
    );
  }, [tournament, battles, totalExpectedBattles]);

  if (loading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!tournament || battles.length === 0 || tournamentStartups.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Nenhum dado encontrado para este torneio.</p>
      </div>
    );
  }

  const pendingBattles = getPendingBattles();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Voltar
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mt-4 flex items-center">
          <FaTrophy className="mr-2" /> Gerenciar Torneio: {tournament?.name}
        </h1>

        <TournamentWinner
          battles={battlesWithRounds}
          tournamentStartups={tournamentStartups}
          startups={startups}
          totalRounds={totalRounds}
          tournamentCompleted={isTournamentCompleted}
        />

        <div className="mt-2 flex flex-wrap items-center gap-4">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              tournament.status === "IN_PROGRESS"
                ? "bg-blue-100 text-blue-800"
                : tournament.status === "COMPLETED"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {tournament.status === "IN_PROGRESS"
              ? "Em andamento"
              : tournament.status === "COMPLETED"
              ? "Concluído"
              : "Rascunho"}
          </span>

          <span className="text-sm text-gray-600">
            {battles.filter((b) => b.completed).length} de {totalExpectedBattles} batalhas concluídas
          </span>
        </div>
      </div>

      {pendingBattles.length > 0 && (
        <div className="mb-8 bg-blue-50 rounded-lg p-4">
          <h2 className="text-lg font-medium mb-3 flex items-center">
            <FaPlay className="mr-2 text-blue-600" />
            Batalhas Pendentes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingBattles.map((battle) => {
              const tournamentStartup1 = tournamentStartups.find(ts => ts.id === battle.startup1);
              const tournamentStartup2 = tournamentStartups.find(ts => ts.id === battle.startup2);
              
              const startup1 = tournamentStartup1 && typeof tournamentStartup1.startup === "number" 
                ? startups[tournamentStartup1.startup] 
                : undefined;
              const startup2 = tournamentStartup2 && typeof tournamentStartup2.startup === "number"
                ? startups[tournamentStartup2.startup]
                : undefined;
              
              const startup1Name = startup1?.name || "A definir";
              const startup2Name = startup2?.name || "A definir";
            
              const roundNumber = calculateRoundNumber(battle.battleNumber!);

              const roundLabel =
                roundNumber === totalRounds
                  ? "Final"
                  : roundNumber === totalRounds - 1
                  ? "Semi-finais"
                  : roundNumber === totalRounds - 2
                  ? "Quartas de final"
                  : `Rodada ${roundNumber}`;

              return (
                <div
                  key={battle.id}
                  className="border border-blue-200 rounded-lg p-4 bg-white hover:border-blue-400 transition-colors"
                  onClick={() => handleBattleSelect(battle)}
                >
                  <div className="text-xs text-blue-600 font-medium mb-2">{roundLabel} - Batalha #{battle.battleNumber}</div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-blue-700">{startup1Name.charAt(0)}</span>
                    </div>
                    <span className="mx-2 flex-1 truncate">{startup1Name}</span>
                    <span className="text-gray-400 mx-3">VS</span>
                    <span className="mx-2 flex-1 truncate text-right">{startup2Name}</span>
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-purple-700">{startup2Name.charAt(0)}</span>
                    </div>
                  </div>

                  <div className="mt-3 text-center">
                    <button className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
                      <FaPlay className="mr-1" /> Iniciar Batalha
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {pendingBattles.length === 0 && (
            <p className="text-gray-500 text-center py-4">Não há batalhas pendentes no momento.</p>
          )}
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4 flex items-center">
          <FaEye className="mr-2 text-blue-600" /> Visão do Torneio
        </h2>

        <TournamentBracket 
          totalRounds={totalRounds}
          battlesWithRounds={battlesWithRounds}          
          startupDetails={startups}
          canBattleBeExecuted={canBattleBeExecuted}
          handleBattleSelect={handleBattleSelect}
          tournamentStartups={tournamentStartups}
        />
      </div>

      <div className="mb-8">
        <TournamentParticipantsList 
          tournamentStartups={tournamentStartups}
          startups={startups}
          battles={battles}
          lastBattleSaved={lastBattleSaved}
        />
      </div>

      {activeBattle && (
        <BattleModal 
          activeBattle={activeBattle}
          totalRounds={totalRounds}
          calculateRoundNumber={calculateRoundNumber}
          startupDetails={startups}
          tournamentStartups={tournamentStartups}
          onClose={() => setActiveBattle(null)}
          onSave={handleBattleSave}
          savingBattle={savingBattle}
        />
      )}
      
      <AlertModal
        message={alertMessage || ""}
        onClose={closeAlert}
        isOpen={isAlertOpen}
      />
    </div>
  );
}
