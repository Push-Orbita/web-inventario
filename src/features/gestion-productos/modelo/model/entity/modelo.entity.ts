import { MetadataEntity } from "@interfaces/entity/MetadataEntity.entity";

export interface ModeloResponse {
    data: ModeloEntity[];
    metadata: MetadataEntity;
}

export interface ModeloEntity {
    id: number;
    nombre: string;
}