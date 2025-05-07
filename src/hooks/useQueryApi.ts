import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

// ✅ El ServiceApi ahora es una función que devuelve directamente `T[]` (no AxiosResponse)
type ServiceApi<T> = () => Promise<T[]>;

const useQueryApi = <T>(
    queryKey: string,
    serviceApi: ServiceApi<T>,  // ✅ Directamente `() => Promise<T[]>`
    queryOptions?: UseQueryOptions<T[], AxiosError>
): UseQueryResult<T[], AxiosError> => {
    return useQuery<T[], AxiosError>(
        [queryKey],
        serviceApi,  // ✅ No necesita transformación de `res.data`, ya lo hace el servicio
        queryOptions
    );
};

export default useQueryApi;