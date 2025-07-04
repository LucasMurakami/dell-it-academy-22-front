"use client";

import { FaRocket, FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import ChatbotButton from "@/app/components/shared/ChatbotButton";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const [userName, setUserName] = useState<string>("Usuário");

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const userInitial = userName ? userName.charAt(0).toUpperCase() : 'U';

  return (
    <header className="fixed w-full z-30 bg-white shadow-sm px-4 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <button 
          className="text-gray-500 hover:text-gray-700 focus:outline-none flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? "Fechar menu" : "Abrir menu"}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className="ml-4 text-lg font-semibold text-blue-900 flex items-center">
          <FaRocket className="mr-2" /> 
          <span>Startup Showdown</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <ChatbotButton />
        <div className="flex items-center space-x-3">
          <span className="hidden md:inline text-sm font-medium text-gray-700">{userName}</span>
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {userInitial}
          </div>
        </div>
      </div>
    </header>
  );
}