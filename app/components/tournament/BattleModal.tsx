import { useState, useEffect } from "react";
import { FaTrophy, FaCheckCircle } from "react-icons/fa";

import { Battle } from "@/app/api/backend/battlesApi";
import { Startup } from "@/app/api/backend/startupsApi";
import { TournamentStartup } from "@/app/api/backend/tournamentStartupsApi";
import { EventType, getEventTypes } from "@/app/api/backend/eventTypesApi";
import { BattleEvent } from "@/app/api/backend/battleEventsApi";

interface BattleModalProps {
  activeBattle: Battle;
  totalRounds: number;
  calculateRoundNumber: (matchNumber: number) => number;
  startupDetails: { [key: number]: Startup };
  tournamentStartups: TournamentStartup[];
  onClose: () => void;
  onSave: (startup1Events: BattleEvent[], startup2Events: BattleEvent[]) => void;
  savingBattle: boolean;
}

export default function BattleModal({
  activeBattle,
  totalRounds,
  calculateRoundNumber,
  startupDetails,
  tournamentStartups: initialTournamentStartups,
  onClose,
  onSave,
  savingBattle,
}: BattleModalProps) {

  const [startup1Events, setStartup1Events] = useState<number[]>([]);
  const [startup2Events, setStartup2Events] = useState<number[]>([]);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [localStartup1Score, setLocalStartup1Score] = useState<number>(0);
  const [localStartup2Score, setLocalStartup2Score] = useState<number>(0);
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const tournamentStartup1 = initialTournamentStartups.find(ts => ts.id === activeBattle.startup1);
        const tournamentStartup2 = initialTournamentStartups.find(ts => ts.id === activeBattle.startup2);
        
        setLocalStartup1Score(tournamentStartup1?.currentScore || 0);
        setLocalStartup2Score(tournamentStartup2?.currentScore || 0);
        
        const promises: Promise<unknown>[] = [];
        
        const eventTypesPromise = getEventTypes()
          .then(events => {
            if (isMounted) {
              setEventTypes(events);
            }
          })
          .catch(err => {
            console.error("Erro ao buscar tipos de eventos:", err);
          });
        
        promises.push(eventTypesPromise);
        
        await Promise.allSettled(promises);
        if (isMounted) setLoading(false);
        
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [activeBattle.tournament, activeBattle.startup1, activeBattle.startup2, initialTournamentStartups]);

  const findStartupById = (tournamentStartupId: number | null | undefined) => {
    if (!tournamentStartupId) return null;
    
    const tournamentStartup = initialTournamentStartups.find(
      ts => ts.id === tournamentStartupId
    );

    if (!tournamentStartup) {
      console.warn(`TournamentStartup com ID ${tournamentStartupId} não encontrado`);
      return null;
    }
    
    const startupId = tournamentStartup.startup;
    
    if (typeof startupId !== "number") {
      console.warn(`ID da startup no TournamentStartup ${tournamentStartupId} não é um número:`, startupId);
      return null;
    }
    
    const startup = startupDetails[startupId];
    
    if (!startup) {
      console.warn(`Startup com ID ${startupId} não encontrada no objeto startupDetails`);
      return null;
    }
    
    return startup;
  };

  const startup1 = findStartupById(activeBattle.startup1);
  const startup2 = findStartupById(activeBattle.startup2);
  
  const startup1Name = startup1?.name || "A definir";
  const startup2Name = startup2?.name || "A definir";

  const calculateEventScore = (selectedEvents: number[]): number => {
    return selectedEvents.reduce((total, eventId) => {
      const event = eventTypes.find(e => e.id === eventId);
      return total + (event?.scoreModifier || 0);
    }, 0);
  };

  const toggleEvent = (startupNumber: 1 | 2, eventId: number) => {
    if (startupNumber === 1) {
      setStartup1Events(prev => {
        const newEvents = prev.includes(eventId) 
          ? prev.filter(id => id !== eventId)
          : [...prev, eventId];
        
        return newEvents;
      });
    } else {
      setStartup2Events(prev => {
        const newEvents = prev.includes(eventId) 
          ? prev.filter(id => id !== eventId)
          : [...prev, eventId];
        
        return newEvents;
      });
    }
  };

  const handleSave = () => {
    const startup1EventObjects = startup1Events.map(eventTypeId => ({
      id: undefined,
      battle: activeBattle.id!,
      startup: activeBattle.startup1!,
      eventType: eventTypeId,
    }));

    const startup2EventObjects = startup2Events.map(eventTypeId => ({
      id: undefined,
      battle: activeBattle.id!,
      startup: activeBattle.startup2!,
      eventType: eventTypeId,
    }));

    onSave(startup1EventObjects, startup2EventObjects);
  };

  const renderEventCheckboxes = (startupNumber: 1 | 2) => {
    const selectedEvents = startupNumber === 1 ? startup1Events : startup2Events;
    const colorClass = startupNumber === 1 ? "blue" : "purple";
    const baseScore = startupNumber === 1 ? localStartup1Score : localStartup2Score;
    const eventScore = calculateEventScore(selectedEvents);
    const totalScore = baseScore + eventScore;
  
    return (
      <div className="space-y-2 mt-4">
        <div className="text-sm font-medium text-gray-700 mb-2">
          Eventos da batalha:
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-3">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-600"></div>
            <span className="ml-2 text-sm text-gray-500">Carregando eventos...</span>
          </div>
        ) : eventTypes && eventTypes.length > 0 ? (
          <>
            {eventTypes.map(event => (
              <label 
                key={`startup${startupNumber}-${event.id}`} 
                className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={event.id !== undefined && selectedEvents.includes(event.id)}
                  onChange={() => {
                    if (event.id !== undefined) {
                      toggleEvent(startupNumber, event.id);
                    }
                  }}
                  className={`form-checkbox h-4 w-4 ${
                    colorClass === "blue" 
                      ? "text-blue-600 border-blue-300 focus:ring-blue-500" 
                      : "text-purple-600 border-purple-300 focus:ring-purple-500"
                  }`}
                />
                <div className="ml-2 flex-1">
                  <span className="text-sm font-medium">
                    {event.name}
                  </span>
                  <span className={`ml-2 text-xs ${
                    event.scoreModifier >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {event.scoreModifier > 0 ? '+' : ''}{event.scoreModifier} pts
                  </span>
                </div>
              </label>
            ))}
            <div className="mt-3 py-2 border-t">
              <span className="text-sm font-medium">
                Pontuação atual: {baseScore} pts
              </span>
              
              {/* Exibição de sinal dinamicamente */}
              <span className={`text-sm font-medium ml-2 ${
                eventScore >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {eventScore >= 0 ? '+ ' : '- '}{Math.abs(eventScore)} pts
              </span>
              
              <span className={`text-sm font-medium ml-2 ${
                totalScore >= baseScore ? 'text-green-600' : 'text-red-600'
              }`}>
                = {totalScore} pts
              </span>
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-500 italic p-2">
            Nenhum tipo de evento disponível
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900/60 to-gray-900/60 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto p-4 md:py-10">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-5 w-full max-w-2xl border border-gray-200 animate-fadeIn my-auto">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white/95 backdrop-blur-sm z-10 pb-2 border-b">
          <h2 className="text-lg font-semibold flex items-center">
            <FaTrophy className="mr-2 text-blue-600" />
            Batalha de Startups
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors rounded-full p-2"
            aria-label="Fechar"
          >
            <span className="text-xl">&times;</span>
          </button>
        </div>

        <div className="max-h-[calc(100vh-12rem)] overflow-y-auto pr-1 pb-1">
          <div className="mb-4 bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-100">
            <div className="text-center mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {activeBattle.roundNumber === totalRounds
                  ? "🏆 Final"
                  : activeBattle.roundNumber === totalRounds - 1
                  ? "🥇 Semi-final"
                  : activeBattle.roundNumber === totalRounds - 2
                  ? "🏅 Quarta de Final"
                  : `Rodada ${activeBattle.roundNumber || calculateRoundNumber(activeBattle.battleNumber!)}`}
              </span>
              <div className="mt-1 text-xs text-gray-500">
                Batalha #{activeBattle.battleNumber}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-700 font-bold">{startup1Name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{startup1Name}</h3>
                    <p className="text-sm text-gray-600">Pontuação atual: {localStartup1Score} pts</p>
                  </div>
                </div>
                {renderEventCheckboxes(1)}
              </div>

              <div className="flex justify-center items-center">
                <div className="px-4 py-1 bg-gray-100 rounded-full text-gray-500 font-medium">VS</div>
              </div>

              <div className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <span className="text-purple-700 font-bold">{startup2Name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{startup2Name}</h3>
                    <p className="text-sm text-gray-600">Pontuação atual: {localStartup2Score} pts</p>
                  </div>
                </div>
                {renderEventCheckboxes(2)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-3 border-t mt-3 sticky bottom-0 bg-white/95 backdrop-blur-sm">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            disabled={savingBattle}
          >
            Cancelar
          </button>

          <button
            onClick={() => handleSave()}
            disabled={savingBattle}
            className={`px-4 py-2 rounded-md flex items-center transition-colors ${
              savingBattle
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {savingBattle ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Salvando...
              </>
            ) : (
              <>
                <FaCheckCircle className="mr-2" /> Finalizar Batalha
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}