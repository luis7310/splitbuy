const express = require('express');
const rutasGrupos = express.Router();
const {registrarGrupo, gruposUsuario, agregarGasto, agregarUsuarioG, abandonarGrupo, gastosGrupo} = require('../controladores/controladoresGrupos');

rutasGrupos.post('/crear/grupo',registrarGrupo);
rutasGrupos.post('/pertenece/usuario', gruposUsuario);
rutasGrupos.post('/agregar/gasto', agregarGasto);
rutasGrupos.post('/agregar/nuevo/usuario', agregarUsuarioG);
rutasGrupos.post('/abandonar/grupo', abandonarGrupo);
rutasGrupos.post('/gastos/grupo', gastosGrupo);
module.exports = rutasGrupos;