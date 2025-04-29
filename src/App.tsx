import { BrowserRouter } from "react-router-dom"
import { PrimeReactProvider } from 'primereact/api';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from "redux-persist/lib/integration/react";

import { ConfirmDialog } from "primereact/confirmdialog";

import { AppRouter } from "@router/AppRouter";
import { persistor } from "@redux/store/store";
import { useAppSelector } from "@hooks/reduxHook";

import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import './components/common/style/layout/layout.scss'


function App() {

  const isDarkTheme = useAppSelector(state => state.ui.theme);

  return (
    <>
      <BrowserRouter>
        <PersistGate persistor={persistor}> {/* Componente para gestionar el estado persistente */}
          <PrimeReactProvider> {/* Componente de PrimeReact para envolver la aplicación */}
            <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />  {/* Componente de Toaster para mostrar notificaciones */}
            <ConfirmDialog />  {/* Componente para mostrar diálogos de confirmación */}
            <AppRouter />
          </PrimeReactProvider>
        </PersistGate>
      </BrowserRouter>
    </>
  )
}

export default App