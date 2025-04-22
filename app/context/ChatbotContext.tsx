"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface ChatbotContextType {
  isOpen: boolean;
  isButtonVisible: boolean;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  toggleButtonVisibility: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const toggleChat = () => setIsOpen(prev => !prev);
  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleButtonVisibility = () => setIsButtonVisible(prev => !prev);

  return (
    <ChatbotContext.Provider value={{ 
      isOpen, 
      isButtonVisible, 
      toggleChat, 
      openChat, 
      closeChat, 
      toggleButtonVisibility 
    }}>
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot deve ser usado dentro de um ChatbotProvider');
  }
  return context;
}