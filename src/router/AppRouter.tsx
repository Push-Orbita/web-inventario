import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { RouterJs } from "./RouterJs";
import AuthLogin from "../pages/auth/AuthLogin";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes isAuthenticated={true}>
              <AuthLogin />
            </PublicRoutes>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoutes isAuthenticated={true}>
              <RouterJs />
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
}

// de momento, dejamos la autenticacion en true, hasta que configuremos el redux.