import { createContext, useState } from "react";
import { ChildContainerProps, MenuContextProps } from '@layout/types/types';

// creamos un contexto, que va a contener información sobre el menú activo.
export const MenuContext = createContext({} as MenuContextProps);

// envolvemos el componente con el provider
export const MenuProvider: React.FC<ChildContainerProps> = ({ children }) => {

    const [activeMenu, setActiveMenu] = useState('');

    const value = {
        activeMenu,
        setActiveMenu
    };

    return (
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    )
};