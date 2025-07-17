import '../estilos/gastoWindows.css'
import { useState } from 'react';

export default function GastoWindows({idGrupo, nombreGrupo, descripcionGrupo, fechaCreado}){
    const [agregarGastoM, setAgregarG] = useState(false);
    const [agregarUsuarioM, setAgregarU] = useState(false);
    return(
        <div id="container-windows">
            <div id="windows-data">
                <h1>{nombreGrupo}</h1>
                <p>{descripcionGrupo}</p>
                <p>Creado el: {fechaCreado.slice(0, 10)}</p>
                <button className='btn_window' onClick={() => setAgregarG(true)}>Agregar gasto</button>
                <button className='btn_window' onClick={() => setAgregarU(true)}>Agregar miembro</button>
                <button className='btn_window'>Abandonar grupo</button>
                {agregarGastoM && (
                    <div className='containerModal' id="AgregarGasto">
                        <label>Nombre del gasto</label>
                        <input className="input_window" id="nombre_gasto"></input>
                        <label>Monto</label>
                        <input className="input_window" type='number' id="monto_gasto"></input>
                        <label>Fecha del gasto</label>
                        <input className="input_window" type='date' id="fecha_gasto"></input>
                        <div className='btn-container-window'>
                            <button className='btn-modal-windows' >Aceptar</button>
                            <button className='btn-modal-windows' onClick={() => setAgregarG(false)} >Cancelar</button>
                        </div>
                    </div>
                )
                }
                {agregarUsuarioM && (
                    <div className='containerModal' id="AgregarUsuario">
                        <label>Correo de usuario</label>
                        <input className="input_window" type='mail'></input>
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