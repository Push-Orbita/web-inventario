import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';


interface IProps {
    children?: React.ReactNode;
    title?: string;
    width?: "small" | "medium" | "large" | "full";
    isOpen?: boolean;
    setIsOpen?: any;
}

const widthMap: Record<NonNullable<IProps['width']>, string> = {
    small: '30vw',
    medium: '50vw',
    large: '80vw',
    full: '100vw'
};

export const CustomBasicModal: React.FC<IProps> = ({ children, title, width = 'small', isOpen = false, setIsOpen }) => {
    // const { visible, setVisible } = useModuleContext();
    const [dialogWidth, setDialogWidth] = useState<string>(widthMap[width]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setDialogWidth(widthMap.full);
            } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
                setDialogWidth(widthMap.large);
            } else {
                setDialogWidth(widthMap[width]);
            }
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [width]);

    return (
        <Dialog
            header={title}
            visible={isOpen}
            style={{ width: dialogWidth }}
            onHide={() => setIsOpen(false)}
        >
            <div className="m-0">
                <div className="col-12">
                    <div className="card">
                        {children}
                    </div>
                </div>
            </div>
        </Dialog>
    );
};
