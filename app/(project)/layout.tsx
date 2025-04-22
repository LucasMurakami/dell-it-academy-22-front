"use client";

import "./globals.css";
import { Poppins } from "next/font/google";

import { ChatbotProvider } from '@/app/context/ChatbotContext';
import Chatbot from '@/app/components/landing-page/chatbot/Chatbot';

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="PT-BR">
      <body
        className={`${poppins.className} bg-gray-100 antialiased`}
      >
        <ChatbotProvider>
          {children}
          <Chatbot />
        </ChatbotProvider>
      </body>
    </html>
  );
}
