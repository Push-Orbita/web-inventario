import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ReactElement } from "react";

interface Props {
    children?: ReactElement,
    visible: boolean,
    onHide: () => void,
    onConfirm: () => void
}

export default function ModalDelete({ children, visible, onHide, onConfirm }: Props) {
    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={onHide} className="p-button-text" />
            <Button label="Confirmar" icon="pi pi-check" onClick={onConfirm} autoFocus />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog header="Confirmación" visible={visible} style={{ width: '50vw' }} onHide={onHide} footer={footerContent}>
                <p className="m-0">
                    {children}
                </p>
            </Dialog>
        </div>
    )
}