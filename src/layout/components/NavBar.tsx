import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Menubar } from "primereact/menubar";

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { LogOut } from "@redux/slices/auth/authSlice/authSlice";
import logo from '../../assets/img/auth/ipet.png';


export const NavBar = () => {
    const { userModulos } = useAppSelector(
        (state) => state.auth
    );
    interface MenuItem {
        label: string;
        labelButton?: string;
        icon?: string;
        items?: MenuItem[];
        separator?: boolean;
        command?: () => void;
        path?: string;
    }
    const menu: MenuItem[] = userModulos;
    const dataMenu = menu;
    const navigate = useNavigate()
    const menuLeft = useRef<Menu>(null);
    const handleMenuItemClick = (path: string) => {
        navigate(path, { replace: true });
    };
    const addCommandToMenuItems = (menuItems: MenuItem[], pathLabel: string = ''): MenuItem[] => {
        return menuItems.map((item) => {
            const newItem = { ...item };
            const currentLabel = newItem.path || pathLabel;
            if (newItem.items) {
                newItem.items = addCommandToMenuItems(newItem.items, currentLabel);
            }
            if (!newItem.items) {
                newItem.command = () => handleMenuItemClick(currentLabel);
            }
            return newItem;
        });
    };
    const dispatch = useAppDispatch();
    const menuWithCommands: MenuItem[] = addCommandToMenuItems(dataMenu);
    const handleLogOut = () => {
        dispatch(LogOut());
    };

    const items: MenuItem[] = [

        {
            label: 'Sesion',
            items: [
                {
                    label: 'Cerrar',
                    icon: 'pi pi-power-off',
                    command: () => handleLogOut()

                },

            ]
        },

    ];
    const start = <img alt="logo" src={logo} height="50" width={"50"} className="mt-1 ml-2 mr-2"></img>;
    const end =
        <>
            <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
            <Button icon="pi pi-cog" size="small" className="mr-2" onClick={(event) => menuLeft.current?.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
        </>
    return (
        <div className="h-5rem">
            <div >
                <Menubar className='shadow-3' model={menuWithCommands} start={start} end={end} />
            </div >
        </div>
    )
}