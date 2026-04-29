const express = require('express');
const router = express.Router();
const {client} = require('../config/database')

router.get('/movies', async (req, res) => {
  try{
    const result = await client.query("SELECT * FROM movies")
    return res.status(200).json({
      data: result.rows
    })
  }catch(err){
    console.log("Ocorreu um erro",err)
    return res.status(500).json({
      error: err
    })
  }
});

module.exports = router;