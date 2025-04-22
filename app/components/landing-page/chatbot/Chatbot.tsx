"use client";

import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaChevronRight } from 'react-icons/fa';
import { useChatbot } from '@/app/context/ChatbotContext';

type Message = {
  sender: 'bot' | 'user';
  text: string;
  options?: string[];
};

export default function Chatbot() {
  const { isOpen, isButtonVisible, openChat, closeChat } = useChatbot();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const predefinedResponses: Record<string, Message> = {
    initial: {
      sender: 'bot',
      text: 'Olá! Eu sou o assistente virtual do Startup Showdown. Como posso ajudar você hoje?',
      options: ['O que é o Startup Showdown?', 'Como criar um torneio?', 'Como cadastrar startups?', 'Como funcionam as batalhas?', 'O que é Shark Fight?']
    },
    'o que é o startup showdown?': {
      sender: 'bot',
      text: 'O Startup Showdown é uma plataforma para organizar torneios de pitches entre startups. Aqui você pode cadastrar startups, criar torneios, gerenciar batalhas e acompanhar o desempenho dos participantes até o final!',
      options: ['Como criar um torneio?', 'Como cadastrar startups?', 'Como funcionam as batalhas?', 'Voltar ao início']
    },
    'como criar um torneio?': {
      sender: 'bot',
      text: 'Para criar um torneio, acesse o Dashboard e clique em "Criar Torneio". Você precisará definir um nome, selecionar entre 4 a 8 startups participantes (sempre em número par) e o sistema automaticamente organizará as batalhas em formato de eliminatórias.',
      options: ['Como cadastrar startups?', 'Como funcionam as batalhas?', 'Quantas startups podem participar?', 'Voltar ao início']
    },
    'como cadastrar startups?': {
      sender: 'bot',
      text: 'Acesse o Dashboard e clique em "Nova Startup". Preencha os dados como nome, slogan e ano de fundação. Uma descrição adicional é opcional. Após cadastradas, as startups estarão disponíveis para serem adicionadas aos torneios.',
      options: ['Como criar um torneio?', 'Como funcionam as batalhas?', 'Voltar ao início']
    },
    'como funcionam as batalhas?': {
      sender: 'bot',
      text: 'As batalhas são confrontos diretos entre duas startups. Durante uma batalha, você registra eventos que impactam a pontuação (como pitches, bugs, trações, etc). A startup com maior pontuação vence e avança para a próxima fase. Se houver empate, ocorre um "Shark Fight".',
      options: ['O que é Shark Fight?', 'Como os pontos são calculados?', 'Como avançar para próxima fase?', 'Voltar ao início']
    },
    'o que é shark fight?': {
      sender: 'bot',
      text: 'O Shark Fight acontece quando duas startups terminam uma batalha com a mesma pontuação. É um critério de desempate onde ambas continuam na competição, na qual aleatoriamente o sistema decide atribuir uma pontuação maior para uma startup.',
      options: ['Como funcionam as batalhas?', 'Como os pontos são calculados?', 'Voltar ao início']
    },
    'como os pontos são calculados?': {
      sender: 'bot',
      text: 'Cada evento durante uma batalha altera a pontuação das startups. Eventos positivos como pitches bem sucedidos e trações adicionam pontos, enquanto eventos negativos como bugs e investidores irritados reduzem pontos. Startups vencedoras recebem automaticamente 30 pontos adicionais por vitória.',
      options: ['Como funcionam as batalhas?', 'O que é Shark Fight?', 'Voltar ao início']
    },
    'quantas startups podem participar?': {
      sender: 'bot',
      text: 'Um torneio deve ter entre 4 e 8 startups participantes, sempre em número par (4,8) para garantir que o formato de eliminatórias simples funcione corretamente.',
      options: ['Como criar um torneio?', 'Como funcionam as batalhas?', 'Voltar ao início']
    },
    'como avançar para próxima fase?': {
      sender: 'bot',
      text: 'Quando todas as batalhas de uma fase são concluídas, o sistema automaticamente organiza a próxima fase, emparelhando as startups vencedoras para novas batalhas até chegar à final.',
      options: ['Como funcionam as batalhas?', 'O que é Shark Fight?', 'Voltar ao início']
    },
    'voltar ao início': {
      sender: 'bot',
      text: 'Como posso ajudar você a entender melhor o Startup Showdown?',
      options: ['O que é o Startup Showdown?', 'Como criar um torneio?', 'Como cadastrar startups?', 'Como funcionam as batalhas?', 'O que é Shark Fight?']
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([predefinedResponses.initial]);
    }
  }, [isOpen, messages.length, predefinedResponses.initial]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    const newUserMessage: Message = {
      sender: 'user',
      text: userInput
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    
    setTimeout(() => {
      const normalizedInput = userInput.toLowerCase().trim();
      const botReply = predefinedResponses[normalizedInput] || {
        sender: 'bot',
        text: 'Desculpe, não entendi sua pergunta. Posso ajudar com informações sobre o Startup Showdown, criação de torneios, cadastro de startups ou como funcionam as batalhas.',
        options: ['O que é o Startup Showdown?', 'Como criar um torneio?', 'Como cadastrar startups?', 'Como funcionam as batalhas?']
      };
      
      setMessages(prev => [...prev, botReply]);
    }, 600);
  };

  const handleOptionClick = (option: string) => {
    const newUserMessage: Message = {
      sender: 'user',
      text: option
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    setTimeout(() => {
      const normalizedOption = option.toLowerCase();
      const botReply = predefinedResponses[normalizedOption] || predefinedResponses['voltar ao início'];
      setMessages(prev => [...prev, botReply]);
    }, 600);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50">
          <div className="bg-white rounded-lg shadow-xl flex flex-col w-80 sm:w-96 md:w-[420px] max-h-[80vh] h-96">
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center">
                <FaRobot className="mr-2" />
                <span className="font-medium">Assistente Startup Showdown</span>
              </div>
              <button 
                onClick={closeChat}
                className="text-white hover:text-gray-200 focus:outline-none"
                aria-label="Fechar chat"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="flex-1 p-3 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index}>
                  <div
                    className={`mb-3 flex ${
                      msg.sender === 'bot' ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[85%] break-words shadow-sm ${
                        msg.sender === 'bot'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                  
                  {msg.options && (
                    <div className="mt-2 mb-4 flex flex-col gap-1.5">
                      {msg.options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          onClick={() => handleOptionClick(option)}
                          className="text-left text-sm bg-gray-50 hover:bg-gray-100 text-blue-600 rounded-md px-3 py-2 border border-gray-200 transition-colors flex items-center"
                        >
                          <span className="flex-1 text-wrap">{option}</span>
                          <FaChevronRight className="ml-1 text-xs flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-3 border-t border-gray-200">
              <div className="flex items-center">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua pergunta..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none flex items-center justify-center"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {isButtonVisible && !isOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none flex items-center justify-center"
          aria-label="Abrir assistente virtual"
        >
          <FaRobot size={24} />
        </button>
      )}
    </>
  );
}