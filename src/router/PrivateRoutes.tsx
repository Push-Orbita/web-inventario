import React from "react";
import { Navigate } from "react-router-dom";


interface Props {
    children: React.ReactElement, // ReactElement es específicamente un elemento de React creado con JSX o React.createElement.
    isAuthenticated: boolean
}

export const PrivateRoutes = React.memo(({ children, isAuthenticated }: Props) => {
    return isAuthenticated 
        ? children // si el usuario está autenticado muestra el contenido privado que recibe children
        : <Navigate to="/login" /> // si no, lo redirige a la ruta /login
})