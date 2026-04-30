require("dotenv").config();
const express = require("express");
const router = express.Router();
const { client } = require("../config/database");

router.get("/movies", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM movies");
    return res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    console.log("Ocorreu um erro", err);
    return res.status(500).json({
      error: err,
    });
  }
});

router.get("/movies/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await client.query("SELECT * FROM movies WHERE id=$1", [id]);

    if (result.rowCount == 0) {
      return res.status(404).json({
        error: "esse ID não foi encontrado",
      });
    }
    return res.status(200).json({
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Erro Interno,cheque os logs",
    });
  }
});

router.post("/movies", async (req, res) => {
  try {
    const { nome, genero, status, nota, poster } = req.body;

    const result = await client.query(
      "INSERT INTO movies(nome,genero,status,nota,poster) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [nome, genero, status, nota, poster],
    );
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Erro interno cheque os logs",
    });
  }
});

router.delete("/movies/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await client.query("DELETE FROM movies WHERE id=$1", [id]);

    if (result.rowCount == 0) {
      return res.status(400).json({
        error: "Filme não encontrado",
      });
    }
    return res.status(200).json({
      message: "Filme deletado com sucesso!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Ocorreu um erro interno, cheque os logs",
    });
  }
});

router.put("/movies/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nome, genero, status, nota, poster } = req.body;
    // não esqueça o where pfvr
    const result = await client.query(
      "UPDATE movies SET nome=$1,genero=$2,status=$3,nota=$4,poster=$5 WHERE id=$6 RETURNING *",
      [nome, genero, status, nota, poster, id],
    );
    if (result.rowCount == 0) {
      return res.status(400).json({
        error: "Id não encontrado",
      });
    }
    return res.status(200).json(result.rows[[0]]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Ocorreu um erro interno, cheque os logs",
    });
  }
});
router.get("/search", async (req, res) => {
  try {
    const { pesquisa } = req.query;
    const resposta = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.MOVIE_API}&t=${pesquisa}`,
    );
    const data = await resposta.json();
    console.log(data);
    return res.status(200).json(data);
  } catch (err) {
    console.log("deu ruim: ", err);
    return res.status(500).json({
      error: "Erro Interno,cheque os logs",
    });
  }
});
module.exports = router;
