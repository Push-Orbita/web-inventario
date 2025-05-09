import { Divider } from 'primereact/divider';
import { ToggleButton } from 'primereact/togglebutton';
import { toggleShowGridlines, toggleTheme } from '@redux/slices/uiSlices/uiSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHook';

const InterfaceInfo = () => {

    const dispatch = useAppDispatch();

    const { theme, showGridlines } = useAppSelector((state) => state.ui);

    return (
        <>
            <div className="grid">
                <div className="col-12 text-center">
                    <h5>Configuración de la interface</h5>
                </div>
            </div>
            <div className="grid">
                <div className="col-12 md:col-12 ">
                    <p>Tema</p>
                    <div>
                        <ToggleButton
                            checked={theme}
                            onChange={() => dispatch(toggleTheme())}
                            onIcon="pi pi-moon"
                            offIcon="pi pi-sun"
                            onLabel="Oscuro"
                            offLabel="Claro"
                            className="w-8rem"
                        />
                    </div>
                </div>
                <div className="col-12 md:col-12">
                    <p>Lineas en las Tablas</p>
                    <div>
                        <ToggleButton
                            checked={showGridlines}
                            onChange={() => dispatch(toggleShowGridlines())}
                            onIcon="pi pi-check"
                            offIcon="pi pi-times"
                            onLabel="Mostrar"
                            offLabel="Ocultar"
                            className="w-8rem"
                        />
                    </div>
                </div>
                <Divider />
            </div>
        </>
    )
}

export default InterfaceInfo
