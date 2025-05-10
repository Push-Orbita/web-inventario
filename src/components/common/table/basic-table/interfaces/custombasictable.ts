import { FilterMatchMode } from "primereact/api";
import { ReactNode } from "react";

export interface ICustomColumnItem {
    field?: string,
    header: string,
    sortable?: boolean,
    filter?: boolean,
    filterPlaceholder?: string,
    dataType?: 'text' | 'date' | 'number',
    body?: (rowData: any) => JSX.Element;
    style?: React.CSSProperties;
    filterField?: string;
    filterFunction?: (value: any, filter: string) => boolean;
    showFilterMenu?: boolean;
    filterMatchMode?: FilterMatchMode;
    globalFilterValue?: string;
    filterElement?: (props: any) => ReactNode;
    [x: string]: string | undefined | any;
}
