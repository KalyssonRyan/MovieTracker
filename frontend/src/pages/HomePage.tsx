import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h1>Pagina Principal</h1>
      <Link to={"/movies"}>Ver Lista de Filmes</Link>
      <Link to={"/create"}>Adicionar Filme</Link>
      <Link to={"/search"}>Busque o filme</Link>
    </>
  );
}
export default HomePage;
