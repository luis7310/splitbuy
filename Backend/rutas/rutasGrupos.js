const express = require('express');
const rutasGrupos = express.Router();
const {registrarGrupo, gruposUsuario, agregarGasto, agregarUsuarioG} = require('../controladores/controladoresGrupos');

rutasGrupos.post('/crear/grupo',registrarGrupo);
rutasGrupos.post('/pertenece/usuario', gruposUsuario);
rutasGrupos.post('/agregar/gasto', agregarGasto);
rutasGrupos.post('/agregar/nuevo/usuario', agregarUsuarioG);

module.exports = rutasGrupos;