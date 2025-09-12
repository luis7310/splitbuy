const express = require('express');
const router = express.Router();
const { registrarUsuario, logginUsuario, updatePasswordUsuario, restablecerContra } = require('../controladores/controladoresUsuarios');

//registrar un nuevo usuario
router.post('/registrar/usuario', registrarUsuario);
//validar credenciales de inicio de sesion
router.post('/loggin/usuario', logginUsuario);
//cambiar contraseña usuario
router.post('/update/userpassword', updatePasswordUsuario);
//restablecer contraseña
router.get('/restablecer/password', restablecerContra);

module.exports = router;



