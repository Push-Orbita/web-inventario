import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

// La `requestFn` ahora es una función que recibe datos (`TVariables`) y devuelve directamente `TData`
// ya no AxiosResponse
interface UseQueryMutationProps<TData, TVariables> {
  requestFn: (data: any) => Promise<any>;
  options?: UseMutationOptions<TData, AxiosError, TVariables>;
}

const UseQueryMutation = <TData, TVariables>({
  requestFn,
  options,
}: UseQueryMutationProps<TData, TVariables>) => {
  return useMutation<TData, AxiosError, TVariables>(requestFn, options);
};

export default UseQueryMutation;