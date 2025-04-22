import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { FaTrophy, FaSync } from "react-icons/fa";

import { Battle } from "@/app/api/backend/battlesApi";
import { TournamentStartup } from "@/app/api/backend/tournamentStartupsApi";
import { Startup } from "@/app/api/backend/startupsApi";
import { BattleEvent, getBattleEventsByBattleAndTournamentStartup} from "@/app/api/backend/battleEventsApi";
import { EventType, getEventTypes } from "@/app/api/backend/eventTypesApi";

type TournamentParticipantsListProps = {
  tournamentStartups: TournamentStartup[];
  startups: { [key: number]: Startup };
  battles: Battle[];
  lastBattleSaved?: number;
};

export default function TournamentParticipantsList({
  tournamentStartups,
  startups,
  battles,
  lastBattleSaved = 0,
}: TournamentParticipantsListProps) {
  const [battleEventsMap, setBattleEventsMap] = useState<{ [key: number]: BattleEvent[] }>({});
  const [eventTypesData, setEventTypesData] = useState<{ [key: number]: { name: string, scoreModifier: number } }>({});
  const [loadingEvents, setLoadingEvents] = useState<{ [key: number]: boolean }>({});
  const [openStartups, setOpenStartups] = useState<Set<number>>(new Set());
  const [lastUpdated, setLastUpdated] = useState<{ [key: number]: Date | null }>({});
  
  const lastProcessedBattleSaved = useRef(lastBattleSaved);
  
  const isProcessingRef = useRef<{ [key: number]: boolean }>({});

  const sortedStartups = useMemo(() => {
    return [...tournamentStartups].sort((a, b) => (b.currentScore || 0) - (a.currentScore || 0));
  }, [tournamentStartups]);

  const startupKeys = useMemo(() => {
    return sortedStartups.reduce((acc, startup) => {
      acc[startup.id!] = `startup-${startup.id}`;
      return acc;
    }, {} as Record<number, string>);
  }, [sortedStartups]);

  useEffect(() => {
    const loadEventTypes = async () => {
      try {
        const eventTypes = await getEventTypes();
        const eventTypesObj: { [key: number]: { name: string, scoreModifier: number } } = {};
        eventTypes.forEach((et: EventType) => {
          eventTypesObj[et.id!] = { 
            name: et.name, 
            scoreModifier: et.scoreModifier 
          };
        });
        setEventTypesData(eventTypesObj);
      } catch (error) {
        console.error("Erro ao carregar tipos de eventos:", error);
      }
    };
    
    loadEventTypes();
  }, []);

  const fetchBattleEvents = useCallback(async (startupId: number, force = false) => {
    if (isProcessingRef.current[startupId]) return;
    
    if ((battleEventsMap[startupId] && !force) || loadingEvents[startupId]) return;
    
    isProcessingRef.current[startupId] = true;
    setLoadingEvents(prev => ({ ...prev, [startupId]: true }));
    
    try {
      const startupBattles = battles.filter(
        b => b.startup1 === startupId || b.startup2 === startupId
      );
      
      const allEvents: BattleEvent[] = [];
      
      await Promise.all(
        startupBattles.map(async (battle) => {
          try {
            const battleEvents = await getBattleEventsByBattleAndTournamentStartup(
              battle.id!, 
              startupId
            );
            allEvents.push(...battleEvents);
          } catch (err) {
            console.error(`Erro ao buscar eventos para batalha ${battle.id}:`, err);
          }
        })
      );
      
      setBattleEventsMap(prev => ({ ...prev, [startupId]: allEvents }));
      setLastUpdated(prev => ({ ...prev, [startupId]: new Date() }));
    } catch (error) {
      console.error(`Erro ao buscar eventos para startup ${startupId}:`, error);
    } finally {
      setLoadingEvents(prev => ({ ...prev, [startupId]: false }));
      isProcessingRef.current[startupId] = false;
    }
  }, [battles, battleEventsMap, loadingEvents]);

  useEffect(() => {
    if (lastBattleSaved > 0 && lastBattleSaved !== lastProcessedBattleSaved.current) {
      lastProcessedBattleSaved.current = lastBattleSaved;
      
      const timer = setTimeout(() => {
        openStartups.forEach((startupId) => {
          fetchBattleEvents(startupId, true);
        });
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [lastBattleSaved, fetchBattleEvents, openStartups]);

  const refreshStartupData = useCallback((startupId: number) => {
    fetchBattleEvents(startupId, true);
  }, [fetchBattleEvents]);

  const BattleEventsList = useCallback(({ startupId }: { startupId: number }) => {
    const events = battleEventsMap[startupId] || [];
    const isLoading = loadingEvents[startupId];
    
    const sharkFightBattles = battles.filter(
      b => (b.startup1 === startupId || b.startup2 === startupId) && b.sharkFight
    );
    
    if (isLoading) {
      return <p className="text-sm text-gray-500">Carregando eventos de batalha...</p>;
    }
    
    return (
      <div className="space-y-4">
        {sharkFightBattles.length > 0 && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-100 rounded-md">
            <h5 className="text-sm font-medium text-amber-700 mb-2 flex items-center">
              <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z" />
              </svg>
              Shark Fights
            </h5>
            <ul className="space-y-1.5">
                {sharkFightBattles.map((battle) => {
                const isWinner = battle.winner === startupId;

                return (
                  <li key={`shark-${battle.id}`} className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <span className="text-amber-600 text-xs rounded-full px-1.5 py-0.5 mr-2 bg-amber-100 border border-amber-200">
                        #{battle.battleNumber || 'N/A'}
                      </span>
                      <span>Shark Fight na Batalha</span>
                    </div>
                    <span className={`font-medium ${isWinner ? 'text-green-600' : 'text-red-600'}`}>
                      {isWinner ? 'Vitória' : 'Derrota'}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        
        {events.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhum evento de batalha registrado para esta startup.</p>
        ) : (
          <>
            <h5 className="text-sm font-medium text-gray-600">Ocorrências por tipo:</h5>
            <ul className="space-y-2">
              {Object.entries(events.reduce((acc, event) => {
                if (!acc[event.eventType!]) {
                  acc[event.eventType!] = 0;
                }
                acc[event.eventType!]++;
                return acc;
              }, {} as { [key: number]: number }))
                .map(([eventTypeId, count]) => {
                  const eventType = eventTypesData[parseInt(eventTypeId)];
                  return {
                    id: parseInt(eventTypeId),
                    name: eventType?.name || "Desconhecido",
                    modifier: eventType?.scoreModifier || 0,
                    count
                  };
                })
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((eventType) => {
                  const isPositive = eventType.modifier > 0;
                  
                  return (
                    <li key={eventType.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          isPositive ? 'bg-green-500' : 'bg-red-500'
                        }`}></span>
                        <span className="text-sm">{eventType.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{eventType.count}x</span>
                        <span className={`ml-2 text-xs ${
                          isPositive ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {isPositive ? '+' : ''}{eventType.modifier} pts/evento
                        </span>
                      </div>
                    </li>
                  );
                })}
            </ul>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex justify-between text-sm font-medium">
                <span>Total de eventos:</span>
                <span>{events.length}</span>
              </div>
              <div className="flex justify-between text-sm font-medium mt-1">
                <span>Pontuação acumulada:</span>
                <span className="font-bold">
                  {events.reduce((total, event) => {
                    const mod = eventTypesData[event.eventType!]?.scoreModifier || 0;
                    return total + mod;
                  }, 0)} pts
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }, [battleEventsMap, loadingEvents, eventTypesData, battles, startups]);

  const StartupDetails = useCallback(({ ts }: { ts: TournamentStartup }) => {
    const startup = typeof ts.startup === "number" ? startups[ts.startup] : undefined;
    if (!startup) return null;
    
    const isOpen = openStartups.has(ts.id!);
    
    const handleToggle = (e: React.MouseEvent) => {
      e.preventDefault();
      
      setOpenStartups(prev => {
        const newSet = new Set(prev);
        if (isOpen) {
          newSet.delete(ts.id!);
        } else {
          newSet.add(ts.id!);
          if (!battleEventsMap[ts.id!]) {
            fetchBattleEvents(ts.id!);
          }
        }
        return newSet;
      });
    };
    
    return (
      <div className="group border-b border-gray-200 last:border-b-0">
        <div 
          onClick={handleToggle}
          className={`flex items-center justify-between p-4 cursor-pointer ${
            ts.eliminated ? "bg-gray-50" : "bg-white"
          }`}
        >
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full ${
              ts.eliminated ? "bg-gray-100" : "bg-blue-100"
            } flex items-center justify-center mr-3`}>
              <span className={`${
                ts.eliminated ? "text-gray-500" : "text-blue-700"
              } font-bold`}>
                {startup.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className={`font-medium ${ts.eliminated ? "text-gray-500" : ""}`}>
                {startup.name}
              </h3>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-600 mr-3">
                  Pontuação: <strong>{ts.currentScore || 0}</strong>
                </span>
                {ts.eliminated ? (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                    Eliminada
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                    Ativa
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <svg className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {isOpen && (
          <div className="p-4 pt-2 pl-16 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-sm text-gray-700">Eventos de Batalha</h4>
              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  refreshStartupData(ts.id!);
                }}
                className="text-blue-500 hover:text-blue-700 flex items-center text-xs"
                disabled={loadingEvents[ts.id!]}
              >
                <FaSync className={`mr-1 ${loadingEvents[ts.id!] ? 'animate-spin' : ''}`} size={12} />
                Atualizar
              </button>
            </div>
            <BattleEventsList startupId={ts.id!} />
            
            {lastUpdated[ts.id!] && (
              <div className="text-xs text-gray-500 mt-2 text-right">
                Última atualização: {lastUpdated[ts.id!]?.toLocaleTimeString()}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }, [startups, startupKeys, BattleEventsList, fetchBattleEvents, loadingEvents, lastUpdated, refreshStartupData, openStartups, battleEventsMap]);

  return (
    <>
      <h2 className="text-lg font-medium mb-4 flex items-center">
        <FaTrophy className="mr-2" /> Participantes do Torneio
      </h2>

      <div className="border rounded-lg divide-y divide-gray-200">
        {sortedStartups.map((ts) => (
          <StartupDetails key={startupKeys[ts.id!]} ts={ts} />
        ))}
      </div>
    </>
  );
}