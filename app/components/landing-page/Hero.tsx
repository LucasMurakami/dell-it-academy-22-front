export default function Hero() {
  return (
    <section className="w-full pt-28 pb-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Gerencie <span className="text-yellow-300">torneios de startups</span> com facilidade
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Plataforma completa para organizar e gerenciar competições entre startups, desde o cadastro até os relatórios finais.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#recursos"
              className="px-8 py-3 bg-white text-blue-700 rounded-lg font-semibold shadow-lg hover:bg-yellow-100 transition-all"
            >
              Conhecer recursos
            </a>
            <a
              href="#demo"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Agendar demonstração
            </a>
          </div>
        </div>
        <div className="md:w-1/2 relative h-64 md:h-96">
        {/* Achar Imagem para Hero Section */}
          <div className="absolute inset-0 bg-[url('/hero-image.svg')] bg-contain bg-center bg-no-repeat opacity-90"></div>
        </div>
      </div>
    </section>
  );
}