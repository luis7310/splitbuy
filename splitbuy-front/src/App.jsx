import '../src/assets/estilos/app.css';
import NavBar from './assets/elements/NavBar';
import ItemGasto from './assets/elements/gastosItem';
import AuthVal from './auth/authVal';
import { useEffect } from 'react';
import {jwtDecode} from "jwt-decode";
import { useState } from 'react';
import GastoWindows from '../src/assets/elements/gastoWindows';
import { useNavigate } from "react-router-dom";

function App() {
  const [userData, setData] = useState([]);
  const [dataWindow, setWindow] = useState(false);
  const [idGroupModal, setIdModal] = useState([]);
  const [itsOpen, setItsOpen] = useState(false);
  const [formData, setFormData] = useState({
        nombregrupo: '',
        descripciongrupo: ''
        });
  const navigate = useNavigate();

  const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        };

  async function crearGrupo(event){
        event.preventDefault()
        if(formData.nombregrupo != ''){
            var datos = getToken();
        var info = {
            "nombre": formData.nombregrupo,
            "descripcion":formData.descripciongrupo,
            "id_user": datos.id
        }
        if(info.descripcion == ''){
            info.descripcion = 'Sin descripcion del grupo.';
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
        else{
            alert("Ingrese un nombre del gasto");
        }
        
    }

    const cerrarSesion = ()=>{
        sessionStorage.removeItem("tokenSplitbuy");
        window.location.reload();
    }

    const goHome = ()=>{
        navigate("/home");
        window.location.reload();
    }

    //funcion para obtener la data del usuario
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


//funcion para obtener todos los gastos compartidos
async function getsItems(){
  var data_user = getToken();
  if(data_user){
    const respuesta = await fetch('http://localhost:3000/grupos/pertenece/usuario', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({id_user: data_user.id}),
          });
          
          var results = await respuesta.json();
          return results;       
  }
}

//funcion para abrir los objetos

    useEffect(() => {
      const setInfo = async ()=>{
        var datos = await getsItems();
        setData(datos);
      }
      setInfo();
      
    }, []);

  return (
    <>
      <NavBar></NavBar>
      <div id="container-middle">
          <aside className="aside">

          </aside>
          {dataWindow && (<GastoWindows
            idGrupo={idGroupModal.id_grupo}
            nombreGrupo = {idGroupModal.nombre_grupo}
            descripcionGrupo = {idGroupModal.descripcion_grupo}
            fechaCreado = {idGroupModal.fecha_creacion_grupo}
           ></GastoWindows>)}
          <main id="main">
            <ItemGasto
            titulo={"Agregar grupo"}
            descripcion={'Cree un nuevo gasto compartido'}
            funClick={() => setItsOpen(true)}
            ></ItemGasto>
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
            {Array.isArray(userData) && userData.map((item, index) => (
            <ItemGasto
              key={item.id_grupo}
              titulo={item.nombre_grupo}
              descripcion={item.descripcion_grupo}
              funClick={()=>{
                setIdModal(item);
                setWindow(true);}}
            />
          ))}
          </main>
          <aside className='aside'>

          </aside>
      </div>
    </>
  )
}

export default App
