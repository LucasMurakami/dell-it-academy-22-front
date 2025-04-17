"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NotFoundPage from "@/app/components/shared/NotFoundPage";
import { dummyStartups } from "@/app/constants/dummyData";

interface Startup {
  id: number | string;
  name: string;
  founded_year: number | string;
  slogan: string;
  created_at: string;
}

export default function StartupDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStartup = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const foundStartup = dummyStartups.find((s) => s.id.toString() === id);
      setStartup(foundStartup ?? null);
      setLoading(false);
    };

    loadStartup();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
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
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {startup.name}
      </h2>
      
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
              <dd className="mt-1 text-sm text-gray-900">{startup.founded_year}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              {/* <dd className="mt-1 text-sm">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {startup.status}
                </span>
              </dd> */}
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
          </dl>
        </div>
      </div>
    </div>
  );
}