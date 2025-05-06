import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom"
import { PrimeReactProvider } from 'primereact/api';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from "redux-persist/lib/integration/react";

import { ConfirmDialog } from "primereact/confirmdialog";

import { MenuProvider } from "@context/menuContext";
import { AppRouter } from "@router/AppRouter";
import { persistor } from "@redux/store/store";
import { useAppSelector } from "@hooks/reduxHook";
import { PermisosProvider } from "@hooks/usePermisos";
import { ModuleProvider } from "@hooks/useModules";

import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import './components/common/style/layout/layout.scss'

import './i18n';


function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // refecht cuando se cambia de pantalla
        staleTime: Infinity,
        // cacheTime: 1000 * 60 * 60 * 0,
        retry: 2, // reintentar fetches fallidos hasta 2 veces automáticamente
        refetchOnMount: false,
        refetchOnReconnect: true, // se vuelve a intentar si se pierde y recupera la conexión.
      },
    },
  })

  // obtenemos del redux si el tema es claro o oscuro
  const isDarkTheme = useAppSelector(state => state.ui.theme);

  // cambia dinámicamente el archivo de CSS del tema según si el usuario está en modo oscuro o claro
  useEffect(() => {
    const linkId = 'theme-link';
    let themeLink = document.getElementById(linkId) as HTMLLinkElement;

    // usa un <link> que se inserta en el <head> del HTML y cambia su href dependiendo del tema.
    if (!themeLink) {
      themeLink = document.createElement('link');
      themeLink.id = linkId;
      themeLink.rel = 'stylesheet';
      document.head.appendChild(themeLink);
    }

    // cambia la ruta del tema basado en isDarkTheme
    themeLink.href = isDarkTheme
      ? '/node_modules/primereact/resources/themes/soho-dark/theme.css'
      : '/node_modules/primereact/resources/themes/lara-light-blue/theme.css';

  }, [isDarkTheme]);

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <PersistGate persistor={persistor}> {/* Componente para gestionar el estado persistente */}
            <PrimeReactProvider> {/* Componente de PrimeReact para envolver la aplicación */}
              <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
                <PermisosProvider>
                  <ModuleProvider>
                    <MenuProvider>
                      <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />  {/* Componente de Toaster para mostrar notificaciones */}
                      <ConfirmDialog />  {/* Componente para mostrar diálogos de confirmación */}
                      <AppRouter />
                    </MenuProvider>
                  </ModuleProvider>
                </PermisosProvider>
              </div>
            </PrimeReactProvider>
          </PersistGate>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
}

export default App