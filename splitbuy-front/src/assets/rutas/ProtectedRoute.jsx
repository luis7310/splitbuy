import {Outlet, Navigate} from "react-router-dom";
import {useState} from "react";


export default function ProtectedRoute(){
    const [auth, setAuth] = useState(false);

    return auth ? <Outlet /> : <Navigate to='/login' />;
}