import { Suspense, ComponentType, lazy, LazyExoticComponent,  } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// cargamos el componente solamente cuando sea necesario (cuando el usuario accede a /home).
const HomeAdmin = lazy(() => import('../pages/home/Home'));


type ComponentsMap = Record<string, LazyExoticComponent<ComponentType<any>>>;

const componentsMap: ComponentsMap = {
    'HomeAdmin': HomeAdmin,
};

export const RouterJs = () => {
    return (
        <div>
            <Routes>
                <Route 
                    path="/" 
                    element={
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
            </Routes>
        </div>
    )
}