import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[70vh] gap-8 px-4">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-5xl font-semibold text-yellow-300">
          Seu Catálogo de Filmes
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-md">
          Organize e descubra filmes com estilo.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Link
          to="/movies"
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-yellow-400 text-black text-sm"
        >
          Ver Filmes
        </Link>

        <Link
          to="/create"
          className="w-full sm:w-auto px-6 py-3 rounded-full border border-yellow-400/30 text-yellow-300 text-sm"
        >
          Adicionar
        </Link>

        <Link
          to="/search"
          className="w-full sm:w-auto px-6 py-3 rounded-full border border-zinc-700 text-zinc-300 text-sm"
        >
          Buscar
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
