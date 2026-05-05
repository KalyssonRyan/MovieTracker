import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type OmdbResult = {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
};

function SearchPage() {
  const [modalAberto, setModalAberto] = useState(false);
  const [filmeSelecionado, setFilmeSelecionado] = useState<OmdbResult | null>(
    null,
  );

  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("assistido");
  const [nota, setNota] = useState(0);
  const [resultado, setResultado] = useState<OmdbResult[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function enviar(event: React.FormEvent) {
    event.preventDefault();

    await fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: filmeSelecionado?.Title,
        genero: filmeSelecionado?.Type,
        status,
        nota,
        poster: filmeSelecionado?.Poster,
      }),
    });

    setModalAberto(false);
    setFilmeSelecionado(null);
    navigate("/movies");
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!busca) {
        setResultado([]);
        return;
      }

      setLoading(true);

      try {
        const result = await fetch(
          `http://localhost:3000/search/?pesquisa=${busca}`,
        );
        const data = await result.json();
        setResultado(data.Search ?? []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [busca]);

  return (
    <div className="space-y-8">
      {/* INPUT */}
      <div className="max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Buscar filmes..."
          onChange={(e) => setBusca(e.target.value)}
          className="w-full bg-zinc-900 border border-white/10 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-yellow-400 placeholder:text-zinc-500"
        />
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-zinc-500 animate-pulse">Buscando...</p>
      )}

      {/* RESULTADOS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {resultado.map((item) => (
          <div
            key={item.imdbID}
            className="group relative rounded-xl overflow-hidden bg-zinc-900 border border-white/5 hover:border-yellow-400/30 transition"
          >
            <img
              src={item.Poster}
              alt={item.Title}
              className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute bottom-0 p-3">
              <h3 className="text-sm text-white">{item.Title}</h3>
              <p className="text-xs text-zinc-400">{item.Year}</p>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => {
                  setFilmeSelecionado(item);
                  setModalAberto(true);
                }}
                className="px-4 py-2 rounded-full bg-yellow-400 text-black text-sm hover:bg-yellow-300"
              >
                Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modalAberto && filmeSelecionado && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 w-full max-w-md space-y-4">
            <div className="flex gap-4">
              <img
                src={filmeSelecionado.Poster}
                className="w-24 h-36 object-cover rounded"
              />
              <div>
                <h2 className="text-white font-medium">
                  {filmeSelecionado.Title}
                </h2>
                <p className="text-sm text-zinc-400">{filmeSelecionado.Year}</p>
              </div>
            </div>

            <form onSubmit={enviar} className="space-y-4">
              <div>
                <label className="text-sm text-zinc-400">Status</label>
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                  className="w-full mt-1 bg-zinc-800 border border-white/10 rounded px-2 py-2"
                >
                  <option value="assistido">Assistido</option>
                  <option value="quero_ver">Quero assistir</option>
                  <option value="dropado">Dropado</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-zinc-400">Nota</label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  onChange={(e) => setNota(Number(e.target.value))}
                  className="w-full mt-1 bg-zinc-800 border border-white/10 rounded px-2 py-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="px-4 py-2 text-sm text-zinc-400 hover:text-white"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-yellow-400 text-black text-sm hover:bg-yellow-300"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
