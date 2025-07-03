import '../estilos/NavBar.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import AuthVal from '../../auth/authVal';
import { useEffect } from 'react';
import {jwtDecode} from "jwt-decode";

export default function NavBar(){
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [itsOpen, setItsOpen] = useState(false);
    const [menuResponsive, setMenuRespo] = useState(false);
    const [formData, setFormData] = useState({
        nombregrupo: '',
        descripciongrupo: ''
        });

    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    };

    useEffect(() => {
      var tok = getToken();
      setToken(tok);
    }, []);
    
    const getToken = ()=>{
        let tkn = sessionStorage.getItem("tokenSplitbuy");
        let ntkn = AuthVal(tkn);
        if(ntkn.estado == true){
            var data = jwtDecode(ntkn.token);
            return data;
        }
        else{
            cerrarSesion();
        }
    }

    async function crearGrupo(event){
        event.preventDefault()
        var datos = getToken();
        var info = {
            "nombre": formData.nombregrupo,
            "descripcion":formData.descripciongrupo,
            "id_user": datos.id
        }
         const respuesta = await fetch('http://localhost:3000/grupos/crear/grupo', {
            method: 'POST',
            headers: {
             'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
          });
          setFormData({
            nombregrupo: '',
            descripciongrupo: ''
          })
          setItsOpen(false);
          goHome();
    }

    const cerrarSesion = ()=>{
        sessionStorage.removeItem("tokenSplitbuy");
        window.location.reload();
    }

    const goHome = ()=>{
        navigate("/home");
        window.location.reload();
    }

    const profileConf = (e)=>{
        switch(e.target.value) {
            case "2":
                console.log("Actualizar contraseña");
                break;
            case "3":
              // Acción para Configuración
                console.log("Configuración");
                break;
            case "4":
                cerrarSesion();
                break;
            default:
                console.log("error");
                break;
              }
    }

    return(
        <>
       <nav id='navContainer'>
            <div id="nav-left">
                <button className='btn-design' onClick={goHome}>SplitBuy</button>
                <button className='btn-design' onClick={goHome}>Inicio</button>
                <button className='btn-design' onClick={() => setItsOpen(true)}>Agregar gasto</button>
            </div>
            <div id='nav-center'>
                <input placeholder='Buscar gasto' id="input-search" type='text'></input>
                <button className='btn-design'>Buscar</button>
            </div>
            <div id="nav-right">
                <select defaultValue={1} onChange={profileConf} id='profile-options'>
                    <option disabled value={1}>{token ? token.nombre : "Perfil"}</option>
                    <option value={2}>Actualizar contraseña</option>
                    <option value={3}>Configuración</option>
                    <option value={4}>Cerrar sesión</option>
                </select>
            </div>
            <button onClick={() => setMenuRespo(!menuResponsive)} id="menu-btn">=</button>
       </nav>
          {itsOpen && (
                <div className="modal-backdrop">
                    <form id="formcontainer">
                        <label htmlFor="nombregrupo">Nombre del gasto</label>
                        <input name="nombregrupo" className='inputs-modal' id="nombregrupo" value={formData.nombregrupo} onChange={handleChange} type="text" />
                        <label htmlFor="descripciongrupo">Descripción</label>
                        <input name="descripciongrupo" className='inputs-modal' id="descripciongrupo"  value={formData.descripciongrupo} onChange={handleChange} type="text" />
                        <div className='modal-buttons'>
                            <button className='btn-modal' type="submit" onClick={crearGrupo}>Crear</button>
                            <button className='btn-modal' type="button" onClick={() => setItsOpen(false)}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}
            {menuResponsive && (
                <div id="menu-responsive">
                    <button onClick={goHome} className='btn-menu-resp'>Reload</button>
                    <button onClick={() => setItsOpen(true)} className='btn-menu-resp'>Agregar Gasto</button>
                    <button className='btn-menu-resp'>Configuracion</button>
                    <button className='btn-menu-resp'>Actualizar contraseña</button>
                    <button onClick={cerrarSesion} className='btn-menu-resp'>Cerrar sesión</button>
                </div>
            )}
       </>
    )
}