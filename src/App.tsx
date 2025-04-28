import { BrowserRouter } from "react-router-dom"
import { PrimeReactProvider } from 'primereact/api';
import { Toaster } from 'react-hot-toast';
import { ConfirmDialog } from "primereact/confirmdialog";

import { AppRouter } from "./router/AppRouter";


function App() {

  return (
    <>
      <BrowserRouter> 
        <PrimeReactProvider> {/* Componente de PrimeReact para envolver la aplicación */}
          <Toaster position="bottom-right" toastOptions={{ duration: 5000 }}/>  {/* Componente de Toaster para mostrar notificaciones */}
          <ConfirmDialog />  {/* Componente para mostrar diálogos de confirmación */}
          <AppRouter />
        </PrimeReactProvider>
      </BrowserRouter>
    </>
  )
}

export default App