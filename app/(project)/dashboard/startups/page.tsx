import Link from "next/link";
import { FaPlus, FaEye } from "react-icons/fa";
import { dummyStartups } from "@/app/constants/dummyData";

export default function ListStartups() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slogan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ano</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyStartups.map((startup) => (
              <tr key={startup.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{startup.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{startup.slogan}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{startup.founded_year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/dashboard/startups/${startup.id}`}
                    className="text-blue-600 hover:text-blue-900 flex items-center gap-2"
                  >
                    <FaEye size={12} />
                    <span>Ver</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}