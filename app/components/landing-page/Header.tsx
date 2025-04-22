"use client";

import { useState } from "react";
import Link from "next/link";
import { FaRocket, FaBars, FaTimes } from "react-icons/fa";
import ChatbotButton from "@/app/components/shared/ChatbotButton";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <FaRocket className="text-blue-600 text-2xl mr-2" />
            <span className="text-xl font-bold text-gray-800">Startup Showdown</span>
          </Link>
        </div>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/#features" className="text-gray-600 hover:text-blue-600">Recursos</Link>
          <Link href="/#how-it-works" className="text-gray-600 hover:text-blue-600">Como funciona</Link>
          <ChatbotButton />
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
            Acessar
          </Link>
        </div>

        {/* Menu mobile toggle */}
        <div className="md:hidden flex items-center">
          <ChatbotButton />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-4 py-3 space-y-3">
            <Link href="/#features" className="block text-gray-600 hover:text-blue-600">
              Recursos
            </Link>
            <Link href="/#how-it-works" className="block text-gray-600 hover:text-blue-600">
              Como funciona
            </Link>
            <Link href="/login" className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-center">
              Acessar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}