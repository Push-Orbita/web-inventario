import { useField } from "formik";
import { Dropdown } from "primereact/dropdown";
import { Message } from "primereact/message";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    labelId?: string;
    options: any;
    optionLabel: string;
    onChange?: (value: any) => void;
    isLoading?: boolean;
    disabled?: boolean;
    [x: string]: string | undefined | any;
    children?: any;
}
export const FormSelectInputGroup = ({ label, isLoading, disabled = false, children, ...props }: Props) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <div className="p-inputgroup flex-1">
                <Dropdown
                    filter
                    loading={isLoading}
                    disabled={disabled}
                    inputId={field.value}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    {...props}
                    options={props.options}
                    optionLabel={props.optionLabel}
                    placeholder="Seleccionar" className="w-full" />
                {children}
            </div>
            {meta.touched && meta.error ? (
                <Message id={`${props.name}-help`} severity="error" text={meta.error} style={{
                    marginTop: '5px'
                }} />
            ) : null}
        </>
    )
}
