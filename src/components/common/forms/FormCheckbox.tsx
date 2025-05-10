import { useField } from 'formik';
import { Checkbox } from 'primereact/checkbox';
import '../style/check-box.css'
interface Props {
    label: string;
    name: string;
    [x: string]: any;
}

export const FormCheckbox = ({ label, ...props }: Props) => {
    const [field, meta, helpers] = useField({ ...props, type: 'checkbox' });
    const { setValue } = helpers;

    return (
        <div className="p-field-checkbox">
            <Checkbox
                inputId={props.name}
                checked={field.value}
                onChange={(e) => setValue(e.checked)}
                {...props}
            />
            <label htmlFor={props.name} style={{ paddingLeft: '10px' }}>
                {label}
            </label>
            {meta.touched && meta.error ? (
                <div style={{ color: 'var(--red-500)' }}>
                    {meta.error}
                </div>
            ) : null}
        </div>
    );
};


//Implementacion
{/* <FormCheckbox
    label="Accept"
    name="acceptTerms"
/> */}
