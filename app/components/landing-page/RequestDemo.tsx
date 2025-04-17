export default function RequestDemo() {
  return (
    <section
      id="demo"
      className="w-full py-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Quer organizar seu próprio torneio?</h2>
          <p className="text-xl text-blue-100">
            Solicite uma demonstração gratuita e descubra como podemos ajudar
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl p-8">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nome</label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Empresa/Organização</label>
              <input
                type="text"
                placeholder="Nome da sua empresa ou organização"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Telefone</label>
              <input
                type="tel"
                placeholder="(00) 00000-0000"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Conte-nos sobre seu evento</label>
              <textarea
                placeholder="Descreva brevemente o tipo de torneio que você gostaria de organizar"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                rows={4}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md"
            >
              Solicitar demonstração
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}