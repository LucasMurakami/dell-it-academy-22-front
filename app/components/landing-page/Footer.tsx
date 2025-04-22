import { FaRocket, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <FaRocket className="text-blue-400" />
            <span className="font-bold text-white">Startup Showdown</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-400" />
              <a href="mailto:lucaskaitomurakami@gmail.com" className="text-white hover:text-blue-400 transition-colors">
                lucaskaitomurakami@gmail.com
              </a>
            </div>
            
            <div className="text-sm">
              &copy; {new Date().getFullYear()} Startup Showdown. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}