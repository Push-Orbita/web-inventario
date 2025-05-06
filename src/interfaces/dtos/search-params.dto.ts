export interface SearchParamsDTO {
    sortBy?: string;
    pageSize?: number;
    pageNumber?: number;
    q?: string;
    id?: string | number;
    active?: boolean;
    name?: string;
    code?: string;
    [key: string]: any;
}