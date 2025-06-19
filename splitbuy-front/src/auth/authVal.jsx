import {jwtDecode} from "jwt-decode";

//funcion para validar si esta activo el token
export  default function AuthVal(token){
  try {
    let authData;
    const decoded = jwtDecode(token);
    console.log(decoded);
    const currentTime = Date.now() / 1000;
    console.log(decoded.exp > currentTime)
     if(decoded.exp > currentTime){
      console.log("true")
        authData = {
          token: token,
          estado: true
        }
     }
     else{
      console.log("false")
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

