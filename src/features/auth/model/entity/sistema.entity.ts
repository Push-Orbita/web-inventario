import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface SistemaResponse {
    data: SistemaEntity[];
    metadata: MetadataEntity;
}


export interface SistemaEntity {
    id:            number;
    nombre:        string;
    descripcion:   string;
    url:           string;
    clientId:      string;
    clientSecret:  string;
    icono:         string;
    suscripciones?: Suscripcion[] | [] | null;
    modulos?:       Modulo[] | [] | null ;
    permisos?:      any[] | [] | null;
}

export interface Modulo {
    id:          number;
    nombre:      string;
    descripcion: string;
    label:       string;
    element:     string;
    icon:        string;
    path:        string;
}

export interface Suscripcion {
    id:          number;
    nombre?:      string;
    descripcion?: string;
}
