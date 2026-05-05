import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPage() {
  const { id } = useParams();

  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [status, setStatus] = useState("");
  const [nota, setNota] = useState(0);
  const [poster, setPoster] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  async function Editar(event: React.FormEvent) {
    event.preventDefault();

    await fetch(`http://localhost:3000/movies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, genero, status, nota, poster }),
    });

    navigate("/movies");
  }

  useEffect(() => {
    async function buscar() {
      try {
        const result = await fetch(`http://localhost:3000/movies/${id}`);
        const data = await result.json();

        setNome(data.data.nome);
        setGenero(data.data.genero);
        setStatus(data.data.status);
        setNota(data.data.nota);
        setPoster(data.data.poster);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    buscar();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-zinc-500 animate-pulse">
        Carregando filme...
      </p>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-10 items-start">
      {/* FORM */}
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-yellow-300 tracking-wide">
          Editar Filme
        </h1>

        <form onSubmit={Editar} className="space-y-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-400">Nome</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-400">Gênero</label>
            <input
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-400">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400"
            >
              <option value="">Selecione</option>
              <option value="quero_ver">Quero Ver</option>
              <option value="assistido">Assistido</option>
              <option value="dropado">Dropado</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-400">Nota</label>
            <input
              type="number"
              value={nota}
              onChange={(e) => setNota(Number(e.target.value))}
              className="bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-400">URL do Poster</label>
            <input
              value={poster}
              onChange={(e) => setPoster(e.target.value)}
              className="bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2 rounded-full bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition shadow-lg shadow-yellow-500/20"
          >
            Salvar Alterações
          </button>
        </form>
      </div>

      {/* PREVIEW */}
      <div className="flex justify-center">
        <div className="w-64 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shadow-lg">
          {poster ? (
            <img
              src={poster}
              alt="preview"
              className="w-full h-96 object-cover"
            />
          ) : (
            <div className="w-full h-96 flex items-center justify-center text-zinc-600 text-sm">
              Sem imagem
            </div>
          )}

          <div className="p-3 space-y-1">
            <h3 className="text-white text-sm font-medium">
              {nome || "Nome do filme"}
            </h3>
            <p className="text-xs text-zinc-400">{genero || "Gênero"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPage;
