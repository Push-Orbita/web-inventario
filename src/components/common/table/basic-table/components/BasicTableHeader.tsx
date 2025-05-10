import { InputText } from 'primereact/inputtext';
interface Props {
    tableTitle?: string,
    globalFilterFields?: string[],
    filterFields?: string[];
    onGlobalFilterChange?: any
    globalFilterValue: any
}
export const BasicTableHeader = ({ tableTitle, globalFilterFields, globalFilterValue, onGlobalFilterChange }: Props) => {

    return (
        <>

            <div className="flex-1">
                <div className='flex justify-content-between align-items-center'>
                    <span className="text-xl font-bold" style={{
                        color: 'var(--primary-color)'
                    }}>
                        {tableTitle}
                    </span>
                    {
                        globalFilterFields && globalFilterFields.length > 0 ? (
                            <span className="p-input-icon-left">
                                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar"

                                />
                            </span>
                        ) : ('')
                    }

                </div>
            </div>
        </>
    );
}
