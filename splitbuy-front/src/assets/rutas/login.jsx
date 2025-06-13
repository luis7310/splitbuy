import '../estilos/login.css'
import {useForm} from 'react-hook-form'
import { useState } from 'react';

function Log() {
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
  const [mensajeLog, setMensajeLog] = useState('');
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
          console.log(data);
          const respuesta = await fetch('http://localhost:3000/usuarios/loggin/usuario', {
            method: 'POST',
            headers: {
             'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          console.log(respuesta);
          let res = await respuesta.json();
          console.log(res);
          reset();
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
        <button type='button' className='btn-login'>Crear una cuenta</button>
        <a className='reset-pswd' href='#'>¿Olvidó su contraseña?</a>
      </form>
    </div>
  )
}

export default Log