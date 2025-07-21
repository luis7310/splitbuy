import {jwtDecode} from "jwt-decode";
import AuthVal from "../../auth/authVal";

    //funcion para eliminar el token y cerrar sesion
    export const cerrarSesion = ()=>{
        sessionStorage.removeItem("tokenSplitbuy");
        window.location.reload();
    }

    //funcion para ir a pagina de inicio y recargar
    export const goHome = ()=>{
        navigate("/home");
        window.location.reload();
    }

        //funcion para obtener la data del usuario
    export const getToken = ()=>{
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

    export function ValidarCorreos(correo){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(correo);
    }
    