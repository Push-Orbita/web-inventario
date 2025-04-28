import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { RootState } from "../redux/store/store";
import { toggleMenu, closeMenu } from "../redux/slices/uiSlices/uiSlice";


// controlamos si el menu lateral (sidebar) del dashboard está abierto o cerrado,
// y cerrarlo automáticamente cuando el ancho de la pantalla sea menor a 830px
export const useMenuToggle = () => {

    const dispatch = useDispatch();
    const isOpenMenu = useSelector((state: RootState) => state.ui.isOpenMenu); // valor actual del menú (true o false)

    // disparamos la accion toggleMenu
    const handleToggleMenu = () => {
        dispatch(toggleMenu()); // hace que isOpenMenu pase de true -> false o viceversa.
    };

    // si el ancho es menor o igual a 830px y el menú está abierto, lo automáticamente
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 830 && isOpenMenu) {
                dispatch(closeMenu());
            }
        };

        // Add event listener
        window.addEventListener("resize", handleResize); // cada vez que el tamaño de la pantalla cambia

        return () => {
            window.removeEventListener("resize", handleResize); // limpiamos el efecto cuando el componente se desmonte
        };
    }, [dispatch, isOpenMenu]); // el efecto escucha cambios en isOpenMenu

    return { isOpenMenu, handleToggleMenu };
};