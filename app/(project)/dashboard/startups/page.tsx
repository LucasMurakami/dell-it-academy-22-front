"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus, FaEye, FaEdit, FaTrash, FaTimes, FaExclamationTriangle } from "react-icons/fa";
import { getStartups, deleteStartup, Startup } from "@/app/api/backend/startupsApi";

export default function ListStartups() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [startupToDelete, setStartupToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const data = await getStartups();
        setStartups(data);
      } catch (err) {
        setError("Erro ao carregar startups.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  const openDeleteModal = (id: number) => {
    setStartupToDelete(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setStartupToDelete(null);
  };

  const confirmDelete = async () => {
    if (startupToDelete === null) return;
    
    try {
      await deleteStartup(startupToDelete);
      setStartups((prev) => prev.filter((startup) => startup.id !== startupToDelete));
      closeDeleteModal();
    } catch (err: unknown) {
      console.error("Erro ao excluir startup:", err);
      closeDeleteModal();

      if (typeof err === "object" && err !== null && "message" in err && 
          typeof (err as { message: unknown }).message === "string" && 
          (err as { message: string }).message.includes("REFERENCED")) {
        setErrorToast(
          "Não é possível excluir esta startup porque ela já participou de um torneio."
        );
      } else {
        setErrorToast("Erro ao excluir a startup. Tente novamente.");
      }
      
      setTimeout(() => {
        setErrorToast(null);
      }, 5000);
    }
  };

  const closeErrorToast = () => {
    setErrorToast(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Startups Registradas</h2>
        <Link
          href="/dashboard/startups/register"
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <FaPlus size={12} />
          <span>Nova Startup</span>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slogan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ano
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {startups.map((startup) => (
              <tr key={startup.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {startup.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {startup.slogan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {startup.foundedYear}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center justify-center space-x-2">
                    <Link
                      href={`/dashboard/startups/${startup.id}`}
                      title="Visualizar detalhes"
                      className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                      aria-label="Ver detalhes"
                    >
                      <FaEye size={16} />
                    </Link>
                    <Link
                      href={`/dashboard/startups/${startup.id}/edit`}
                      title="Editar startup"
                      className="p-2 bg-amber-50 text-amber-600 rounded-full hover:bg-amber-100 transition-colors"
                      aria-label="Editar"
                    >
                      <FaEdit size={16} />
                    </Link>
                    <button
                      onClick={() => openDeleteModal(startup.id!)}
                      title="Excluir startup"
                      className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
                      aria-label="Excluir"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toast de Erro */}
      {errorToast && (
        <div className="fixed top-4 right-4 z-50 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded shadow-md flex items-center justify-between" role="alert">
          <div className="flex items-center">
            <FaExclamationTriangle className="mr-2" />
            <p>{errorToast}</p>
          </div>
          <button onClick={closeErrorToast} className="ml-4 text-red-500 hover:text-red-700">
            <FaTimes size={16} />
          </button>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-30" onClick={closeDeleteModal}></div>
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 z-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FaExclamationTriangle className="text-yellow-500 mr-2" /> 
              Confirmar Exclusão
            </h2>
            <p className="text-gray-700 mb-6">
              Tem certeza que deseja excluir esta startup? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}