const connection = require('../config/dbConfig'); //importamos conexion con bd


function registrarGrupo(req, res){
    if(!req.body.nombre || !req.body.descripcion || !req.body.id_user){
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }
    else{
        const sqlCode = `INSERT INTO grupos (nombre_grupo, descripcion_grupo, id_usuario_creador) VALUES ('${req.body.nombre}', '${req.body.descripcion}', '${req.body.id_user}')`;
        connection.query(sqlCode,(err, results, fields)=>{
            if(err){
                return res.status(500).json({ mensaje: 'Error de servidor' });
            }
            else{
                const idGrupoCreado = results.insertId;
                let resp = agregarUsuariosGp(req.body.id_user, idGrupoCreado) //Agregamos al usuario creador al grupo
                if(resp = 1){
                    res.status(201).json({ mensaje: 'Grupo agregado'});
                }
                else{
                    return res.status(500).json({ mensaje: 'Error de servidor' });
                }
            }
        })
    }
}

//agregar usuarios a grupos
function agregarUsuariosGp(idUser, idGrupo){
    if(!idUser || !idGrupo){
        return 0;
    }else{
        const sqlCode = `INSERT INTO pertenecen (id_usuario, id_grupo) VALUES ('${idUser}', '${idGrupo}')`;
        connection.query(sqlCode,(err, results, fields)=>{
            if(err){
                return 0;
            }
            else{
                return 1;
            }
        })
    }
}

function gruposUsuario(req, res){
    if(req.body.id_user){
        var sqlConsulta = 'SELECT * FROM grupos JOIN pertenecen ON pertenecen.id_grupo = grupos.id_grupos WHERE pertenecen.id_usuario = ' + req.body.id_user + ';';
         connection.query(sqlConsulta,(err, results, fields)=>{
            if(err){
                return res.status(500).json({ mensaje: 'Error de servidor' });
            }
            else{
                return res.status(200).json(results);
            }
         })
    }
    else{
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }
}

module.exports = {
  registrarGrupo, gruposUsuario
};