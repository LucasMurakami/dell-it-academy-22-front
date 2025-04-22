"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import NotFoundPage from "@/app/components/shared/NotFoundPage";
import { getStartups, Startup } from "@/app/api/backend/startupsApi";

export default function StartupDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStartup = async () => {
      setLoading(true);
      setError(null);

      try {
        const startups = await getStartups();
        const foundStartup = startups.find((s: Startup) => s.id !== undefined && s.id.toString() === id);
        setStartup(foundStartup ?? null);
      } catch (err) {
        console.error("Erro ao carregar startups:", err);
        setError("Erro ao carregar os dados da startup.");
      } finally {
        setLoading(false);
      }
    };

    loadStartup();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center p-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!startup) {
    return (
      <NotFoundPage
        resourceType="startup"
        resourceId={id}
        backPath="/dashboard/startups"
        backLabel="Voltar para Startups"
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
      >
        Voltar
      </button>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{startup.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Informações Gerais</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Nome da Startup</dt>
              <dd className="mt-1 text-sm text-gray-900">{startup.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Ano de Fundação</dt>
              <dd className="mt-1 text-sm text-gray-900">{startup.foundedYear}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Detalhes Adicionais</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Slogan</dt>
              <dd className="mt-1 text-sm text-gray-900">{startup.slogan}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Descrição</dt>
              <dd className="mt-1 text-sm text-gray-900">{startup.description || "Nenhuma descrição disponível."}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}