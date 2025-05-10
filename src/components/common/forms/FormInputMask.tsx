import { useField } from 'formik';
import { InputMask } from 'primereact/inputmask';
import { Message } from 'primereact/message';

interface Props {
    label: string;
    name: string;
    mask: string;
    placeholder?: string;
    fullWidth?: boolean;
    [x: string]: any;
}

export const FormInputMask = ({ label, mask, ...props }: Props) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.name} style={{ paddingTop: '10px' }}>{label}</label>
            <InputMask
                id={props.name}
                aria-describedby={props.name}
                {...field}
                {...props}
                mask={mask}  // Aplica la máscara pasada como prop
                value={field.value}
            />
            {meta.touched && meta.error ? (
                <Message id={`${props.name}-help`} severity="error" text={meta.error} style={{ marginTop: '5px' }} />
            ) : null}
        </>
    );
};
