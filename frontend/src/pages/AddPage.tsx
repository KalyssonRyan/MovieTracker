import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddPage() {
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [status, setStatus] = useState("");
  const [nota, setNota] = useState(0);
  const [poster, setPoster] = useState("");
  const navigate = useNavigate();
  async function enviar(event: React.FormEvent) {
    event.preventDefault();
    await fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, genero, status, nota, poster }),
    });
    setNome("");
    setGenero("");
    setStatus("");
    setNota(0);
    setPoster("");
    navigate("/");
  }
  return (
    <>
      <h1>Adicione um Filme</h1>
      <form action="" onSubmit={enviar}>
        <label htmlFor="">Nome</label>
        <input type="text" onChange={(e) => setNome(e.target.value)} />
        <label htmlFor="">Genero</label>
        <input type="text" onChange={(e) => setGenero(e.target.value)} />
        <label htmlFor="">Status</label>
        <select name="" id="" onChange={(e) => setStatus(e.target.value)}>
          <option value="">Selecione uma opção</option>
          <option value="quero_ver">Quero Ver</option>
          <option value="assistido">Assistido</option>
          <option value="dropado">Dropado</option>
        </select>
        <label htmlFor="">Nota</label>
        <input
          type="number"
          onChange={(e) => setNota(Number(e.target.value))}
        />
        <label htmlFor="">Imagem</label>
        <input type="text" onChange={(e) => setPoster(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default AddPage;
