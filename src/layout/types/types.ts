// types.ts
export interface LayoutConfig {
    ripple: boolean;
    inputStyle: string;
    menuMode: string;
    colorScheme: string;
    theme: string;
    scale: number;
}

export interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
}

export interface LayoutContextProps {
    layoutConfig: LayoutConfig;
    setLayoutConfig: React.Dispatch<React.SetStateAction<LayoutConfig>>;
    layoutState: LayoutState;
    setLayoutState: React.Dispatch<React.SetStateAction<LayoutState>>;
    onMenuToggle: () => void;
    showProfileSidebar: () => void;
}

export interface ChildContainerProps {
    children: React.ReactNode;
}
export interface AppMenuItemProps {
    item: AppMenuItem;
    index: number;
    root?: boolean;
    parentKey?: string;
}
export interface AppMenuItem {
    label: string;
    icon?: string;
    to?: string;
    url?: string;
    target?: string;
    badge?: string;
    class?: string;
    preventExact?: boolean;
    items?: AppMenuItem[];
    separator?: boolean;
    visible?: boolean;
    disabled?: boolean;
    command?: ({ originalEvent, item }: { originalEvent: Event; item: AppMenuItem }) => void;
    replaceUrl?: boolean;
}

export interface MenuContextProps {
    activeMenu: string;
    setActiveMenu: (menu: string) => void;
}

export interface LayoutConfig {
    ripple: boolean;
    inputStyle: string;
    menuMode: string;
    colorScheme: string;
    theme: string;
    scale: number;
}

export interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
}

export interface LayoutContextProps {
    layoutConfig: LayoutConfig;
    setLayoutConfig: React.Dispatch<React.SetStateAction<LayoutConfig>>;
    layoutState: LayoutState;
    setLayoutState: React.Dispatch<React.SetStateAction<LayoutState>>;
    onMenuToggle: () => void;
    showProfileSidebar: () => void;
}

export interface ChildContainerProps {
    children: React.ReactNode;
}

export interface AppMenuItemProps {
    item: AppMenuItem;
    index: number;
    root?: boolean;
    parentKey?: string;
}