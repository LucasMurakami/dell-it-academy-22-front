"use client";

import { FaRobot } from 'react-icons/fa';
import { useChatbot } from '@/app/context/ChatbotContext';

export default function ChatbotButton() {
  const { isButtonVisible, toggleButtonVisibility } = useChatbot();
  
  return (
    <button
      onClick={toggleButtonVisibility}
      className={`focus:outline-none flex items-center justify-center transition-colors ${
        isButtonVisible ? 'text-blue-600 hover:text-blue-700' : 'text-gray-400 hover:text-gray-600'
      }`}
      aria-label={isButtonVisible ? "Esconder assistente virtual" : "Mostrar assistente virtual"}
      title={isButtonVisible ? "Esconder assistente virtual" : "Mostrar assistente virtual"}
    >
      <FaRobot size={20} />
    </button>
  );
}