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
  const [filmeSelecionado, setFilmeSelecionado] = useState<OmdbResult | null>();
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("");
  const [nota, setNota] = useState(0);
  const [resultado, setResultado] = useState<OmdbResult[]>([]);
  const navigate = useNavigate();
  async function enviar(event: React.FormEvent) {
    event.preventDefault();
    await fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: filmeSelecionado?.Title,
        genero: filmeSelecionado?.Type,
        status: status,
        nota: nota,
        poster: filmeSelecionado?.Poster,
      }),
    });
    setStatus("");
    setNota(0);
    navigate("/");
  }
  useEffect(() => {
    async function Buscar() {
      const timer = setTimeout(async () => {
        if (!busca) {
          return;
        }
        const result = await fetch(
          `http://localhost:3000/search/?pesquisa=${busca}`,
        );
        const data = await result.json();
        console.log(data);
        setResultado(data.Search ?? []);
      }, 5000);
      return () => clearTimeout(timer);
    }
    Buscar();
  }, [busca]);
  return (
    <>
      <form action="">
        <label htmlFor="">Digite a sua busca</label>
        <input type="text" onChange={(e) => setBusca(e.target.value)} />
      </form>

      {resultado.map((resultado) => (
        <div key={resultado.imdbID}>
          <h1>{resultado.Title}</h1>
          <img src={resultado.Poster} alt="" />
          <h3>{resultado.Year}</h3>
          <button
            onClick={() => {
              setFilmeSelecionado(resultado);
              setModalAberto(true);
            }}
          >
            Adicionar
          </button>
        </div>
      ))}
      {filmeSelecionado && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              background: "black",
              margin: "100px auto",
              padding: "20px",
              width: "400px",
            }}
          >
            <h2>{filmeSelecionado.Title}</h2>
            <img src={filmeSelecionado.Poster} alt="" width={100} />

            <form action="" onSubmit={enviar}>
              <div>
                <label>Status</label>
                <select onChange={(e) => setStatus(e.target.value)}>
                  <option value="assistido">Assistido</option>
                  <option value="quero_ver">Quero assistir</option>
                  <option value="dropado">dropado</option>
                </select>
              </div>

              <div>
                <label>Nota</label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  onChange={(e) => setNota(Number(e.target.value))}
                />
              </div>

              <button type="button" onClick={() => setFilmeSelecionado(null)}>
                Cancelar
              </button>
              <button type="submit">Salvar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
export default SearchPage;
