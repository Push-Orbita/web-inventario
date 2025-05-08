import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { RouterJs } from "./RouterJs";
import { authorize } from "@config/api/axios.config";
import { AuthApi } from "@features/auth/service/auth.service";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHook";
import AuthLogin from "@pages/auth/AuthLogin";
import useQueryApi from "@hooks/useQueryApi";
import { setClientToken } from "@redux/slices/auth/authSlice/authSlice";

export const AppRouter = () => {

  const { isLogged, tokenUser } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  // estado para controlar si se debe ejecutar la petición de renovación de token
  const [shouldFetchToken, setShouldFetchToken] = useState(true);

  // función para obtener el token de autenticación
  const getAuthToken = async () => {
    const response = await AuthApi.postAuthSistem({
      clientId: import.meta.env.VITE_APP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_APP_CLIENT_SECRET,
    });

    return response.data;
  }

  const { data: clientTokenData } = useQueryApi<any>(
    "Client-token",
    () => getAuthToken(),
    {
      enabled: shouldFetchToken,
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: (data: any) => {
        if (data && data.accessToken) {
          dispatch(setClientToken(data.accessToken));
          setShouldFetchToken(false);
        } else {
          console.error("Error: La respuesta no contiene accessToken");
        }
      },
      onError: (error) => {
        console.error("Error al obtener el token de cliente:", error);
        setShouldFetchToken(false);
      },
    }
  );

  // activar la obtención del token solo después del deslogueo
  useEffect(() => {
    if (!isLogged) {
      setShouldFetchToken(true); // activa la bandera solo después de desloguear
    }
  }, [isLogged]);

  useEffect(() => {
    if (clientTokenData) {
    }
  }, [clientTokenData]);

  useEffect(() => {
    if (tokenUser) {
      authorize(tokenUser);
    }
  }, [tokenUser]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes isAuthenticated={isLogged}>
              <AuthLogin />
            </PublicRoutes>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoutes isAuthenticated={isLogged}>
              <RouterJs />
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
}