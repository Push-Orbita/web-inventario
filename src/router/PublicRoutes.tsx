import React from "react";
import { Navigate } from "react-router-dom";

// definimos propiedades que va a recibir PublicRoutes
interface Props {
    children: React.ReactElement, // espera un unico elemento de react como hijo
    isAuthenticated: boolean
}


// usamos la función react.memo para envolver el componente 
// y evitar que se vuelva a renderizar si sus props no cambiaron.
export const PublicRoutes = React.memo(({ children, isAuthenticated }: Props) => {
    return isAuthenticated 
        ? <Navigate to="/home" /> // si el usuario está autenticado se redirige a la ruta /home, ya que no deberia estar en paginas públicas
        : children // si no, mostramos la pagina publica 
});