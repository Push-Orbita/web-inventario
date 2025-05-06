import { createContext, FunctionComponent, ReactNode, useContext, useState } from 'react';
import { Button } from 'primereact/button';

import { usePermisos } from './usePermisos';

interface ModuleContextValue {
    startToolbarTemplate: () => ReactNode;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    rowData: any;
    setRowData: (data: any) => void;
    resetModuleState: () => void;
}

// Creando el contexto con tipo predeterminado como null que luego será inicializado
const ModuleContext = createContext<ModuleContextValue | null>(null);
interface ModuleProviderProps {
    children: ReactNode;
}

export const ModuleProvider: FunctionComponent<ModuleProviderProps> = ({ children }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [rowData, setRowData] = useState<any>(null);
    const permisos = usePermisos();

    const startToolbarTemplate = (): ReactNode => (
        <div className="my-2">
            {permisos.puedeAgregar ? (
                <Button label="Nuevo" icon="pi pi-plus" className="mr-2" onClick={() => setVisible(true)} />
            ) : null}
        </div>
    );

    const resetModuleState = () => {
        setVisible(false);
        setRowData(null);
    };

    const contextValue: ModuleContextValue = {
        startToolbarTemplate,
        visible,
        setVisible,
        rowData,
        setRowData,
        resetModuleState,
    };

    return (
        <ModuleContext.Provider value={contextValue}>
            {children}
        </ModuleContext.Provider>
    );
};

// Hook personalizado para usar el contexto, con un control de tipo seguro
export const useModuleContext = (): ModuleContextValue => {
    const context = useContext(ModuleContext);
    if (!context) {
        throw new Error("useModuleContext must be used within a ModuleProvider");
    }
    return context;
}
