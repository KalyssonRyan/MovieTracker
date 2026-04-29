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

module.exports = router;
