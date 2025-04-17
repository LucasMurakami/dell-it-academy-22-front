import { FaRocket } from "react-icons/fa";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-sm fixed top-0 z-10 shadow-sm py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaRocket className="text-blue-600 text-2xl" />
          <span className="font-bold text-xl text-blue-900">Startup Showdown</span>
        </div>
        <Link
          href="/login"
          className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-medium shadow-md hover:bg-blue-700 transition-all transform hover:scale-105"
        >
          Login / Sign Up
        </Link>
      </div>
    </nav>
  );
}