"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStartups, Startup } from "@/app/api/backend/startupsApi";
import { createTournament } from "@/app/api/backend/tournamentsApi";
import { createTournamentStartup } from "@/app/api/backend/tournamentStartupsApi";
import { Battle, createBattle } from "@/app/api/backend";
import { FaRandom, FaSave, FaTrophy } from "react-icons/fa";

const getTotalRounds = (participantCount: number): number => {
  return Math.ceil(Math.log2(participantCount));
};

export default function CreateTournamentPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startupCount, setStartupCount] = useState<4 | 8>(8);
  const [allStartups, setAllStartups] = useState<Startup[]>([]);
  const [selectedStartups, setSelectedStartups] = useState<number[]>([]);
  const [matchups, setMatchups] = useState<number[][]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [allBattles, setAllBattles] = useState<Battle[]>([]);
  
  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const data = await getStartups();
        setAllStartups(data);
      } catch (err) {
        console.error("Erro ao carregar startups:", err);
        setError("Não foi possível carregar as startups. Tente novamente mais tarde.");
      }
    };
    
    fetchStartups();
  }, []);

  useEffect(() => {
    if (selectedStartups.length === startupCount) {
      const initialMatchups = [];
      for (let i = 0; i < selectedStartups.length; i += 2) {
        initialMatchups.push([selectedStartups[i], selectedStartups[i+1]]);
      }
      setMatchups(initialMatchups);
    } else {
      setMatchups([]);
    }
  }, [selectedStartups, startupCount]);

  useEffect(() => {
    if (matchups.length > 0) {
      const totalRounds = getTotalRounds(startupCount);
      
      let battleCounter = 1;
      
      const battles = matchups.map((pair, index) => ({
        matchNumber: index + 1,
        roundNumber: 1,
        battleNumber: battleCounter++,
        startup1: pair[0],
        startup2: pair[1]
      }));
      
      let currentMatchNumber = battles.length + 1;
      
      for (let round = 2; round <= totalRounds; round++) {
        const battlesInRound = startupCount / Math.pow(2, round);
        
        for (let i = 0; i < battlesInRound; i++) {
          battles.push({
            matchNumber: currentMatchNumber++,
            roundNumber: round,
            battleNumber: battleCounter++,
            startup1: null,
            startup2: null
          });
        }
      }
      
      setAllBattles(battles);
    }
  }, [matchups, startupCount]);

  const handleStartupSelect = (startupId: number) => {
    if (selectedStartups.includes(startupId)) {
      setSelectedStartups(selectedStartups.filter(id => id !== startupId));
    } else {
      if (selectedStartups.length < startupCount) {
        setSelectedStartups([...selectedStartups, startupId]);
      }
    }
  };

  const randomizeMatchups = () => {
    const shuffled = [...selectedStartups].sort(() => Math.random() - 0.5);
    const newMatchups = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      newMatchups.push([shuffled[i], shuffled[i+1]]);
    }
    setMatchups(newMatchups);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedStartups.length !== startupCount) {
      setError(`Selecione exatamente ${startupCount} startups para iniciar o torneio.`);
      return;
    }
    
    if (matchups.length !== startupCount/2) {
      setError("Defina todos os confrontos iniciais.");
      return;
    }

    try {
      setLoading(true);
      
      const tournament = await createTournament({
        name,
        status: "IN_PROGRESS",
        champion: null
      });
      
      const startupToTournamentStartupMap = new Map();
      
      await Promise.all(
        selectedStartups.map(async (startup) => {
          const tournamentStartup = await createTournamentStartup({
            tournament: tournament,
            startup: startup,
            eliminated: false,
          });
          
          startupToTournamentStartupMap.set(startup, tournamentStartup);
          return tournamentStartup;
        })
      );
      
      const sortedBattles = [...allBattles].sort((a, b) => {
        if ((a.roundNumber ?? 0) !== (b.roundNumber ?? 0)) {
          return (a.roundNumber ?? 0) - (b.roundNumber ?? 0);
        }
        
        return (a.battleNumber ?? 0) - (b.battleNumber ?? 0);
      });
      
      for (const battle of sortedBattles) {
        const tournamentStartup1 = battle.startup1 ? startupToTournamentStartupMap.get(battle.startup1) : null;
        const tournamentStartup2 = battle.startup2 ? startupToTournamentStartupMap.get(battle.startup2) : null;
        
        await createBattle({
          tournament: tournament,
          roundNumber: battle.roundNumber,
          battleNumber: battle.battleNumber,
          startup1: tournamentStartup1,
          startup2: tournamentStartup2,
          winner: null,
          sharkFight: false,
          completed: false,
        });
      }

      router.push(`/dashboard/tournaments/${tournament}/manage`);
      
    } catch (err) {
      console.error("Erro ao criar torneio:", err);
      setError("Não foi possível criar o torneio. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaTrophy className="mr-2" /> Criar Novo Torneio
      </h1>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome do Torneio
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Número de Startups
              </label>
              <div className="mt-2 flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="startupCount"
                    checked={startupCount === 4}
                    onChange={() => setStartupCount(4)}
                  />
                  <span className="ml-2">4 Startups</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="startupCount"
                    checked={startupCount === 8}
                    onChange={() => setStartupCount(8)}
                  />
                  <span className="ml-2">8 Startups</span>
                </label>
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={!name}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Próximo: Selecionar Startups
              </button>
            </div>
          </div>
        </form>
      )}
      
      {step === 2 && (
        <div>
          <h2 className="text-lg font-medium mb-4">
            Selecione {startupCount} startups para o torneio
          </h2>
          
          <p className="text-sm text-gray-600 mb-4">
            Selecionados: {selectedStartups.length} de {startupCount}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {allStartups.map(startup => (
              <div
                key={startup.id}
                onClick={() => startup.id !== undefined && handleStartupSelect(startup.id)}
                className={`border p-4 rounded-lg cursor-pointer ${
                  (startup.id !== undefined && selectedStartups.includes(startup.id))
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <h3 className="font-medium">{startup.name}</h3>
                <p className="text-sm text-gray-500 truncate">{startup.description}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Voltar
            </button>
            
            <button
              onClick={() => setStep(3)}
              disabled={selectedStartups.length !== startupCount}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Próximo: Definir Confrontos
            </button>
          </div>
        </div>
      )}
      
      {step === 3 && (
        <div>
          <h2 className="text-lg font-medium mb-2">Definir Confrontos Iniciais</h2>
          
          <div className="flex justify-end mb-4">
            <button
              onClick={randomizeMatchups}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              <FaRandom className="mr-2" /> Randomizar Confrontos
            </button>
          </div>
          
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <ul className="flex flex-wrap -mb-px">
                <li className="mr-2">
                  <button
                    className="inline-block p-4 border-b-2 border-blue-600 text-blue-600 font-medium"
                  >
                    Rodada 1 (Inicial)
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-6 mb-6">
            <h3 className="font-medium text-lg mb-4">Confrontos Iniciais</h3>
            
            {matchups.map((pair, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-sm">
                <h4 className="font-medium mb-2 flex items-center">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                    #{index + 1}
                  </span>
                  Batalha {index + 1}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 bg-blue-50 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="font-bold text-sm">
                        {allStartups.find(s => s.id === pair[0])?.name.charAt(0) || "?"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        {allStartups.find(s => s.id === pair[0])?.name || "Selecione"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-purple-50 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <span className="font-bold text-sm">
                        {allStartups.find(s => s.id === pair[1])?.name.charAt(0) || "?"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        {allStartups.find(s => s.id === pair[1])?.name || "Selecione"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mb-6 border rounded-lg p-6 bg-gray-50">
            <h3 className="font-medium text-lg mb-4">Prévia das Rodadas Subsequentes</h3>
            
            <div className="space-y-4">
              {allBattles
                .filter(battle => battle.roundNumber > 1)
                .sort((a, b) => a.roundNumber - b.roundNumber || a.matchNumber - b.matchNumber)
                .map((battle, index) => (
                  <div key={`future-${index}`} className="border rounded-lg p-4 bg-white opacity-75">
                    <h4 className="font-medium mb-2 flex items-center">
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mr-2">
                        Rodada {battle.roundNumber}
                      </span>
                      <span className="text-gray-500">Batalha #{battle.matchNumber}</span>
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-3 bg-gray-100 flex items-center justify-center h-12">
                        <span className="text-gray-500 text-sm">Vencedor de rodada anterior</span>
                      </div>
                      <div className="border rounded-lg p-3 bg-gray-100 flex items-center justify-center h-12">
                        <span className="text-gray-500 text-sm">Vencedor de rodada anterior</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            
            <div className="mt-6 bg-blue-50 p-4 rounded-md flex items-start">
              <div className="text-blue-500 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-sm text-blue-800">
                <p className="font-medium">Rodadas automáticas</p>
                <p>Estas batalhas serão criadas automaticamente com os participantes definidos conforme os vencedores das rodadas anteriores.</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Voltar
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={loading || matchups.length !== startupCount/2}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <FaSave className="mr-2" />
              {loading ? "Criando..." : "Criar Torneio"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}