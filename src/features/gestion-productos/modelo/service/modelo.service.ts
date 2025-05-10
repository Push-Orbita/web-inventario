// import { Axios } from '@config/api/axios.config'
// import { cancelTokenSource } from '@config/api/axios.config';
import { BaseService } from '../../../../service/BaseService';
import { ModeloEntity } from '../model/entity/modelo.entity';
import { ModeloURL } from "./url/modelo.url";

// const url = ModeloURL;
export class ModeloService extends BaseService<ModeloEntity> {
    constructor() {
        super(ModeloURL);
    }
    // async getModeloSearch(): Promise<ModeloEntity[]> {
    //     return await Axios.get(url.get, { 
    //         cancelToken: cancelTokenSource.token,
    //     });
    // }
}

export const ModeloApi = new ModeloService();