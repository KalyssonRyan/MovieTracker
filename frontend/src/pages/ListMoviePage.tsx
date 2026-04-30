import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Movies = {
  id: string;
  nome: string;
  genero: string;
  status: string;
  nota: Number;
  poster: string;
};

function ListMoviePage() {
  const [carregando, setCarregando] = useState(true);
  async function deletar(id: string) {
    const confirmado = window.confirm("Deseja deletar mesmo?");
    if (confirmado) {
      await fetch(`http://localhost:3000/movies/${id}`, {
        method: "DELETE",
      });
      setMovies(movies.filter((u) => u.id !== id));
    }
  }
  const [movies, setMovies] = useState<Movies[]>([]);
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
    <>
      <h1>aqui vai a lista de filmes</h1>
      {carregando && (
        <div>
          <p>Carregando...</p>
        </div>
      )}
      {movies.length == 0 && <h1>Nao tem filme ainda</h1>}
      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.nome}</h3>
          <p>{movie.genero}</p>
          <img src={movie.poster} alt="" />
          <Link to={`/edit/${movie.id}`}>Editar</Link>
          <button onClick={() => deletar(movie.id)}>Excluir</button>
        </div>
      ))}
    </>
  );
}
export default ListMoviePage;
