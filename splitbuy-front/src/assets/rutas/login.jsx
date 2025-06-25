import '../estilos/login.css'
import {useForm} from 'react-hook-form'
import { useState } from 'react';
import saveToken from '../../auth/tokenSave';
import { useNavigate } from "react-router-dom";

function Log() {
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
  const [mensajeLog, setMensajeLog] = useState('');
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  const loginBtn = handleSubmit(async (data)=>{
    setMensajeLog('');
    if(data.correo == ''){
      setMensajeLog('Ingrese su correo electrónico.');
    }
    else{
      if(!regexCorreo.test(data.correo)){
        setMensajeLog('El correo ingresado no es valido.');
      }
      else{
        if(data.password == ''){
          setMensajeLog('Ingrese su contraseña.');
        }
        else{
          try{
                      const respuesta = await fetch('http://localhost:3000/usuarios/loggin/usuario', {
            method: 'POST',
            headers: {
             'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          let res = await respuesta.json();
          const status = saveToken(res.token);
          if(status == true){
            navigate("/home");
          }
          else{
            setMensajeLog('Usuario o contraseña incorrectos');
            setTimeout(() => {
              setMensajeLog('');
              }, 5000);
          }
          reset();
          }
          catch{
            setMensajeLog('No se puede iniciar sesión');
            setTimeout(() => {
              setMensajeLog('');
              }, 5000);
              reset();
          }
        }
      }
    }
  })

  return (
    <div id="container">
      <form>
        <input placeholder='Correo' {...register("correo")} type="text" className='inputs-login'></input>
        <input placeholder='Contraseña' {...register("password")} type="password" className='inputs-login'></input>
        <button type='submit' className='btn-login' onClick={loginBtn}>Iniciar sesión</button>
        <div className='msg-text-log'>{mensajeLog}</div>
        <a href='/singin'><button type='button' className='btn-login'>Crear una cuenta</button></a>
        <a className='reset-pswd' href='#'>¿Olvidó su contraseña?</a>
      </form>
    </div>
  )
}

export default Log