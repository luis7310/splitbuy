const express = require('express');
const rutasGrupos = express.Router();
const {registrarGrupo, gruposUsuario, agregarGasto} = require('../controladores/controladoresGrupos');

rutasGrupos.post('/crear/grupo',registrarGrupo);
rutasGrupos.post('/pertenece/usuario', gruposUsuario);
rutasGrupos.post('/agregar/gasto', agregarGasto);

module.exports = rutasGrupos;