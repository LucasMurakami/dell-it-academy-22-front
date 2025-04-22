"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronRight, FaTrophy, FaRocket, FaPlusCircle, FaClipboardList, FaBattleNet, FaRegListAlt, FaUsersCog } from "react-icons/fa";

import { getStartups, Startup } from "@/app/api/backend/startupsApi";
import { getTournaments, Tournament } from "@/app/api/backend/tournamentsApi";
import { getBattles, Battle } from "@/app/api/backend/battlesApi";

export default function DashboardHome() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [activeTournaments, setActiveTournaments] = useState<Tournament[]>([]);
  const [featuredTournament, setFeaturedTournament] = useState<Tournament | null>(null);
  const [pendingBattles, setPendingBattles] = useState<Battle[]>([]);
  const [completedBattles, setCompletedBattles] = useState<Battle[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        const startupsData = await getStartups();
        setStartups(startupsData);
        
        const tournamentsData = await getTournaments();
        setTournaments(tournamentsData);
        
        const active = tournamentsData.filter((t: Tournament) => t.status === "IN_PROGRESS");
        setActiveTournaments(active);

        console.log("Torneios ativos:", active);
        
        const featured = active.length > 0 
          ? active.sort((a: Tournament, b: Tournament) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())[0] 
          : tournamentsData.sort((a: Tournament, b: Tournament) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())[0];
        
        if (featured) {
          setFeaturedTournament(featured);
          
          const battleData = await getBattles();
          const tournamentBattles = battleData.filter((b: Battle) => b.tournament === featured.id);

          const pending = tournamentBattles.filter((b: Battle) => !b.completed);
          const completed = tournamentBattles.filter((b: Battle) => b.completed);
          setPendingBattles(pending);
          setCompletedBattles(completed);
        }
        
      } catch (err) {
        console.error("Erro ao carregar dados do dashboard:", err);
        setError("Não foi possível carregar os dados do dashboard. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Bem-vindo ao Startup Showdown</h1>
        <p className="mb-6">Gerencie torneios, startups e acompanhe batalhas em um só lugar.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/dashboard/tournaments/create" className="bg-white/20 hover:bg-white/30 transition-colors rounded-lg p-4 flex flex-col items-center text-center">
            <FaPlusCircle className="text-3xl mb-2" />
            <h3 className="font-medium">Criar Torneio</h3>
            <p className="text-sm opacity-80 mt-1">Configure um novo torneio de startups</p>
          </Link>
          
          <Link href="/dashboard/startups/create" className="bg-white/20 hover:bg-white/30 transition-colors rounded-lg p-4 flex flex-col items-center text-center">
            <FaUsersCog className="text-3xl mb-2" />
            <h3 className="font-medium">Registrar Startup</h3>
            <p className="text-sm opacity-80 mt-1">Adicione novas startups ao sistema</p>
          </Link>
          
          <Link href="/dashboard/startups" className="bg-white/20 hover:bg-white/30 transition-colors rounded-lg p-4 flex flex-col items-center text-center">
            <FaRocket className="text-3xl mb-2" />
            <h3 className="font-medium">Ver Startups</h3>
            <p className="text-sm opacity-80 mt-1">Visualize todas as startups cadastradas</p>
          </Link>
          
          <Link href="/dashboard/tournaments" className="bg-white/20 hover:bg-white/30 transition-colors rounded-lg p-4 flex flex-col items-center text-center">
            <FaTrophy className="text-3xl mb-2" />
            <h3 className="font-medium">Ver Torneios</h3>
            <p className="text-sm opacity-80 mt-1">Visualize todos os torneios</p>
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Visão Geral</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Total de Startups</p>
            <p className="text-2xl font-bold">{startups.length}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600">Torneios Ativos</p>
            <p className="text-2xl font-bold">{activeTournaments.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Batalhas Pendentes</p>
            <p className="text-2xl font-bold">{pendingBattles.length}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-600">Batalhas Concluídas</p>
            <p className="text-2xl font-bold">{completedBattles.length}</p>
          </div>
        </div>
      </div>
      
      {featuredTournament && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaClipboardList className="text-blue-600 mr-2" />
              Torneio em Destaque
            </h3>
            <Link href={`/dashboard/tournaments/${featuredTournament.id}`} className="text-blue-600 hover:text-blue-800 text-sm">
              Ver detalhes
            </Link>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-lg">{featuredTournament.name}</h4>
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
              <div>
                <p className="text-gray-500">Data de Criação</p>
                <p>{new Date(featuredTournament.createdAt || "").toLocaleDateString("pt-BR")}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className={`${featuredTournament.status === 'IN_PROGRESS' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {featuredTournament.status === 'IN_PROGRESS' ? 'Em andamento' : 
                   featuredTournament.status === 'COMPLETED' ? 'Concluído' : 'Rascunho'}
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Link href={`/dashboard/tournaments/${featuredTournament.id}/manage`} 
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                Gerenciar Torneio
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaBattleNet className="text-blue-600 mr-2" />
              Próximas Batalhas
            </h3>
            <Link href="/dashboard/tournaments" className="text-blue-600 hover:text-blue-800 text-sm">Ver todas</Link>
          </div>
          {pendingBattles.length > 0 ? (
            <div className="space-y-3">
              {pendingBattles.slice(0, 3).map((battle) => (
                <div key={battle.id} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <p className="font-medium">
                      Batalha #{battle.battleNumber} 
                      {battle.roundNumber && 
                        <span className="text-sm text-gray-500">
                          {battle.roundNumber === 1 ? " (Primeira rodada)" :
                          battle.roundNumber === 2 ? " (Segunda rodada)" : 
                          " (Final)"}
                        </span>
                      }
                    </p>
                    <p className="text-sm text-gray-500">Torneio: {tournaments.find(t => t.id === battle.tournament)?.name}</p>
                  </div>
                  <Link href={`/dashboard/tournaments/${battle.tournament}/manage`} className="text-blue-600 hover:text-blue-800">
                    <FaChevronRight />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Não há batalhas pendentes</p>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaRegListAlt className="text-blue-600 mr-2" />
              Startups Recentes
            </h3>
            <Link href="/dashboard/startups" className="text-blue-600 hover:text-blue-800 text-sm">Ver todas</Link>
          </div>
          {startups.length > 0 ? (
            <div className="space-y-3">
              {startups.slice(0, 3).map((startup) => (
                <div key={startup.id} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="font-semibold text-blue-700">{startup.name[0]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{startup.name}</p>
                    <p className="text-sm text-gray-500">{startup.slogan}</p>
                  </div>
                  <Link href={`/dashboard/startups/${startup.id}`} className="text-blue-600 hover:text-blue-800">
                    <FaChevronRight />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Nenhuma startup registrada</p>
          )}
        </div>
      </div>     
    
    </div>
  );
}