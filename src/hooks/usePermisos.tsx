import * as React from 'react';
import { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from './reduxHook';

interface PermisosProviderProps {
  children: ReactNode;
}
// Definir la forma de los permisos
interface Permisos {
  puedeAgregar: boolean;
  puedeBorrar: boolean;
  puedeModificar: boolean;
  puedeVer: boolean;
  puedeDetalle: boolean;
  puedeReporte: boolean;
}

// Crear el contexto con un estado por defecto
const PermisosContext = createContext<Permisos>({
  puedeAgregar: false,
  puedeBorrar: false,
  puedeModificar: false,
  puedeVer: false,
  puedeDetalle: false,
  puedeReporte: false,
});

// Hook personalizado para usar el contexto de permisos
export const usePermisos = () => useContext(PermisosContext);

// Componente proveedor que englobará partes de tu aplicación
export const PermisosProvider: React.FC<PermisosProviderProps> = ({ children }) => {
  const { userModulos } = useAppSelector(
    (state) => state.auth
  );
  const { pathname } = useLocation();
  const [permisos, setPermisos] = useState<Permisos>({
    puedeAgregar: false,
    puedeBorrar: false,
    puedeModificar: false,
    puedeVer: false,
    puedeDetalle: false,
    puedeReporte: false,
  });

  const verificarAcciones = (items: any, path: any) => {
    for (const item of items) {
      if (item.path === path && item.acciones) {
        return {
          puedeAgregar: item.acciones.includes('A'),
          puedeBorrar: item.acciones.includes('B'),
          puedeModificar: item.acciones.includes('M'),
          puedeVer: item.acciones.includes('V'),
          puedeDetalle: item.acciones.includes('D'),
          puedeReporte: item.acciones.includes('R')
        };
      }
      // Si el item tiene sub-items, continuamos la búsqueda de manera recursiva
      if (item.items) {
        const accionesEncontradas: any = verificarAcciones(item.items, path);
        if (accionesEncontradas) return accionesEncontradas;
      }
    }
    // Si no se encuentra nada, se retorna null
    return null;
  };

  useEffect(() => {
    const acciones = verificarAcciones(userModulos, pathname);
    if (acciones) {
      setPermisos(acciones);
    }
  }, [pathname, userModulos]);

  return (
    <PermisosContext.Provider value={permisos}>
      {children}
    </PermisosContext.Provider>
  );
};