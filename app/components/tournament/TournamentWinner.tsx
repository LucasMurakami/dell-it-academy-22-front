import React, { useEffect, useState } from 'react';
import { FaTrophy, FaCrown, FaStar, FaMedal } from 'react-icons/fa';

import { Startup } from '@/app/api/backend/startupsApi';
import { Battle } from '@/app/api/backend/battlesApi';
import { TournamentStartup } from '@/app/api/backend/tournamentStartupsApi';

interface TournamentWinnerProps {
  battles: Battle[];
  tournamentStartups: TournamentStartup[];
  startups: { [key: number]: Startup };
  totalRounds: number;
  tournamentCompleted: boolean;
}

const TournamentWinner: React.FC<TournamentWinnerProps> = ({
  battles,
  tournamentStartups,
  startups,
  totalRounds,
  tournamentCompleted
}) => {
  const [winnerStartup, setWinnerStartup] = useState<Startup | null>(null);
  const [winnerTournamentStartup, setWinnerTournamentStartup] = useState<TournamentStartup | null>(null);

  useEffect(() => {
    const findFinalBattle = () => {
      const completedBattles = battles.filter(b => b.completed);
      
      if (completedBattles.length === 0) return null;
      
      const sortedBattles = [...completedBattles].sort((a, b) => 
        (b.roundNumber || 0) - (a.roundNumber || 0)
      );
      
      const finalBattles = sortedBattles.filter(b => b.roundNumber === totalRounds);
      
      return finalBattles.length > 0 ? finalBattles[0] : null;
    };

    const finalBattle = findFinalBattle();
    
    if (finalBattle && finalBattle.winner && tournamentCompleted) {
      const winnerTS = tournamentStartups.find(ts => ts.id === finalBattle.winner);
      
      if (winnerTS && typeof winnerTS.startup === 'number') {
        const winner = startups[winnerTS.startup];
        
        if (winner) {
          setWinnerStartup(winner);
          setWinnerTournamentStartup(winnerTS);
        }
      }
    }
  }, [battles, tournamentStartups, startups, totalRounds, tournamentCompleted]);

  if (!winnerStartup || !winnerTournamentStartup || !tournamentCompleted) {
    return null;
  }

  return (
    <div className="relative my-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 rounded-xl shadow-xl p-6 overflow-hidden">
        <div className="absolute top-4 right-4">
          <FaStar className="text-blue-200 text-xl animate-pulse" />
        </div>
        <div className="absolute bottom-6 left-8">
          <FaStar className="text-blue-200 text-lg animate-pulse" />
        </div>
        <div className="absolute top-12 left-10">
          <FaStar className="text-blue-200 text-sm animate-pulse" />
        </div>
        <div className="absolute bottom-10 right-12">
          <FaStar className="text-blue-200 text-2xl animate-pulse" />
        </div>
        <div className="absolute top-8 right-1/4">
          <FaMedal className="text-blue-200 text-xl animate-pulse" />
        </div>
        
        <div className="flex flex-col items-center relative z-10">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4 border-4 border-blue-300 shadow-lg animate-bounce duration-[3000ms]">
            <FaTrophy className="text-6xl text-blue-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-1 flex items-center">
            <FaCrown className="mr-2 text-blue-200" /> 
            Startup Campeã
          </h2>
          
          <div className="mt-6 text-center">
            <h3 className="text-4xl font-extrabold text-white mb-3 animate-pulse">
              {winnerStartup.name}
            </h3>
            
            <p className="text-xl text-white font-medium italic mb-6 px-8 bg-blue-700/40 py-2 rounded-lg">
              &quot;{winnerStartup.slogan || 'Sem Slogan'}&quot;
            </p>
            
            <div className="bg-white/30 rounded-lg p-4 mb-6 border-2 border-white/50">
              <p className="text-blue-100 font-bold">Pontuação Final</p>
              <div className="text-3xl font-extrabold text-blue-900 bg-blue-50 py-2 px-4 rounded-md mt-1">
                {winnerTournamentStartup.currentScore || 0} pontos
              </div>
            </div>           
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentWinner;