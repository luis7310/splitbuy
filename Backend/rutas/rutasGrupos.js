const express = require('express');
const rutasGrupos = express.Router();
const {registrarGrupo, gruposUsuario} = require('../controladores/controladoresGrupos');

rutasGrupos.post('/crear/grupo',registrarGrupo);
rutasGrupos.post('/pertenece/usuario', gruposUsuario);

module.exports = rutasGrupos;