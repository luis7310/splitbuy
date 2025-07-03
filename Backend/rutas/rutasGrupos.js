const express = require('express');
const rutasGrupos = express.Router();
const {registrarGrupo} = require('../controladores/controladoresGrupos');

rutasGrupos.post('/crear/grupo',registrarGrupo);

module.exports = rutasGrupos;