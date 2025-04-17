import { FaRocket, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
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
          <FaRocket className="text-blue-600 mr-2" />
          <span>Startup Showdown</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="flex items-center focus:outline-none">
            <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
              U
            </span>
            <span className="hidden md:block ml-2 text-sm font-medium">Usuário</span>
            <FaChevronDown className="ml-1 text-xs text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
}