export type SistemaPatchDTO = Partial<SistemaPostDTO> & { id: number };

export interface SistemaPostDTO {
    nombre: string;
    descripcion: string;
    url: string,
    icono: string
}

export interface SistemaDeleteDTO {
    id: number;
}