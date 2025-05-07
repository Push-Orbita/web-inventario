import axios from "axios"
import { toast } from "react-hot-toast"

export const Axios = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}`,
})

export const AuthAxios = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL_AUTH}`,
})

export const cancelTokenSource = axios.CancelToken.source()

export const authorize = async (access_token: string) => {
    Axios.defaults.headers.common["Authorization"] = "Bearer " + access_token
    AuthAxios.defaults.headers.common["Authorization"] =
        "Bearer " + access_token
    return { Axios, AuthAxios }
}

const errorInterceptor = (error: any) => {
    if (error.response) {
        const { status, data } = error.response

        // Manejo de errores comunes
        switch (status) {
            case 401:
                toast.error("No autorizado. Por favor, inicia sesión.")
                break
            case 403:
                toast.error("Acceso denegado.")
                break
            case 404:
                toast.error("Recurso no encontrado.")
                break
            case 500:
                toast.error("Error en el servidor. Inténtalo más tarde.")
                break
            default:
                toast.error(data?.message || "Ocurrió un error inesperado.")
        }
    } else {
        toast.error("Error de conexión con el servidor.")
    }

    return Promise.reject(error)
}

Axios.interceptors.response.use(response => response, errorInterceptor)

AuthAxios.interceptors.response.use(response => response, errorInterceptor)