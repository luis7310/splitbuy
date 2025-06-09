import '../estilos/registrarUsers.css'

function RegistrarUsers() {
  return (
    <div className='form-container'>
      <form className='form-style'>
        <input className='input-form' placeholder='Nombre'></input>       
        <input className='input-form' type='mail' placeholder='Correo'></input>       
        <input className='input-form' type='password' placeholder='Contraseña'></input>       
        <input className='input-form' type='password' placeholder='Confirmar contraseña'></input>       
        <input className='input-form' type='number' placeholder='Telefono'></input>
        <button className='btn-form'>Registrar</button>
        <div className='msg-text'></div>
      </form>
    </div>
  )
}

export default RegistrarUsers
