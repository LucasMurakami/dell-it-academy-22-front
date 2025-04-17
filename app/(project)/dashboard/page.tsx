import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Visão Geral</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Total de Startups</p>
            <p className="text-2xl font-bold">42</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600">Torneios Ativos</p>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Batalhas Pendentes</p>
            <p className="text-2xl font-bold">7</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-600">Completados</p>
            <p className="text-2xl font-bold">15</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Próximas Batalhas</h3>
            <Link href="/dashboard/battles" className="text-blue-600 hover:text-blue-800 text-sm">Ver todas</Link>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <p className="font-medium">Semifinal #{i}</p>
                  <p className="text-sm text-gray-500">18/04/2025 - 14:00</p>
                </div>
                <Link href={`/dashboard/battles/${i}`} className="text-blue-600 hover:text-blue-800">
                  <FaChevronRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Startups Recentes</h3>
            <Link href="/dashboard/startups" className="text-blue-600 hover:text-blue-800 text-sm">Ver todas</Link>
          </div>
          <div className="space-y-3">
            {["InovaPay", "HealthSync", "EduNext"].map((name, i) => (
              <div key={i} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="font-semibold text-blue-700">{name[0]}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-gray-500">Adicionada em {10 + i}/03/2025</p>
                </div>
                <Link href={`/dashboard/startups/${i}`} className="text-blue-600 hover:text-blue-800">
                  <FaChevronRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}