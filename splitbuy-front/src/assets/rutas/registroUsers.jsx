import '../estilos/registrarUsers.css'
import {useForm} from 'react-hook-form'
import { useState } from 'react';

function RegistrarUsers() {
  const {register, handleSubmit, formState: {errors}} = useForm(); 
  const [mensaje, setMensaje] = useState('');
 
  const onSub = handleSubmit((data)=>{
    setMensaje('');
    if(data.nombre == ''){
      setMensaje('Ingrese un nombre de usuario.');
    }
    else{
      if(data.correo == ''){
        setMensaje('Ingrese un correo.');
      }
      else{
        if(data.password == '' || data.password.length < 5){
          setMensaje('Ingrese una contraseña mayor a 5 caracteres.');
        }
        else{
          if(data.password2 == ''){
            setMensaje('Confirme la contraseña.');
          }
          else{
            if(data.password != data.password2){
              setMensaje('Las contraseñas no coinciden, intente de nuevo.');
            }
            else{
              if(data.telefono == ''){
                 setMensaje('Ingrese su número telefónico.');
              }
            }
          }
        }
      }
    }
  })

  return (
    <div className='form-container'>
      <form className='form-style' onSubmit={onSub}>
        <input id="user_name" type='text' {...register("nombre")} className='input-form' placeholder='Nombre'></input>       
        <input className='input-form' type='mail'  {...register("correo")} placeholder='Correo'></input>       
        <input className='input-form' type='password'  {...register("password")} placeholder='Contraseña'></input>       
        <input className='input-form' type='password'  {...register("password2")} placeholder='Confirmar contraseña'></input>       
        <input className='input-form' type='number'  {...register("telefono")} placeholder='Telefono'></input>
        <button className='btn-form'>Registrar</button>
        <div className='msg-text msg-text_error'>{mensaje}</div>
      </form>
    </div>
  )
}

export default RegistrarUsers
