import { useCallback } from "react";

import { FormikHelpers } from "formik";
import { UseMutationResult } from "@tanstack/react-query";

interface UseFormHandlerProps<T> {
    createMutation: UseMutationResult<any, unknown, Omit<T, "id">>;
    updateMutation: UseMutationResult<any, unknown, Omit<T, "id"> & { id: number }>; // ✅ Cambiamos `Partial<T>` por `Omit<T, "id">`
    refetch: () => void;
    closeForm: () => void;
    rowData?: T;
}


export const useFormHandler = <T extends { id: number }>({
    createMutation,
    updateMutation,
    refetch,
    closeForm,
    rowData,
}: UseFormHandlerProps<T>) => {
    return useCallback(
        async (values: Omit<T, "id">, { setSubmitting }: FormikHelpers<Omit<T, "id">>) => {
            try {
                if (rowData) {
                    await updateMutation.mutateAsync({ id: rowData.id, ...values });
                } else {
                    await createMutation.mutateAsync(values);
                }
                refetch();
                closeForm();
            } finally {
                setSubmitting(false);
            }
        },
        [rowData, createMutation, updateMutation, refetch, closeForm]
    );
};