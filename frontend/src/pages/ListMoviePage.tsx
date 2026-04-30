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
  const [movies, setMovies] = useState<Movies[]>([]);
  useEffect(() => {
    async function run() {
      try {
        const result = await fetch("http://localhost:3000/movies");
        const data = await result.json();
        setMovies(data.data);
      } catch (err) {
        console.log(err);
      }
    }
    run();
  }, []);
  return (
    <>
      <h1>aqui vai a lista de filmes</h1>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.nome}</h3>
          <p>{movie.genero}</p>
          <img src={movie.poster} alt="" />
          <Link to={`/edit/${movie.id}`}>Editar</Link>
        </div>
      ))}
    </>
  );
}
export default ListMoviePage;
