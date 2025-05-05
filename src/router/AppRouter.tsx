import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { RouterJs } from "./RouterJs";
import AuthLogin from "@pages/auth/AuthLogin";
import { useAppSelector } from "@hooks/reduxHook";

export const AppRouter = () => {

  const { isLogged } = useAppSelector((state) => state.auth);

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

// de momento, dejamos la autenticacion en true, hasta que configuremos el redux.