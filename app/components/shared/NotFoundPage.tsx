import Link from 'next/link';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

interface NotFoundPageProps {
  resourceType?: string;
  resourceId?: string | number;
  backPath?: string;
  backLabel?: string;
}

export default function NotFoundPage({
  resourceType = 'recurso',
  resourceId,
  backPath = '/dashboard',
  backLabel = 'Voltar para o Dashboard'
}: NotFoundPageProps) {
  const resourceText = resourceId 
    ? `${resourceType} com ID ${resourceId}`
    : resourceType;

  return (
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <div className="flex justify-center">
        <FaExclamationTriangle className="h-16 w-16 text-amber-500" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold text-gray-800">Recurso não encontrado</h2>
      <p className="mt-3 text-gray-600">
        O {resourceText} que você está procurando não existe ou foi removido.
      </p>
      <div className="mt-8">
        <Link
          href={backPath}
          className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FaArrowLeft className="mr-2 h-4 w-4" />
          {backLabel}
        </Link>
      </div>
    </div>
  );
}