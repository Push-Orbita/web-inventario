export interface ApiErrorResponse {
    error: boolean;
    errorDetails?: {
        code: string;
        message: string;
        details?: string;
    };
}