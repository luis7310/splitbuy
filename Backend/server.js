require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const rutasUsuarios = require('./rutas/rutasUsuarios');

//configuracion
const app = express();
const port = process.env.port;

//middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // permite peticiones desde tu frontend
  credentials: true,               // si usas cookies o headers personalizados
}));

//rutas
app.use('/usuarios', rutasUsuarios); //rutas funciones usuarios

//server
app.listen(port,()=>{
    console.log("server running on poart " + port);
})
