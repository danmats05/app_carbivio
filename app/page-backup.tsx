export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Carbivio</h1>
        <p className="text-xl mb-8">Plateforme SaaS de gestion de services</p>
        <div className="space-y-4">
          <a 
            href="/admin" 
            className="block px-6 py-3 bg-[#eca226] text-black rounded-lg hover:bg-[#d4911f] transition-colors"
          >
            Accéder au Dashboard
          </a>
          <a 
            href="/stock" 
            className="block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Gestion des stocks
          </a>
          <a 
            href="/rapports" 
            className="block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Rapports
          </a>
        </div>
      </div>
    </div>
  );
}
