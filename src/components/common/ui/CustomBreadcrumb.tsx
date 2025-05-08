import { BreadCrumb } from 'primereact/breadcrumb';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/reduxHook';

interface BreadcrumbItem {
    label: string;
    icon?: string;
    url?: string;
}

interface ModuleItem {
    label: string;
    path?: string;
    icon?: string;
    items?: ModuleItem[];
}

export const CustomBreadcrumb: React.FC = () => {
    const location = useLocation();
    const userModulos = useAppSelector(state => state.auth.userModulos);

    const normalizePath = (path: string) => {
        return path.endsWith('/') ? path : path + '/';
    };

    const getBreadCrumbItems = (modules: ModuleItem[], path: string): BreadcrumbItem[] => {
        let breadcrumbPath: BreadcrumbItem[] = [];
        path = normalizePath(path); // Normaliza la ruta actual

        const searchPath = (items: ModuleItem[], currentPath: string) => {
            for (let item of items) {
                const itemPath = item.path ? normalizePath(item.path) : '';
                const fullPath = normalizePath(currentPath + itemPath);

                if (path.startsWith(fullPath)) {
                    breadcrumbPath.push({ label: item.label, icon: item.icon });
                    if (item.items) {
                        searchPath(item.items, fullPath);  // Continuar con la ruta completa actualizada
                        if (breadcrumbPath.find(b => b.label === item.label)) {
                            return; // Finalizar si el ítem actual ya contribuyó al breadcrumb
                        }
                    } else {
                        return; // Salir si no hay más subítems
                    }
                }
            }
        };

        searchPath(modules, '/');  // Empieza la búsqueda desde la raíz
        return breadcrumbPath;
    };

    const breadcrumbItems = getBreadCrumbItems(userModulos, location.pathname);
    const home: BreadcrumbItem = { label: "Inicio", icon: 'pi pi-home' };

    return (
        <BreadCrumb model={breadcrumbItems} home={home} />
    );
};
