

export interface AuthResponse {
    data: AuthEntity[];
}

export interface AuthEntity {
    id: number;
    nombre: string;
    email: string;
    password: string;
    persona: Persona;
    permiso: Permiso[];
    userModulos: UserModulos;
    tokens: Tokens;
}

export interface Permiso {
    id: number;
    sistema: Sistema;
    organizacion: Organizacion;
    rol: RolElement;
}

export interface Organizacion {
    id: number;
    nombre: string;
    bd: string;
    host: string;
    port: number;
    usuario: string;
    password: string;
    tipobd: string;
}

export interface RolElement {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface Sistema {
    id: number;
    nombre: string;
    descripcion: string;
    url: string;
    clientId: string;
    clientSecret: string;
    icono: string;
}

export interface Persona {
    id: number;
    cuil: string;
    nombre: string;
    apellido: string;
    genero: string;
}

export interface Tokens {
    access_token: string;
    refresh_token: string;
}

export interface UserModulos {
    sistema: SistemaClass;
    rol: SistemaClass;
    modulos: Modulo[];
}

export interface Modulo {
    id: number;
    nombre: string;
    descripcion: string;
    label: string;
    element?: string;
    icon: string;
    path?: string;
    moduloPadre?: number | null;
    acciones?: RolElement[];
    children: Modulo[];
}

export interface SistemaClass {
    id: number;
    nombre: string;
}

