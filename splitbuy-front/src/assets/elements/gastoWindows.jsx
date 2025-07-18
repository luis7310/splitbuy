import '../estilos/gastoWindows.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

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
                    let datos = {
                        
                    }
                }
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
                            <button className='btn-modal-windows' >Aceptar</button>
                            <button className='btn-modal-windows' onClick={() => setAgregarU(false)} >Cancelar</button>
                        </div>
                    </div>
                    )
                }
                

            </div>
        </div>
    )
}