interface MenuItem {
    label: string;
    icon?: string;
    items?: MenuItem[];
    separator?: boolean;
    command?: () => void;
    path?: string;
}

export const originalMenu: MenuItem[] = [
    {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        path: 'home'
    },
    {
        label: 'News Letter',
        icon: 'pi pi-fw pi-file',
        path: 'news-letter'
    },
];