
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ReactElement, useState } from "react";
interface Props {
    children?: ReactElement,
    visible: boolean,
}

export default function Modal({ children }: Props) {
    const [visible, setVisible] = useState<boolean>(false);
    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Enviar" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
           
            <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <p className="m-0">
                    {children}
                </p>
            </Dialog>
        </div>
    )
}