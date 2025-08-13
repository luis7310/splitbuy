import '../estilos/gastoWindows.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import AuthVal from '../../auth/authVal'
import {jwtDecode} from "jwt-decode";
import { ValidarCorreos, cerrarSesion, getToken} from '../controladores/appControllers';

export default function GastoWindows({idGrupo, nombreGrupo, descripcionGrupo, fechaCreado}){
    const [agregarGastoM, setAgregarG] = useState(false);
    const [agregarUsuarioM, setAgregarU] = useState(false);
    const navigate = useNavigate();
    const [leftGp, setLeftGp] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [datosFormularios, setDatosForm] = useState({
        nombre_gasto: '',
        monto_gasto: '',
        fecha_gasto: '',
        correo_usuario: ''
    });
    const [gastos, setGastos] = useState([]);
    const [total, setTotal] = useState(0);
    const [balanceUsuario, setBalance] = useState({
        balance: 0,
        gastoUsuario: 0,
        gastoTotal:0,
        miembros: 0
    })

    const manejarCambio = (e) => {
       const { name, value } = e.target;
       setDatosForm({
       ...datosFormularios,
        [name]: value
        });
    };

    function addGasto(){
        if(datosFormularios.nombre_gasto == ''){
            setMensaje('Ingrese un nombre de gasto.');
            setTimeout(() => {
                setMensaje('');
            }, 2000);
        }
        else{
            if(datosFormularios.monto_gasto == ''){
                setMensaje('Ingrese un monto de gasto.');
                setTimeout(() => {
                    setMensaje('');
                }, 2000);
            }
            else{
                if(datosFormularios.fecha_gasto == ''){
                    setMensaje('Seleccione una fecha de gasto.');
                        setTimeout(() => {
                            setMensaje('');
                    }, 2000);
                }
                else{
                    var userDatos = getToken();
                    fetch('http://localhost:3000/grupos/agregar/gasto', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "nombre_gasto": datosFormularios.nombre_gasto,
                            "monto_gasto": datosFormularios.monto_gasto,
                            "fecha_gasto": datosFormularios.fecha_gasto,
                            "id_grupo": idGrupo,
                            "id_usuario": userDatos.id
                        })
                    })
                    .then(response => response.json())
                    .then(resp => {
                        setMensaje('Gasto agregado.');
                            setTimeout(() => {
                                setMensaje('');
                            }, 2000);
                        setAgregarG(false);
                        setInfo();
                    })
                    .catch(error =>{
                        setMensaje('Algo ha salido mal, intente mas tarde.');
                            setTimeout(() => {
                                setMensaje('');
                            }, 2000);
                    })
                }
            }
        }
    }

    //funcion para busar gastos del grupo
    async function gastosGrupo(id_grupo){
        return fetch('http://localhost:3000/grupos/gastos/grupo',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({"id_grupo": id_grupo}),
        }).then(response => response.json())
        .then(respuesta => {
            return respuesta;
        })
        .catch(error => {
        return [];
    });
    }

    //funcion para salie del grupo
    function leftGroup(){
        var idUser = getToken();
        var data = {
            "idUser": idUser.id,
            "idGrupo": idGrupo
        }
        fetch('http://localhost:3000/grupos/abandonar/grupo',{
            method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
        })
        .then((response)=>{
            navigate('/')
            window.location.reload();
        });
    }

    //funcion agregar usuario a un grupo
    function addUserGroup(){
        if(!datosFormularios.correo_usuario){
        setMensaje('Ingrese un correo.');
            setTimeout(() => {
                setMensaje('');
        }, 2000);
        }
        else{
            var valC = ValidarCorreos(datosFormularios.correo_usuario);
            if(valC == true){
                var dataNewUser = {
                    "correo_usuario": datosFormularios.correo_usuario,
                    "id_grupo": idGrupo
                }
                fetch('http://localhost:3000/grupos/agregar/nuevo/usuario',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataNewUser),
                })
                .then(response => {
                    if(response.status == 404){
                        setMensaje("El usuario no existe");
                        setTimeout(() => {
                                setMensaje('');
                        }, 2000);
                    }
                        return response.json();
                    })
                .then(response2 =>{
                    setMensaje(response2.mensaje);
                    setTimeout(() => {
                            setMensaje('');
                            setAgregarU(false);
                    }, 2000);
                    
                })
                .catch(error =>{
                    setMensaje('Falló al agregar al usuario.');
                        setTimeout(() => {
                            setMensaje('');
                    }, 2000);
                })
            }
            else{
                setMensaje('Ingrese un correo valido.');
                    setTimeout(() => {
                        setMensaje('');
                }, 2000);
            }
        }
    }

    //calcular el total gastado por el grupo
    const calTotal = (cantidad)=>{
        var total = 0;
        cantidad.map((item, index)=>{
            total += item.monto_gasto;
        })
        setTotal(total);
    }

    //calcular el balance
    const balance = async (id_g)=>{
        var dataUser = getToken();
        var info = {
            id_grupo: id_g,
            id_usuario: dataUser.id
        }
        return fetch('http://localhost:3000/grupos/gastos/datos/usuario',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
            })
            .then(response => response.json())
            .then(res =>{
                return res;
            })
            .catch(error => 0)

    }


    //actualizar info de la lista
    async function setInfo() {
        var datosGasto = await gastosGrupo(idGrupo);
        var balanceDatos = await balance(idGrupo);
        if(balanceDatos != 0){
            setBalance({
                balance: balanceDatos.balance,
                gastoUsuario: balanceDatos.montoUsuario,
                gastoTotal: balanceDatos.gastoTotal,
                miembros: balanceDatos.miembrosGrupo
            })
        }
        setGastos(datosGasto);
        calTotal(datosGasto);
    }

    //funciones a ejecutarse on load
        useEffect(() => {
          setInfo();
        }, []);

    return(
        <div id="container-windows">
            <div id="windows-data">
                <h1>{nombreGrupo}</h1>
                <p>{descripcionGrupo}</p>
                <p>Creado el: {fechaCreado.slice(0, 10)}</p>
                <button className='btn_window' onClick={() => {setAgregarG(true); setAgregarU(false);}}>Agregar gasto</button>
                <button className='btn_window' onClick={() => {setAgregarU(true); setAgregarG(false);}}>Agregar miembro</button>
                <button className='btn_window' onClick={()=> navigate("/")}>Inicio</button>
                <button className='btn_window' onClick={()=> setInfo()}>Actualizar</button>
                
                {agregarGastoM && (
                    <div className='containerModal' id="AgregarGasto">
                        <label>Nombre del gasto</label>
                        <input className="input_window" id="nombre_gasto" name='nombre_gasto' onChange={manejarCambio}></input>
                        <label>Monto</label>
                        <input className="input_window" type='number' id="monto_gasto" name='monto_gasto' onChange={manejarCambio}></input>
                        <label>Fecha del gasto</label>
                        <input className="input_window" type='date' id="fecha_gasto" name='fecha_gasto' onChange={manejarCambio}></input>
                        <div className="msj-error">{mensaje}</div>
                        <div className='btn-container-window'>
                            <button className='btn-modal-windows' onClick={addGasto} >Aceptar</button>
                            <button className='btn-modal-windows' onClick={() => setAgregarG(false)} >Cancelar</button>
                        </div>
                    </div>
                )
                }
                {agregarUsuarioM && (
                    <div className='containerModal' id="AgregarUsuario">
                        <label>Correo de usuario</label>
                        <input className="input_window" type='mail' id="correo_usuario" name='correo_usuario' onChange={manejarCambio}></input>
                        <div className="msj-error">{mensaje}</div>
                        <div className='btn-container-window'>
                            <button className='btn-modal-windows' onClick={addUserGroup}>Aceptar</button>
                            <button className='btn-modal-windows' onClick={() => setAgregarU(false)} >Cancelar</button>
                        </div>
                    </div>
                    )
                }
                <div id="tablaGastos">
                    <table className='tabla'>
                        <thead>
                            <tr className='encabezado-table'>
                                <th>Gasto</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                                <th>Usuario</th>
                            </tr>
                        </thead>
                        <tbody>
                           {Array.isArray(gastos) && gastos.map((item, index) => {
                                return (
                                    <tr className='element-table' key={index}>
                                        <th>{item.nombre_gasto}</th>
                                        <th>${item.monto_gasto}</th>
                                        <th>{item.fecha_gasto?.slice(0, 10)}</th>
                                        <th>{item.nombre_usuario}</th>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3 className='montos'>Total: ${total} <br></br>Gasto usuario: ${balanceUsuario.gastoUsuario}<br></br> Balance: {balanceUsuario.balance}</h3>                 
                    <p>Miembros del grupo: {balanceUsuario.miembros}</p>
                </div>
                <div className='btn-left-gp'>
                    <button id='btn-left-gp' onClick={()=>setLeftGp(true)} >Abandonar grupo</button>
                </div>
                {leftGp &&(
                    <div className='btn-left-gp'>
                        <p>¿Estas seguro que deseas abandonar el grupo?</p>
                        <button className='btn_window' onClick={leftGroup}>Aceptar</button>
                        <button className='btn_window' onClick={()=>setLeftGp(false)}>Cancelar</button>
                    </div>
                )}
            </div>
        </div>
    )
}