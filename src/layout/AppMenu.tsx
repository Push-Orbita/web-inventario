import { NavLink, useNavigate } from "react-router-dom"
import { MenuProvider } from "@context/menuContext"
import { useAppSelector } from "@hooks/reduxHook"
import AppMenuitem from "./AppMenuitem";


// convuerte la estructura de módulos de usuario a un formato que el menú pueda renderizar
const transformUserModulosToAppMenuItem = (userModulos: any): any[] => {
  return userModulos.map((modulo: any) => {
    const transformedItem: any = {
      label: modulo.label, // texto del item
      icon: modulo.icon, // icono del item
      to: modulo.path, // ruta a la que apunta el item
    };

    // si el ítem tiene subítems (submenu), los transforma recursivamente
    if (modulo.items) {
      transformedItem.items = transformUserModulosToAppMenuItem(modulo.items);
    }

    return transformedItem;
  });
};


export const AppMenu = () => {

  const { userModulos } = useAppSelector(state => state.auth)

  const navigate = useNavigate()

  // redirige al usuario a la ruta que se le pase como argumento
  const handleMenuItemClick = (path: string) => {
    navigate(path, { replace: true })
  }

  const addCommandToMenuItems = (menuItems: any[], pathLabel: string = ''): any[] => {

    return menuItems.map((item) => {
      const newItem = { ...item };
      const currentLabel = newItem.to || pathLabel;
      if (newItem.items) {
        newItem.items = addCommandToMenuItems(newItem.items, currentLabel)
      }
      if (!newItem.items) {
        newItem.command = () => handleMenuItemClick(currentLabel) // di el item no tiene hijos, agregamos la propiedad command
      }
      return newItem;
    });
  }

  const menu: any[] = transformUserModulosToAppMenuItem(userModulos)
  const dataMenu = addCommandToMenuItems(menu)

  return (
    // generamos un menu de navegacion dinamico en base a los modulos del usuario
    <MenuProvider>
      <ul className="layout-menu">
        {dataMenu.map((item, i) => (
          !item.separator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator" key={i}></li>
          )
        ))}

        <NavLink to="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>
          {/* <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} /> */}
        </NavLink>

      </ul>
    </MenuProvider>
  )
}