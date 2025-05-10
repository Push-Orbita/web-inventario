import { useAppSelector } from "@hooks/reduxHook";
import { Suspense, ComponentType, lazy, LazyExoticComponent, } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// cargamos el componente solamente cuando sea necesario (cuando el usuario accede a /home).
const AuthLogin = lazy(() => import('../pages/auth/AuthLogin'));
const HomeAdmin = lazy(() => import('../pages/home/Home'));
const ConfiguracionUsuario = lazy(() => import('../pages/usuario/ConfiguracionUsuario'));
const Modelo = lazy(() => import('../pages/gestion-productos/Modelo'));


type ComponentsMap = Record<string, LazyExoticComponent<ComponentType<any>>>;

const componentsMap: ComponentsMap = {
    'AuthLogin': AuthLogin,
    'HomeAdmin': HomeAdmin,
    'ConfiguracionUsuario': ConfiguracionUsuario,
    'Modelo': Modelo,
};

export const RouterJs = () => {

    const { userModulos } = useAppSelector(state => state.auth);
    

    // función para generar las rutas dinámicas
    const renderRoutes = (modulos: any) => {
        return modulos.flatMap((modulo: any) => {
            if (modulo.items && modulo.items.length > 0) {
                return renderRoutes(modulo.items); // si el modulo tiene hijos (items o submodulos), los renderizamos recursivamente
            }
            const Component = componentsMap[modulo.element];
            if (!Component) {
                console.warn(`No se encontró componente: ${modulo.element}`);
                return [];
            }
            return (
                <Route
                    key={modulo.path}
                    path={modulo.path}
                    element={
                        <Suspense fallback={<div className="preloader-container">
                            <div id="preloader5"></div>
                        </div>
                        }>
                            <Component />
                        </Suspense>
                    }
                />
            );
        });
    };

    return (
        <div>
            <Routes>
                {userModulos && userModulos.length > 0 ? (
                    renderRoutes(userModulos)
                ) : (
                    // ruta por defecto cuando no hay módulos disponibles
                    <Route path="*" element={<Navigate to="/home" replace />} />
                )}
                <Route path="/" element={
                    <Navigate
                        to="/home" // si el usuario va a '/' lo redirige automáticamente a '/home'
                        replace  // hace que no se guarde '/' en el historial del navegador.
                    />
                } />
                <Route path="/home" element={
                    <Suspense fallback={ // mientras el componente carga, mostramos un preloader
                        <div className="preloader-container">
                            <div id="preloader5"></div>
                        </div>
                    }>
                        <HomeAdmin />
                    </Suspense>
                } />
                <Route path="/configuracion-usuario" element={
                    <Suspense fallback={
                        <div className="preloader-container">
                            <div id="preloader5"></div>
                        </div>
                    }>
                        <ConfiguracionUsuario />
                    </Suspense>
                } />
            </Routes>
        </div>
    )
}