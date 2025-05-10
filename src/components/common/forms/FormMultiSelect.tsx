import { useField } from "formik";
import { MultiSelect } from "primereact/multiselect";
import { Message } from "primereact/message";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    labelId?: string;
    options: any[];
    optionLabel: string;
    onChange?: (value: any) => void;
    isLoading?: boolean;
    disabled?: boolean;
    size?: 'p-inputtext-sm' | 'p-inputtext-lg' | 'normal';
    textSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl'
    maxSelectedLabels?: number;
    [x: string]: string | undefined | any;
}

export const FormMultiSelect = ({ label, isLoading, disabled = false, size = 'normal', textSize = 'text-base', maxSelectedLabels = 3, ...props }: Props) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label className={textSize} htmlFor={props.name}>{label}</label>
            <MultiSelect
                filter
                loading={isLoading}
                disabled={disabled}
                inputId={field.name}
                value={field.value}
                onChange={(e) => {
                    field.onChange({
                        target: { name: field.name, value: e.value }
                    });
                    if (props.onChange) {
                        props.onChange(e.value);
                    }
                }}
                onBlur={field.onBlur}
                {...props}
                options={props.options}
                optionLabel={props.optionLabel}
                placeholder={props.placeholder || "Seleccionar"}
                maxSelectedLabels={maxSelectedLabels}
                className={`w-full ${size}`}
            />
            {meta.touched && meta.error ? (
                <Message id={`${props.name}-help`} severity="error" text={meta.error} style={{
                    marginTop: '5px'
                }} />
            ) : null}
        </>
    )
}
