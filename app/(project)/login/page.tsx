"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaRocket, FaGoogle, FaUserSecret } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isGuestLogin, setIsGuestLogin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userName = !isLogin ? name : email.split('@')[0];
    localStorage.setItem('userName', userName);
    router.push("/dashboard");
  };

  const handleGoogleLogin = () => {
    router.push("/dashboard");
  };

  const handleGuestLogin = () => {
    setIsGuestLogin(true);
  };

  const handleTesterLogin = () => {
    setIsGuestLogin(true);
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userName', name);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      <header className="w-full bg-white/80 backdrop-blur-sm py-4 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <FaRocket className="text-blue-600 text-2xl" />
            <span className="font-bold text-xl text-blue-900">Startup Showdown</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {!isGuestLogin ? (
              <>
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                  <h2 className="text-2xl font-bold text-center">
                    {isLogin ? "Acesse sua conta" : "Crie sua conta"}
                  </h2>
                  <p className="text-center mt-2 text-blue-100">
                    {isLogin
                      ? "Entre para gerenciar seus torneios de startups"
                      : "Comece a organizar torneios de startups hoje mesmo"}
                  </p>
                </div>

                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                      <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                          Nome completo
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Seu nome"
                          required={!isLogin}
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                        Senha
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    {isLogin && (
                      <div className="flex justify-end">
                        <Link href="/recuperar-senha" className="text-sm text-blue-600 hover:text-blue-800">
                          Esqueceu a senha?
                        </Link>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-all"
                    >
                      {isLogin ? "Entrar" : "Criar conta"}
                    </button>
                  </form>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">ou continue com</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <button
                        onClick={handleGoogleLogin}
                        className="w-full py-2 px-4 flex justify-center items-center gap-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-all"
                      >
                        <FaGoogle className="text-red-500" />
                        <span>Google</span>
                      </button>
                      
                      <button
                        onClick={handleGuestLogin}
                        className="w-full py-2 px-4 flex justify-center items-center gap-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-all"
                      >
                        <FaUserSecret className="text-gray-700" />
                        <span>Convidado</span>
                      </button>
                    </div>

                    <div className="mt-3">
                      <button
                        onClick={handleTesterLogin}
                        className="w-full py-2 px-4 flex justify-center items-center gap-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-all"
                      >
                        <FaUserSecret className="text-gray-700" />
                        <span>Tester</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-gray-600">
                      {isLogin ? "Não tem uma conta?" : "Já possui uma conta?"}{" "}
                      <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-600 font-medium hover:text-blue-800"
                      >
                        {isLogin ? "Cadastre-se" : "Entrar"}
                      </button>
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>            
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                  <h2 className="text-2xl font-bold text-center">Bem-vindo!</h2>
                  <p className="text-center mt-2 text-blue-100">
                    Insira seu nome para continuar como Convidado ou Tester
                  </p>
                </div>

                <div className="p-6">
                  <form onSubmit={handleGuestSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="guestName" className="block text-gray-700 font-medium mb-1">
                        Nome
                      </label>
                      <input
                        id="guestName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Seu nome"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-all"
                    >
                      Continuar
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <footer className="py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Startup Showdown. Todos os direitos reservados.
      </footer>
    </div>
  );
}