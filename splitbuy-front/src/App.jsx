import '../src/assets/estilos/app.css';
import NavBar from './assets/elements/NavBar';
import ItemGasto from './assets/elements/gastosItem';
import AuthVal from './auth/authVal';
import { useEffect } from 'react';
import {jwtDecode} from "jwt-decode";
import { useState } from 'react';
import GastoWindows from '../src/assets/elements/gastoWindows';

function App() {
  const [userData, setData] = useState([]);
  const [dataWindow, setWindow] = useState(false);
  const [idGroupModal, setIdModal] = useState([]);

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
            funClick={()=>{console.log("hi")}}
            ></ItemGasto>
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
