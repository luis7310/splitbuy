const express = require('express');
const router = express.Router();
const { registrarUsuario, logginUsuario, updatePasswordUsuario } = require('../controladores/controladoresUsuarios');

//registrar un nuevo usuario
router.post('/registrar/usuario', registrarUsuario);
//validar credenciales de inicio de sesion
router.get('/loggin/usuario', logginUsuario);
//cambiar contraseña usuario
router.post('/update/userpassword',updatePasswordUsuario);

module.exports = router;



