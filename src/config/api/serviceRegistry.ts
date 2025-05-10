import { ModeloApi, ModeloService } from "@features/gestion-productos/modelo/service/modelo.service";
import { ModeloEntity } from "@features/gestion-productos/modelo/model/entity/modelo.entity";

// Definir los servicios (el mapa indica el tipo de cada servicio)
interface ServiceMap {
    modelo: ModeloService

}
// Registro de servicios (instancias reales)
const serviceRegistry: ServiceMap = {
    modelo: ModeloApi,
};
// Definir los posibles módulos
export type ModuleKey = keyof ServiceMap;

interface EntityMap {
    modelo: ModeloEntity;
}

export type ModuleEntity<M extends ModuleKey> = EntityMap[M];

export const getServiceApi = <M extends ModuleKey>(moduleKey: M): ServiceMap[M] => {
    return serviceRegistry[moduleKey];
};