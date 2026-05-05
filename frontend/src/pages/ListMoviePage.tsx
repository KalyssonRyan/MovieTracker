import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Movies = {
  id: string;
  nome: string;
  genero: string;
  status: string;
  nota: number;
  poster: string;
};

function ListMoviePage() {
  const [carregando, setCarregando] = useState(true);
  const [movies, setMovies] = useState<Movies[]>([]);
  const [filter, setFilter] = useState("todos");
  const filmeFiltrado =
    filter === "todos" ? movies : movies.filter((u) => u.status == filter);

  async function deletar(id: string) {
    const confirmado = window.confirm("Deseja deletar mesmo?");
    if (confirmado) {
      await fetch(`http://localhost:3000/movies/${id}`, {
        method: "DELETE",
      });
      setMovies((prev) => prev.filter((u) => u.id !== id));
    }
  }

  useEffect(() => {
    async function run() {
      try {
        setCarregando(true);
        const result = await fetch("http://localhost:3000/movies");
        const data = await result.json();
        setMovies(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setCarregando(false);
      }
    }
    run();
  }, []);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-yellow-300 tracking-wide">
          Catálogo de Filmes
        </h1>

        <Link
          to="/create"
          className="px-4 py-2 rounded-full bg-yellow-400 text-black text-sm hover:bg-yellow-300 transition"
        >
          + Adicionar
        </Link>
        <button
          onClick={() => {
            setFilter("assistido");
          }}
          className="px-4 py-2 rounded-full bg-yellow-400 text-black text-sm hover:bg-yellow-300 transition"
        >
          Assistido
        </button>
        <button
          onClick={() => {
            setFilter("todos");
          }}
          className="px-4 py-2 rounded-full bg-yellow-400 text-black text-sm hover:bg-yellow-300 transition"
        >
          Todos
        </button>
        <button
          onClick={() => {
            setFilter("quero_ver");
          }}
          className="px-4 py-2 rounded-full bg-yellow-400 text-black text-sm hover:bg-yellow-300 transition"
        >
          WishList
        </button>
      </div>

      {/* LOADING */}
      {carregando && (
        <p className="text-zinc-400 animate-pulse">Carregando filmes...</p>
      )}

      {/* EMPTY */}
      {!carregando && movies.length === 0 && (
        <div className="text-center text-zinc-500 mt-10">
          Nenhum filme cadastrado ainda 🎬
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filmeFiltrado.map((movie) => (
          <div
            key={movie.id}
            className="group relative rounded-xl overflow-hidden bg-zinc-900 border border-white/5 hover:border-yellow-400/30 transition"
          >
            {/* POSTER */}
            <img
              src={movie.poster}
              alt={movie.nome}
              className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80" />

            {/* INFO */}
            <div className="absolute bottom-0 p-3 space-y-1">
              <h3 className="text-sm font-medium text-white">{movie.nome}</h3>
              <p className="text-xs text-zinc-400">{movie.genero}</p>
            </div>

            {/* HOVER ACTIONS */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
              <Link
                to={`/edit/${movie.id}`}
                className="px-3 py-1.5 text-xs rounded-full bg-yellow-400 text-black hover:bg-yellow-300"
              >
                Editar
              </Link>

              <button
                onClick={() => deletar(movie.id)}
                className="px-3 py-1.5 text-xs rounded-full bg-red-500/90 text-white hover:bg-red-500"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListMoviePage;
