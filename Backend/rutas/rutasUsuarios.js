const express = require('express');
const router = express.Router();
const { registrarUsuario }= require('../controladores/controladoresUsuarios');

router.post('/registrar/usuario', registrarUsuario);

module.exports = router;



