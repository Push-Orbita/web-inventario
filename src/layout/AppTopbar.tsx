import { Button } from 'primereact/button';
import { useMenuToggle } from "@hooks/useMenuToggle";
import { useAppDispatch, useAppSelector } from '@hooks/reduxHook';
import { useNavigate } from 'react-router-dom';
import { LogOut } from '@redux/slices/auth/authSlice/authSlice';
import { SplitButton } from 'primereact/splitbutton';



export const AppTopbar = () => {

    const { handleToggleMenu } = useMenuToggle();

    const { userNombre } = useAppSelector((state) => state.auth);

    const dispatch = useAppDispatch();

    const handleLogOut = () => {
        dispatch(LogOut());
    };

    const navigate = useNavigate();

    const items = [
        {
            label: 'Configuración del Usuario',
            icon: 'pi pi-cog',
            command: () => navigate('/configuracion-usuario')
        },
        {
            label: 'Cerrar Sesion',
            icon: 'pi pi-power-off',
            command: () => handleLogOut()

        },

    ]

    return (
        <div className="layout-topbar">
            <Button type="button" rounded text onClick={handleToggleMenu}>
                <i className="pi pi-bars" />
            </Button>

            <div className='flex justify-content-end w-full'>
                <SplitButton label={userNombre && userNombre ? userNombre : 'Usuario'} model={items} text style={{
                    borderRadius: '0px'
                }} />
            </div >
        </div>
    )
}