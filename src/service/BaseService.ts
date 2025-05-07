import { Axios, cancelTokenSource } from "@config/api/axios.config";
import { omitId, replaceParamId } from "@utilities/replace-param.utils";

// Definir una interfaz base que garantice `id`
export interface BaseEntity {
    id: number;
}
export class BaseService<T extends BaseEntity> {
    protected urls: {
        get: string;
        getById: string;
        post: string;
        patch: string;
        delete: string;
    };

    constructor(urls: {
        get: string;
        getById: string;
        post: string;
        patch: string;
        delete: string;
    }) {
        this.urls = urls;
    }

    getAll = async (): Promise<T[]> => {
        const response = await Axios.get<T[]>(this.urls.get, { cancelToken: cancelTokenSource.token });
        return response.data;
    };

    create = async (data: Omit<T, "id">): Promise<T> => {
        const response = await Axios.post<T>(this.urls.post, data, { cancelToken: cancelTokenSource.token });
        return response.data;
    };

    update = async (data: Partial<T> & { id: number }): Promise<T> => {
        const response = await Axios.patch<T>(replaceParamId(this.urls.patch, data.id), omitId(data), {
            cancelToken: cancelTokenSource.token,
        });
        return response.data;
    };

    delete = async (id: number): Promise<void> => {
        await Axios.delete<void>(replaceParamId(this.urls.delete, id), {
            cancelToken: cancelTokenSource.token,
        });
    };

}