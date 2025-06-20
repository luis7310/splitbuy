import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthVal from "../../auth/authVal";

export default function ProtectedRoute() {
  const [auth, setAuth] = useState(null); // null mientras carga

  useEffect(() => {
    const token = sessionStorage.getItem("tokenSplitbuy");
    const isValid = AuthVal(token);
    setAuth(isValid.estado);
  }, []);

  if (auth === null) {
    // Mostrar un loader opcional mientras se valida el token
    return <div>Cargando...</div>;
  }

  return auth ? <Outlet /> : <Navigate to="/login" />;
}