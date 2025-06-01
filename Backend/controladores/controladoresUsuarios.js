const connection = require('../config/dbConfig'); //importamos conexion con bd
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.secret;

//funcion para registrar usuarios
async function registrarUsuario(req, res){
    //validacion de datos completos
    if(!req.body.nombre || !req.body.correo || !req.body.password){
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }
    else{
        //generacion de hash de la contraseña del usuario 
        let passNew =  await bcrypt.hash(req.body.password, 10);
        //codigo mysql
        const sql = `INSERT INTO usuarios (nombre_usuario, correo_usuario, contrasena_usuario, telefono_usuario) VALUES ('${req.body.nombre}','${req.body.correo}','${passNew}','${req.body.telefono}')`;
        //peticion a la base de datos
        connection.query(sql,(err, results, fields)=>{
            if(err){
                //si el correo ya esta registrado mandamos el mensaje
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

//funcion para validar las credenciales de inicio de sesion del usuario
async function logginUsuario(req, res){
    //validacion de datos completos
    if(!req.body.correo || !req.body.password){
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }
    else{
        //codigo mysql
        let sqlCode = 'SELECT * FROM usuarios WHERE correo_usuario = ?';
        //peticion a la base de datos
        const [rows] = await connection.promise().query(sqlCode, [req.body.correo]);
        //si no se encuentra el usuario se devuelve el mensaje de no encontrado
        if (!rows[0]) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        else{
            //comparamos la contraseña guardada y la del usuario
            const passwordMatch = await bcrypt.compare(req.body.password, rows[0].contrasena_usuario);
            if (passwordMatch == false){ 
                //si no coinciden se devuelve el mensaje de error
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
            else{
                //si coinciden se regresa el token con los datos
                const token = jwt.sign({ id: rows[0].id_usuario, email: rows[0].correo_usuario }, SECRET, { expiresIn: '1h' });
                res.json({ message: 'Login exitoso', token });
            }
        }
    } 
         
}

//funcion para actualizar la contraseña del usuario
async function updatePasswordUsuario(req, res){
    //validacion de datos completos
    if(!req.body.id || !req.body.correo || !req.body.password || !req.body.newPassword){
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }
    else{
        let sqlCode = 'SELECT * FROM usuarios WHERE id_usuario = ? AND correo_usuario = ?';
        //peticion a la base de datos
        const [rows] = await connection.promise().query(sqlCode, [req.body.id, req.body.correo]);
        //si no se encuentra el usuario se devuelve el mensaje de no encontrado
        if (!rows[0]) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        else{
            //comparamos la contraseña guardada y la del usuario
            const passwordMatch = await bcrypt.compare(req.body.password, rows[0].contrasena_usuario);
            if(passwordMatch == true){
                //creamos hash con la nueva contraseña
                let newPass =  await bcrypt.hash(req.body.newPassword, 10);
                //codigo mysql para actualizar la contraseña
                let codeAct = `UPDATE usuarios SET contrasena_usuario = '${newPass}' WHERE id_usuario = ${req.body.id} AND correo_usuario = '${req.body.correo}'`
                connection.query(codeAct,(err, results, fields)=>{
                    if(err){
                        return res.status(500).json({ mensaje: 'Error de servidor' });
                    }
                    else{
                        res.status(201).json({ mensaje: 'Contraseña actualizada'});
                    }
                })
            }
            else{
                //si no coinciden se devuelve el mensaje de error
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        }
    }
}

module.exports = {
  registrarUsuario, logginUsuario, updatePasswordUsuario
};