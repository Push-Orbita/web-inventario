import { useField, FieldHookConfig } from 'formik';
import { InputText, InputTextProps } from 'primereact/inputtext';

interface Props extends InputTextProps {
    label: string;
    name: string;
    icon?: string;
}

export const FormTextInputIcon = ({ label, icon, ...props }: Props) => {
    // Extraer solo las props relevantes para Formik
    const [field, meta] = useField(props as FieldHookConfig<string>);

    return (
        <div>
            {label && (
                <label htmlFor={props.name} style={{ paddingTop: '10px' }}>
                    {label}
                </label>
            )}
            <div className="p-inputgroup flex-1">
                {icon && (
                    <span className="p-inputgroup-addon">
                        <i className={icon}></i>
                    </span>
                )}
                <InputText
                    id={props.name}
                    {...field}  // Solo las props que Formik necesita (name, value, onChange, onBlur)
                    {...(props as InputTextProps)}  // Pasar el resto de props a InputText, con tipado adecuado
                />
            </div>
            {meta.touched && meta.error ? (
                <div style={{ color: 'var(--red-500)' }}>
                    {meta.error}
                </div>
            ) : null}
        </div>
    );
};
