export interface UserEntity {
    userNombre: string
    tokenUser: string
    tokenSistem?: string
    organizacion: string
    plan: string
    sistema: string
    activo: boolean
    isLogged: boolean
    lang: string,
    userModulos: UserModulo[]
}

export interface UserModulo {
    label: string
    icon: string
    path?: string
    acciones?: string[]
    element?: string
    items?: Item[]
}

export interface Item {
    label: string
    icon: string
    path: string
    acciones: string[]
    element: string
}  