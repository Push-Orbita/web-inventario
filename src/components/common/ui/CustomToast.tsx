import { Toast } from 'primereact/toast';
import { useEffect, useRef } from 'react';

// Definición de las props
interface CustomToastProps {
    severity?: 'success' | 'info' | 'warn' | 'error';
    summary?: string;
    detail?: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ severity, summary, detail }) => {
    const toast = useRef<Toast>(null);

    // Use Effect para disparar el toast automáticamente cuando cambian las props
    useEffect(() => {
        if (severity && summary && detail) {
            toast.current?.show({ severity, summary, detail, life: 3000 });
        }
    }, [severity, summary, detail]);

    return <Toast ref={toast} position="bottom-right" />;
};

export default CustomToast;
