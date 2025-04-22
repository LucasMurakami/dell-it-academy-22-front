import React from 'react';
import { FaCheckCircle, FaTrophy, FaPlay, FaExclamationTriangle } from 'react-icons/fa';

import { Battle } from '@/app/api/backend/battlesApi';
import { Startup } from '@/app/api/backend/startupsApi';
import { TournamentStartup } from '@/app/api/backend/tournamentStartupsApi';

interface TournamentBracketProps {
  totalRounds: number;
  battlesWithRounds: Battle[];
  startupDetails: { [key: number]: Startup };
  canBattleBeExecuted: (battle: Battle) => boolean;
  handleBattleSelect: (battle: Battle) => void;
  tournamentStartups: TournamentStartup[];
}

interface BattleCardProps {
  battle: Battle;
  startup1Name: string;
  startup2Name: string;
  startup1Score: number; 
  startup2Score: number;
  isAvailable: boolean;
  isCompleted: boolean;
  statusClass: string;
  statusText: string;
  statusBadgeClass: string;
  onSelect: () => void;
  getStartupInitial: (name: string) => string;
}

const BattleCard: React.FC<BattleCardProps> = ({
  battle,
  startup1Name,
  startup2Name,
  startup1Score,
  startup2Score,
  isAvailable,
  isCompleted,
  statusClass,
  statusText,
  statusBadgeClass,
  onSelect,
  getStartupInitial
}) => {
  return (
    <div 
      className={`${statusClass} rounded-lg shadow-sm ${isAvailable ? 'cursor-pointer hover:shadow-md hover:transform hover:scale-[1.02] transition-all' : ''}`}
      onClick={() => isAvailable && onSelect()}
    >
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b bg-gray-50 rounded-t-lg">
        <span className="text-xs font-medium bg-white rounded-full px-2.5 py-0.5 text-gray-500">
          Batalha #{battle.battleNumber || 'N/A'}
        </span>
        <span className={`text-xs font-medium ${statusBadgeClass} rounded-full px-2.5 py-0.5 flex items-center`}>
          {isCompleted && <FaCheckCircle className="mr-1" size={11} />}
          {statusText}
        </span>
      </div>
      
      <div className="p-3.5">
        <div className="flex flex-col space-y-3.5">
          <div className="flex flex-col space-y-2.5">
            <div className="flex items-center">
              <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center ${
                isCompleted && battle.winner === battle.startup1
                  ? "bg-green-200 text-green-800"
                  : isCompleted && battle.winner === battle.startup2
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}>
                <span className="font-bold text-sm">{getStartupInitial(startup1Name)}</span>
              </div>
              <div className="ml-2.5 flex-1 min-w-0">
                <div className={`text-sm font-medium truncate ${
                  isCompleted && battle.winner === battle.startup1
                    ? "text-green-600"
                    : isCompleted && battle.winner === battle.startup2
                    ? "text-red-600"
                    : ""
                }`}>
                  {startup1Name}
                </div>
                {isCompleted && (
                  <div className="text-xs text-gray-500">{startup1Score || 0} pts</div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <span className="text-xs text-gray-400 bg-gray-50 px-3 py-0.5 rounded-full">VS</span>
            </div>
            
            <div className="flex items-center">
              <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center ${
                isCompleted && battle.winner === battle.startup2
                  ? "bg-green-200 text-green-800"
                  : isCompleted && battle.winner === battle.startup1
                  ? "bg-red-100 text-red-800"
                  : "bg-purple-100 text-purple-800"
              }`}>
                <span className="font-bold text-sm">{getStartupInitial(startup2Name)}</span>
              </div>
              <div className="ml-2.5 flex-1 min-w-0">
                <div className={`text-sm font-medium truncate ${
                  isCompleted && battle.winner === battle.startup2
                    ? "text-green-600"
                    : isCompleted && battle.winner === battle.startup1
                    ? "text-red-600"
                    : ""
                }`}>
                  {startup2Name}
                </div>
                {isCompleted && (
                  <div className="text-xs text-gray-500">{startup2Score || 0} pts</div>
                )}
              </div>
            </div>
          </div>
          
          {!isCompleted ? (
            <div className="group relative">
              <button 
                className={`w-full text-xs rounded py-1.5 px-2.5 flex items-center justify-center ${
                  isAvailable 
                    ? "text-blue-600 bg-blue-50 border border-blue-200 hover:bg-blue-100 cursor-pointer" 
                    : "text-gray-500 bg-gray-50 border border-gray-200 cursor-not-allowed opacity-80"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isAvailable) onSelect();
                }}
                disabled={!isAvailable}
              >
                <FaPlay className="mr-1.5" size={9} /> Iniciar Batalha
              </button>
              
              {!isAvailable && (
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full left-0 w-full mb-2 z-10">
                  <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 text-center">
                    Conclua as batalhas anteriores para desbloquear esta batalha
                    <div className="absolute w-2.5 h-2.5 bg-gray-900 transform rotate-45 left-1/2 -ml-1.5 -bottom-1.5"></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full text-xs text-green-700 bg-green-50 border border-green-200 rounded py-1.5 px-2.5 flex items-center justify-center">
              <FaTrophy className="mr-1.5" size={11} />
              {battle.winner === battle.startup1 ? startup1Name : startup2Name}
              {battle.sharkFight && (
                <span className="ml-1.5 text-amber-600 bg-amber-50 rounded-full px-1.5 py-0.5 text-[10px] flex items-center">
                  <FaExclamationTriangle className="mr-1" size={10} />
                  shark fight
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TournamentBracket: React.FC<TournamentBracketProps> = ({
  totalRounds,
  battlesWithRounds,
  startupDetails,
  canBattleBeExecuted,
  handleBattleSelect,
  tournamentStartups,
}) => {

  const getStartupInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'A';
  };
  
  const findStartupById = (tournamentStartupId: number | null | undefined) => {
    if (!tournamentStartupId) {
      return { name: "A definir", score: 0, startup: undefined };
    }
    
    const tournamentStartup = tournamentStartups.find(ts => ts.id === tournamentStartupId);
    if (!tournamentStartup) {
      console.warn(`TournamentStartup com ID ${tournamentStartupId} não encontrado`);
      return { name: "A definir", score: 0, startup: undefined };
    }
    
    const startupId = tournamentStartup.startup;
    if (typeof startupId !== "number") {
      console.warn(`ID da startup no TournamentStartup ${tournamentStartupId} não é um número:`, startupId);
      return { name: "A definir", score: 0, startup: undefined };
    }
    
    const startup = startupDetails[startupId];
    if (!startup) {
      console.warn(`Startup com ID ${startupId} não encontrada no objeto startupDetails`);
      return { name: "A definir", score: 0, startup: undefined };
    }

    return {
      name: startup.name,
      score: tournamentStartup.currentScore || 0,
      startup: startup
    };
  };

  const battlesByRound = Array.from({ length: totalRounds }, (_, roundIndex) => {
    const round = roundIndex + 1;
    return battlesWithRounds
      .filter(b => b.roundNumber === round)
      .sort((a, b) => (a.battleNumber ?? 0) - (b.battleNumber ?? 0));
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white border rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-50 border-b px-4 py-3">
        <div className="flex overflow-x-auto scrollbar-thin">
          {battlesByRound.map((battles, roundIndex) => (
            <div 
              key={`header-${roundIndex + 1}`}
              className="flex-shrink-0 px-2"
              style={{ width: '270px' }}
            >
              <div className={`
                text-center font-medium rounded-full shadow-sm py-2 text-sm
                ${roundIndex === totalRounds - 1 ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}
              `}>
                {roundIndex + 1 === totalRounds
                  ? "🏆 Final"
                  : roundIndex + 1 === totalRounds - 1
                  ? "🥇 Semi-finais"
                  : roundIndex + 1 === totalRounds - 2
                  ? "🏅 Quartas de final"
                  : `Rodada ${roundIndex + 1}`}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 overflow-x-auto">
        <div className="flex min-w-max pb-6">
          {battlesByRound.map((roundBattles, roundIndex) => (
            <div 
              key={`round-${roundIndex + 1}`}
              className="flex-shrink-0 px-2"
              style={{ width: '270px' }}
            >
              <div className="space-y-5">
                {roundBattles.map((battle) => {
                  const { name: startup1Name, score: startup1Score } = 
                    findStartupById(battle.startup1);
                  
                  const { name: startup2Name, score: startup2Score} = 
                    findStartupById(battle.startup2);
                  
                  const isAvailable = canBattleBeExecuted(battle);
                  const isCompleted = battle.completed;
                  
                  let statusClass = "bg-white border border-gray-200";
                  let statusText = "Pendente";
                  let statusBadgeClass = "bg-white text-gray-500";
                  
                  if (isCompleted) {
                    statusClass = "bg-white border border-green-300";
                    statusText = "Concluído";
                    statusBadgeClass = "bg-green-100 text-green-600";
                  } else if (isAvailable) {
                    statusClass = "bg-white border border-blue-300";
                    statusText = "Disponível";
                    statusBadgeClass = "bg-blue-100 text-blue-600";
                  }

                  return (
                    <BattleCard
                      key={battle.id}
                      battle={battle}
                      startup1Name={startup1Name}
                      startup2Name={startup2Name}
                      startup1Score={startup1Score}
                      startup2Score={startup2Score}
                      isAvailable={isAvailable}
                      isCompleted={isCompleted}
                      statusClass={statusClass}
                      statusText={statusText}
                      statusBadgeClass={statusBadgeClass}
                      onSelect={() => handleBattleSelect(battle)}
                      getStartupInitial={getStartupInitial}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 border-t px-4 py-3">
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center">
            <div className="w-2.5 h-2.5 border border-green-300 bg-white rounded-sm mr-1"></div>
            <span className="text-xs text-gray-600">Concluída</span>
          </div>
          <div className="flex items-center">
            <div className="w-2.5 h-2.5 border border-blue-300 bg-white rounded-sm mr-1"></div>
            <span className="text-xs text-gray-600">Disponível</span>
          </div>
          <div className="flex items-center">
            <div className="w-2.5 h-2.5 border border-gray-200 bg-white rounded-sm mr-1"></div>
            <span className="text-xs text-gray-600">Aguardando</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentBracket;