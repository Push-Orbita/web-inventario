import { useAppSelector } from '@hooks/reduxHook';
import { DashboardLayout } from '@layout/DashboardLayout';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useState } from 'react';
import InterfaceInfo from './components/InterfaceInfo';
import PersonalInfo from './components/PersonalInfo';

const ConfiguracionUsuarioView = () => {
    const { userNombre, sistema, organizacion } = useAppSelector((state) => state.auth);
    const [activeComponent, setActiveComponent] = useState('personal');


    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'personal':
                return <PersonalInfo />;
            case 'interface':
                return <InterfaceInfo />;
            case 'user':
                return 'user info';
            default:
                return <PersonalInfo />;
        }
    };

    return (
        <DashboardLayout>
            <div className="grid">
                <div className="col-3">
                    <div className="shadow-4 p-3 card">
                        <div className="text-center">
                            <Avatar icon="pi pi-user" className="mb-3" size="xlarge" shape="circle" />
                            <h4 className="mt-2">{userNombre}</h4>
                            <p className="text-muted">{sistema} - {organizacion}</p>
                        </div>
                        <Divider />
                        <div className="flex flex-column ">
                            <div className="flex-1 flex mb-2">
                                <Button
                                    label="Información personal"
                                    icon="pi pi-user"
                                    className={`w-full text-left ${activeComponent === 'personal' ? '' : 'p-button-text'}`}
                                    onClick={() => setActiveComponent('personal')}
                                />
                            </div>
                            <div className="flex-1 flex mb-2">
                                <Button
                                    label="Configuración de la Interface"
                                    icon="pi pi-cog"
                                    className={`w-full text-left ${activeComponent === 'interface' ? '' : 'p-button-text'}`}
                                    onClick={() => setActiveComponent('interface')}
                                />
                            </div>
                            <div className="flex-1 flex mb-2">
                                <Button
                                    label="Información de usuario"
                                    icon="pi pi-user"
                                    className={`w-full text-left ${activeComponent === 'user' ? '' : 'p-button-text'}`}
                                    onClick={() => setActiveComponent('user')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-9">
                    <div className="shadow-4 p-3 card">
                        {renderActiveComponent()}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ConfiguracionUsuarioView
