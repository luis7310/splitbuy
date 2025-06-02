import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";

export default function ProtectedRoute(){
    const [isAuth, setIsAuth] = useState(false);

    return isAuth ? <Outlet /> : <Navigate to= "/" />
}