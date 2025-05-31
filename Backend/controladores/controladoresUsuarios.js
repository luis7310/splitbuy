const connection = require('../config/dbConfig'); //importamos conexion con bd

function registrarUsuario(req, res){
    if(!req.body.nombre || !req.body.correo || !req.body.password){
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }
    else{
        const sql = `INSERT INTO usuarios (nombre_usuario, correo_usuario, contrasena_usuario, telefono_usuario) VALUES ('${req.body.nombre}','${req.body.correo}','${req.body.password}','${req.body.telefono}')`;

        connection.query(sql,(err, results, fields)=>{
            if(err){
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ error: 'El correo ya está registrado' });
                }
                return res.status(500).json({ mensaje: 'Error de servidor' });
            }
            else{
                 res.status(201).json({ mensaje: 'Usuario registrado correctamente'});
            }
        })
    }
}

module.exports = {
  registrarUsuario
};