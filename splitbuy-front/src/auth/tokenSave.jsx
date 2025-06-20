import AuthVal from "./authVal";
import ProtectedRoute from "../assets/rutas/ProtectedRoute";

export default function saveToken(newToken){
    const token = AuthVal(newToken);
    if(token.estado == true){
        sessionStorage.setItem("tokenSplitbuy", newToken);
        return true;
    }
    else{
        return false;
    }
}