const express = require("express")
const cors = require("cors")
const app = express()
const routes = require('./routes');
const {client,ConnectDb} = require('./config/database');
ConnectDb()
app.use(express.json()) 
app.use(cors())        
app.use(routes)

app.listen(3000, () => console.log("Rodando em http://localhost:3000"))