import { Column } from "primereact/column"
interface Props {
    field: string
    header: string
    sortable?: boolean
    filter?: boolean
    filterPlaceholder?: string
    dataType?: 'text' | 'number' | 'date'
}
export const BasicColumnItem = (
    { field,
        header,
        sortable = true,
        filter = true,
        filterPlaceholder = 'Busqueda',
        dataType = 'text' }: Props) => {
    return (
        <Column
            field={field}
            header={header}
            sortable={sortable}
            filter={filter}
            filterPlaceholder={filterPlaceholder}
            dataType={dataType}
            style={{ minWidth: '12rem' }}
        />
    )
}
