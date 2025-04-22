import React from 'react';

interface AlertModalProps {
  message: string;
  onClose: () => void;
  isOpen: boolean;
}

export default function AlertModal({ message, onClose, isOpen }: AlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900/60 to-gray-900/60 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-200 animate-fadeIn">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Atenção</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}