
export interface ModeloPostDTO {
  nombre: string;
}

export type ModeloPatchDTO = Partial<ModeloPostDTO> & { id: number };

export interface ModeloDeleteDTO {
  id: number;
}