const connection = require('../config/dbConfig'); //importamos conexion con bd


function registrarGrupo(req, res){
    if(!req.body.nombre || !req.body.descripcion || !req.body.id_user){
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }
    else{
        const sqlCode = `INSERT INTO grupos (nombre_grupo, descripcion_grupo, id_usuario_creador) VALUES ('${req.body.nombre}', '${req.body.descripcion}', '${req.body.id_user}')`;
        connection.query(sqlCode,async (err, results, fields)=>{
            if(err){
                return res.status(500).json({ mensaje: 'Error de servidor' });
            }
            else{
                const idGrupoCreado = results.insertId;
                var resp;
                try{
                     resp = await agregarUsuariosGp(req.body.id_user, idGrupoCreado) //Agregamos al usuario creador al grupo
                }
                catch{
                     resp = 0;
                }
                
                if(resp == 1){
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
    return new Promise((resolve, reject)=>{
        if(!idUser || !idGrupo){
        reject(0);
    }else{
        const sqlCode = `INSERT INTO pertenecen (id_usuario, id_grupo) VALUES ('${idUser}', '${idGrupo}')`;
        connection.query(sqlCode,(err, results, fields)=>{
            if(err){
                if(err.errno == 1062){
                    reject(3);
                }
                reject(0);
            }
            else{
                resolve(1);
            }
        })
    }
})
}



//controlador seleccionar todos los grupos a los que pertenece el usuario
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

// controlador agregar nuevo gasto a grupo
function agregarGasto(req, res){
    if(!req.body.nombre_gasto){
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }
    else{
        if(!req.body.monto_gasto){
            return res.status(400).json({ mensaje: 'Datos incompletos' });
        }
        else{
            if(!req.body.fecha_gasto){
                return res.status(400).json({ mensaje: 'Datos incompletos' });
            }
            else{
                if(!req.body.id_grupo){
                    return res.status(400).json({ mensaje: 'Datos incompletos' });
                }
                else{
                    if(!req.body.id_usuario){
                        return res.status(400).json({ mensaje: 'Datos incompletos' });
                    }
                    else{
                        var consultaSql = `INSERT INTO gastos (nombre_gasto, monto_gasto, fecha_gasto, id_grupo, id_usuario) VALUES ('${req.body.nombre_gasto}',${req.body.monto_gasto},'${req.body.fecha_gasto}',${req.body.id_grupo}, ${req.body.id_usuario});`;
                        connection.query(consultaSql, (error, results)=>{
                            if(error){
                                console.log(error);
                                return res.status(500).json({ mensaje: 'Error de servidor' });
                            }
                            else{
                                res.status(201).json({ mensaje: 'Gasto agregado'});
                            }
                        })
                    }
                }
            }
        }
    }
}

//agregar nuevo usuario a grupo

function agregarUsuarioG(req, res){
    if(!req.body.correo_usuario){
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }
    else{
        if(!req.body.id_grupo){
            return res.status(400).json({ mensaje: 'Datos incompletos' });
        }
        else{
            var consultaSqlUno = `SELECT id_usuario FROM usuarios WHERE correo_usuario = '${req.body.correo_usuario}';`;
            connection.query(consultaSqlUno, async (error, resultado)=>{
                if(error){
                    return res.status(500).json({ mensaje: 'Error de servidor'});
                }
                else{
                    if(resultado.length === 0){
                        return res.status(404).json({ mensaje: 'El usuario no existe.'});
                    }
                    var status;
                    let idUser = resultado[0].id_usuario;
                    try{
                        status = await agregarUsuariosGp(idUser, req.body.id_grupo);
                    }
                    catch (error){
                        status = error;
                    }
                    if(status == 1){
                        res.status(201).json({ mensaje: 'Usuario agregado'});
                    }
                    else{
                        if(status == 3){
                            return res.status(409).json({ mensaje: 'El usuario ya esta agregado'});
                        }
                        return res.status(500).json({ mensaje: 'Error de servidor'});
                    }
                }
            })
            
        }
    }
}

function abandonarGrupo(req, res){
    if(!req.body.idGrupo){
        return res.status(400).json({ mensaje: 'Datos incompletos: id de grupo' });
    }
    else{
        if(!req.body.idUser){
            return res.status(400).json({ mensaje: 'Datos incompletos: id usuario' });
        }
        else{
            var sqlConsult = 'DELETE FROM pertenecen WHERE id_usuario = ' + req.body.idUser + ' AND id_grupo = ' + req.body.idGrupo + ';';
            connection.query(sqlConsult, async (error, resultado)=>{
                if(error){
                    return res.status(500).json({ mensaje: 'Error de servidor' });
                }
                else{
                    return res.status(200).json({ mensaje: 'Usuario eliminado del grupo' });
                }
            });
        }
    }
}

function gastosGrupo(req, res){
    if(!req.body.id_grupo){
        return res.status(400).json({ mensaje: 'Datos incompletos: id grupo' });
    }
    else{
        var consultaSql = `SELECT gastos.*, usuarios.nombre_usuario
                            FROM gastos 
                            INNER JOIN usuarios ON gastos.id_usuario = usuarios.id_usuario
                            WHERE id_grupo = ${req.body.id_grupo};`;
        connection.query(consultaSql, async (error, resultado)=>{
            if(error){
                return res.status(500).json({ mensaje: 'Error de servidor' });
            }
            return res.status(200).json(resultado);
        })
    }
}

function gastoUsuario(req, res){
    if(!req.body.id_grupo){
        return res.status(400).json({ mensaje: 'Datos incompletos: id grupo' });
    }
    else{
        if(!req.body.id_usuario){
            return res.status(400).json({ mensaje: 'Datos incompletos: id usuario' });
        }
        else{
            var montoUsuario = 0;
            var miembrosNumber = 0;
            var gastoTotal = 0;
            var balance = 0;
            var sqlCode = 'SELECT * FROM gastos WHERE id_grupo = ' + req.body.id_grupo + ' AND id_usuario = ' + req.body.id_usuario + ';';
            connection.query(sqlCode, (error, resultado)=>{
                if(error){
                    return res.status(500).json({ mensaje: 'Error de servidor' });
                }
                for(let monto in resultado){
                    montoUsuario += resultado[monto].monto_gasto;
                }
                var codeMG = 'SELECT * FROM pertenecen WHERE id_grupo = ' + req.body.id_grupo + ';';
                connection.query(codeMG, (error, resultado2)=>{
                    if(error){
                        return res.status(500).json({ mensaje: 'Error de servidor' });
                    }
                    miembrosNumber = resultado2.length;
                    var codeTotal = 'SELECT monto_gasto FROM gastos WHERE id_grupo = ' + req.body.id_grupo + ';';
                    connection.query(codeTotal,(error, resultado3)=>{
                        if(error){
                            return res.status(500).json({ mensaje: 'Error de servidor' });
                        }
                        for(let cant in resultado3){
                            gastoTotal += resultado3[cant].monto_gasto;
                        }
                        balance = (gastoTotal/miembrosNumber) - montoUsuario;
                        balance = balance * -1;
                        return res.status(200).json({"montoUsuario": montoUsuario, "miembrosGrupo": miembrosNumber, "gastoTotal": gastoTotal, "balance":balance});
                    })
                })
            })
        }
    }
}

module.exports = {
  registrarGrupo, gruposUsuario, agregarGasto, agregarUsuarioG, abandonarGrupo, gastosGrupo, gastoUsuario
};