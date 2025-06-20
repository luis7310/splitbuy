import {jwtDecode} from "jwt-decode";

//funcion para validar si esta activo el token
export default function AuthVal(token){
  try {
    let authData;
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
     if(decoded.exp > currentTime){
        authData = {
          token: token,
          estado: true
        }
     }
     else{
         authData = {
          token: false,
          estado: false
        }
     }
     return authData;
  } catch (error) {
      let authData = {
            token: false,
            estado: false
        }
    return authData; 
  }
}

