"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

import { getStartupById, updateStartup, Startup } from "@/app/api/backend/startupsApi";

export default function EditStartupPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [name, setName] = useState("");
  const [foundedYear, setFoundedYear] = useState<number | undefined>();
  const [slogan, setSlogan] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStartup = async () => {
      setLoading(true);
      setError(null);

      try {
        const startup = await getStartupById(Number(id));
        if (startup) {
          setName(startup.name);
          setFoundedYear(startup.foundedYear);
          setSlogan(startup.slogan);
          setDescription(startup.description || "");
        } else {
          setError("Startup não encontrada.");
        }
      } catch (err) {
        console.error("Erro ao carregar startup:", err);
        setError("Erro ao carregar os dados da startup.");
      } finally {
        setLoading(false);
      }
    };

    loadStartup();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const updatedStartup: Startup = {
      id: Number(id),
      name,
      foundedYear: foundedYear || new Date().getFullYear(),
      slogan,
      description,
    };

    try {
      await updateStartup(Number(id), updatedStartup);
      router.push("/dashboard/startups");
    } catch (err) {
      console.error("Erro ao atualizar startup:", err);
      setError("Erro ao atualizar a startup. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Editar Startup</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Startup</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nome da Startup"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ano de Fundação</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="2025"
              value={foundedYear || ""}
              onChange={(e) => setFoundedYear(Number(e.target.value))}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slogan</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Slogan ou descrição curta"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Descreva detalhadamente a startup"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            onClick={() => router.push("/dashboard/startups")}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}