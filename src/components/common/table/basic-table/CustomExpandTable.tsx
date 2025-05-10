import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableExpandedRows, DataTableFilterMeta, DataTableValueArray } from 'primereact/datatable';
import { useState, ReactNode, useEffect } from 'react';
import { useModuleContext } from '../../../../hooks/useModules';
import { usePermisos } from '../../../../hooks/usePermisos';
import { BasicTableHeader } from './components/BasicTableHeader';
import { ICustomColumnItem } from './interfaces/custombasictable';
import { RootState } from '@redux/store/store';
import { useSelector } from 'react-redux';

interface ExtendedColumnItem extends ICustomColumnItem {
    filterField?: string;
    filterFunction?: (value: any, filter: string) => boolean;
    showFilterMenu?: boolean;
    filterMatchMode?: FilterMatchMode;
}

interface TableData {
    id: number | string;
    [key: string]: any;
}

interface Props {
    filterDisplay?: "row" | "menu",
    rows?: number,
    rowsPerPageOptions?: number[],
    tableTitle?: string,
    globalFilterFields?: string[],
    filterFields?: string[];
    scrollable?: boolean;
    data: TableData[],
    loading: boolean;
    columns: ExtendedColumnItem[],
    handleDelete: (id: number | string) => Promise<void>;
    size?: 'small' | 'normal' | 'large'
    rowExpansionTemplate: (rowData: TableData) => ReactNode;
    isRowExpandable: (rowData: TableData) => boolean;
    showGridlines?: boolean;
}

export default function CustomExpandTable({
    filterDisplay = "row",
    rows = 5,
    rowsPerPageOptions = [5, 10, 25, 50],
    tableTitle = '',
    scrollable = true,
    loading,
    data,
    columns = [],
    handleDelete,
    rowExpansionTemplate,
    isRowExpandable,
    size = 'normal'
}: Props) {
    const { setVisible, setRowData } = useModuleContext();
    const permisos = usePermisos();
    const { showGridlines } = useSelector((state: RootState) => state.ui);
    const globalFilterFields = columns.map(column => column.field).filter((field): field is string => field !== undefined);
    const filterFields = columns.map(column => column.field).filter((field): field is string => field !== undefined);

    const initialFilters = (): DataTableFilterMeta => {
        const fields = filterFields.reduce((acc, field) => {
            const column = columns.find(col => col.field === field);
            acc[field] = {
                value: null,
                matchMode: column?.filterMatchMode || FilterMatchMode.CONTAINS
            };
            return acc;
        }, {} as DataTableFilterMeta);
        fields.global = { value: null, matchMode: FilterMatchMode.CONTAINS };
        return fields;
    };

    const [filters, setFilters] = useState<DataTableFilterMeta>(initialFilters);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };
        const globalFilter = _filters['global'];

        if ('value' in globalFilter) {
            globalFilter.value = value;
        }

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const edit = (rowData: any) => {
        setRowData(rowData);
        setVisible(true);
    }

    const actionBodyTemplate = (rowData: TableData) => {
        const handleDeleteClick = async (id: number | string) => {
            try {
                await handleDelete(id);
            } catch (error) {
                console.error('Error al eliminar:', error);
            }
        };

        return (
            <>
                {permisos.puedeModificar && (
                    <Button
                        icon="pi pi-pencil"
                        rounded
                        outlined
                        className="mr-2"
                        onClick={() => edit(rowData)}
                    />
                )}
                {permisos.puedeBorrar && (
                    <Button
                        icon="pi pi-trash"
                        rounded
                        outlined
                        severity="danger"
                        onClick={() => handleDeleteClick(rowData.id)}
                    />
                )}
            </>
        );
    };

    const header = (
        <BasicTableHeader
            filterFields={filterFields}
            globalFilterFields={globalFilterFields}
            onGlobalFilterChange={onGlobalFilterChange}
            tableTitle={tableTitle}
            globalFilterValue={globalFilterValue}
        />
    );

    useEffect(() => {
        if (!data || data.length === 0) {
            setFilters(initialFilters());
            setGlobalFilterValue('');
            setExpandedRows(undefined);
        }
    }, [data]);

    return (
        <DataTable
            showGridlines={showGridlines}
            value={Array.isArray(data) ? data : []}
            paginator
            rows={rows}
            rowsPerPageOptions={rowsPerPageOptions}
            dataKey="id"
            filters={filters}
            filterDisplay={filterDisplay}
            scrollable={scrollable}
            scrollHeight={scrollable ? '70vh' : ''}
            loading={loading}
            header={header}
            globalFilterFields={globalFilterFields}
            size={size}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first}-{last} de un total de {totalRecords} registros"
            emptyMessage="No se encontraron datos"
            rowExpansionTemplate={rowExpansionTemplate}
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
        >
            <Column expander={isRowExpandable} style={{ width: '3rem' }} />
            {columns.map((column) => (
                <Column
                    key={column.field}
                    field={column.field}
                    header={column.header}
                    sortable={column.sortable}
                    filter={column.filter}
                    filterPlaceholder={column.filterPlaceholder}
                    style={{ minWidth: '12rem' }}
                    dataType={column.dataType}
                    body={column.body ? column.body : undefined}
                    filterField={column.filterField}
                    filterFunction={column.filterFunction}
                    showFilterMenu={column.showFilterMenu}
                    filterMatchMode={column.filterMatchMode}
                />
            ))}
            <Column header='Acciones' body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
        </DataTable>
    );
}
