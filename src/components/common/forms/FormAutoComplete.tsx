import { useField } from 'formik';
import { AutoComplete } from 'primereact/autocomplete';
import { Message } from 'primereact/message';

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    options: any;
    optionLabel: string;
    onChange?: (value: any) => void;
    isLoading?: boolean;
    disabled?: boolean;
    size?: 'p-inputtext-sm' | 'p-inputtext-lg' | 'normal';
    textSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl';
    onInputChange?: (e: any) => void; // Método para manejar la búsqueda dinámica
    [x: string]: any;
}

export const FormAutoComplete = ({
    label,
    isLoading,
    disabled = false,
    size = 'normal',
    textSize = 'text-base',
    onInputChange,
    ...props
}: Props) => {
    const [field, meta, helpers] = useField(props);

    const handleChange = (e: { value: any }) => {
        helpers.setValue(e.value);
        if (props.onChange) {
            props.onChange(e);
        }
    };

    return (
        <>
            <label className={textSize} htmlFor={props.name}>{label}</label>
            <AutoComplete
                disabled={disabled}
                value={field.value}
                suggestions={props.options}
                completeMethod={onInputChange} // Método para cargar las opciones dinámicamente
                field={props.optionLabel}
                onChange={handleChange}
                onBlur={field.onBlur}
                placeholder={props.placeholder}
                dropdown={true} // Agrega un icono de dropdown para sugerencias
                className={`w-full ${size}`}
                {...props}
            />
            {meta.touched && meta.error ? (
                <Message id={`${props.name}-help`} severity="error" text={meta.error} style={{ marginTop: '5px' }} />
            ) : null}
        </>
    );
};
