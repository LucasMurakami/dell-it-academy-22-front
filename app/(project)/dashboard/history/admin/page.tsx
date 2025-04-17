"use client";

import { useState } from "react";
import { FaTrash, FaDownload, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { dummyBattles, dummyTournaments, dummyStartups } from "@/app/constants/dummyData";

export default function AdminHistory() {
  const [filterType, setFilterType] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");

  const historyItems = dummyBattles.map((battle) => {
    const tournament = dummyTournaments.find((t) => t.id === battle.tournament_id);
    const startup1 = dummyStartups.find((s) => s.id === battle.startup1_id);
    const startup2 = dummyStartups.find((s) => s.id === battle.startup2_id);

    return {
      id: battle.id,
      type: "batalha",
      name: `Batalha #${battle.id} - ${tournament?.name || "Torneio Desconhecido"}`,
      date: new Date(battle.created_at).toLocaleDateString("pt-BR"),
      participants: `${startup1?.name || "Desconhecido"} vs ${startup2?.name || "Desconhecido"}`,
      status: battle.completed ? "Concluído" : "Em andamento",
    };
  });

  const filteredItems = historyItems.filter((item) => {
    const matchesType = filterType === "todos" || item.type === filterType;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDeleteHistory = (id: number) => {
    console.log("Deletar histórico:", id);
  };

  const handleExportHistory = () => {
    console.log("Exportando histórico...");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Administração de Histórico</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full p-3 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <select
              className="bg-white border border-gray-300 text-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="todos">Todos os tipos</option>
              <option value="torneio">Apenas torneios</option>
              <option value="batalha">Apenas batalhas</option>
            </select>

            <button
              onClick={handleExportHistory}
              className="bg-green-600 text-white rounded-md px-4 py-2 flex items-center gap-2 hover:bg-green-700 transition-colors"
            >
              <FaDownload size={14} />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participantes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.type === "torneio"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.type === "torneio" ? "Torneio" : "Batalha"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.participants}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === "Concluído"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <Link
                        href={`/dashboard/battles/${item.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Detalhes
                      </Link>
                      <button
                        onClick={() => handleDeleteHistory(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    Nenhum registro de histórico encontrado com os filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}