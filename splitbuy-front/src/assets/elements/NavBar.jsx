import '../estilos/NavBar.css'

export default function NavBar(){
    const cerrarSesion = ()=>{
        sessionStorage.removeItem("tokenSplitbuy");
        window.location.reload();
    }

    return(
       <nav id='navContainer'>
            <h1 className='tittle'>SplitBuy</h1>
            <button onClick={cerrarSesion}>Cerrar sesión</button>
       </nav>
    )
}