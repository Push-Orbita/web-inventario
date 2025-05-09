import { AxiosError } from "axios";
import toast from "react-hot-toast";

export interface ErrorApiResponse {
    error: boolean;
    errorDetails: {
        code: string;
        message: string;
        details: string;
    }
}

interface ErrorMessages {
    createdError?: string;
    unknownError?: string;
}

export const handleApiError = (
    error: AxiosError<ErrorApiResponse>,
    messages: ErrorMessages = {
        createdError: 'Error al crear',
        unknownError: 'Error desconocido'
    }
) => {
    if (error.response) {
        const status = error.response.status;
        const errorMessage = error.response.data?.errorDetails?.message;
        const errorMessageDetail = error.response.data?.errorDetails?.details;

        if (status === 400 || status === 404) {
            const fullErrorMessage = errorMessage
                ? `${errorMessage}\n${errorMessageDetail || ""}`
                : messages.createdError;
            toast.error(fullErrorMessage ?? messages.createdError ?? "Error al crear");
        } else if (status === 500) {
            toast.error(errorMessageDetail ?? messages.unknownError ?? "Error desconocido");
        } else {
            toast.error(messages.unknownError ?? "Error desconocido");
        }
    } else {
        toast.error(messages.unknownError ?? "Error desconocido");
    }
};