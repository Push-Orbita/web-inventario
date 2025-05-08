// import { useNavigate } from "react-router-dom"
// import { useAppDispatch } from "@hooks/reduxHook";

import { Button } from 'primereact/button';
import { useMenuToggle } from "@hooks/useMenuToggle";




export const AppTopbar = () => {

    // const dispatch = useAppDispatch();
    // const navigate = useNavigate();

    const { handleToggleMenu } = useMenuToggle();

    return (
        <div className="layout-topbar">
            <Button type="button" rounded text onClick={handleToggleMenu}>
                <i className="pi pi-bars" />
            </Button>

            <div className='flex justify-content-end w-full'>
                {/* <SplitButton label={userName && userName ? userName : 'Usuario'} model={items} text style={{
                    borderRadius: '0px'
                }} /> */}
            </div >
        </div>
    )
}
