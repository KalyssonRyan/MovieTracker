import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPage() {
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [status, setStatus] = useState("");
  const [nota, setNota] = useState(0);
  const [poster, setPoster] = useState("");
  const navigate = useNavigate();
  async function Editar(event: React.FormEvent) {
    event.preventDefault();
    await fetch(`http://localhost:3000/movies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, genero, status, nota, poster }),
    });
    setGenero("");
    setNome("");
    setStatus("");
    setNota(0);
    setPoster("");
    navigate("/");
  }
  useEffect(() => {
    async function buscar() {
      const result = await fetch(`http://localhost:3000/movies/${id}`);
      const data = await result.json();
      setNome(data.data.nome);
      setGenero(data.data.genero);
      setStatus(data.data.status);
      setNota(data.data.nota);
      setPoster(data.data.poster);
    }
    buscar();
  }, [id]);
  return (
    <>
      <form action="" onSubmit={Editar}>
        <label htmlFor="">Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <label htmlFor="">Genero</label>
        <input
          type="text"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
        <label htmlFor="">Status</label>
        <select
          name=""
          id=""
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Selecione uma opção</option>
          <option value="quero_ver">Quero Ver</option>
          <option value="assistido">Assistido</option>
          <option value="dropado">Dropado</option>
        </select>
        <label htmlFor="">Nota</label>
        <input
          type="number"
          value={nota}
          onChange={(e) => setNota(Number(e.target.value))}
        />
        <label htmlFor="">Imagem</label>
        <input
          type="text"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}
export default EditPage;
