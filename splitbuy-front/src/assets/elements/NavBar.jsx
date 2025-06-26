import '../estilos/NavBar.css'

export default function NavBar(){
    const cerrarSesion = ()=>{
        sessionStorage.removeItem("tokenSplitbuy");
        window.location.reload();
    }

    return(
       <nav id='navContainer'>
            <div id="nav-left">
                <button className='btn-design'>SplitBuy</button>
                <button className='btn-design'>Inicio</button>
                <button className='btn-design'>Agregar grupo</button>
            </div>
            <div id='nav-center'>
                <input placeholder='Buscar gasto' id="input-search" type='text'></input>
                <button className='btn-design'>Buscar</button>
            </div>
            <div id="nav-right">
                <select>
                    <option disabled selected>Perfil</option>
                    <option value="ver">Actualizar contraseña</option>
                    <option value="crear">Configración</option>
                    <option value="crear" onSelect={cerrarSesion}>Cerrar sesión</option>
                </select>
            </div>
            <button id="menu-btn">=</button>
       </nav>
    )
}