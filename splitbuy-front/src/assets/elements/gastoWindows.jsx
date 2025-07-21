import '../estilos/gastoWindows.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AuthVal from '../../auth/authVal'
import {jwtDecode} from "jwt-decode";
import { ValidarCorreos, cerrarSesion, getToken } from '../controladores/appControllers';

export default function GastoWindows({idGrupo, nombreGrupo, descripcionGrupo, fechaCreado}){
    const [agregarGastoM, setAgregarG] = useState(false);
    const [agregarUsuarioM, setAgregarU] = useState(false);
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState('');
    const [datosFormularios, setDatosForm] = useState({
        nombre_gasto: '',
        monto_gasto: '',
        fecha_gasto: '',
        correo_usuario: ''
    });

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
                        setAgregarG(false)
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

    return(
        <div id="container-windows">
            <div id="windows-data">
                <h1>{nombreGrupo}</h1>
                <p>{descripcionGrupo}</p>
                <p>Creado el: {fechaCreado.slice(0, 10)}</p>
                <button className='btn_window' onClick={() => {setAgregarG(true); setAgregarU(false);}}>Agregar gasto</button>
                <button className='btn_window' onClick={() => {setAgregarU(true); setAgregarG(false);}}>Agregar miembro</button>
                <button className='btn_window' onClick={()=> navigate("/")}>Inicio</button>
                
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
                

            </div>
        </div>
    )
}