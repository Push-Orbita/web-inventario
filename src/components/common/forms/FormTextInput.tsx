import React from 'react';
import { useField } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

interface Props {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password' | 'time' | 'number' | 'date';
    placeholder?: string;
    fullWidth?: boolean;
    uppercase?: boolean;
    pascalCase?: boolean;
    capitalize?: boolean;
    maxLength?: number;
    [x: string]: any;
}

export const FormTextInput = ({
    label,
    type = 'text',
    uppercase = false,
    pascalCase = false,
    capitalize = false,
    maxLength,
    ...props
}: Props) => {
    const [field, meta, helpers] = useField(props);

    const toPascalCase = (text: string) => {
        return text
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const toCapitalize = (text: string) => {
        if (text.length === 0) return text;
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (uppercase) {
            value = value.toUpperCase();
        } else if (pascalCase) {
            value = toPascalCase(value);
        } else if (capitalize) {
            value = toCapitalize(value);
        }

        if (maxLength && value.length > maxLength) {
            value = value.slice(0, maxLength);
        }

        helpers.setValue(value);
    };

    return (
        <>
            <label htmlFor={props.name} style={{ paddingTop: '10px' }}>{label}</label>
            <InputText
                id={props.name}
                aria-describedby={props.name}
                {...field}
                {...props}
                value={field.value}
                type={type}
                onChange={handleChange}
            />
            {meta.touched && meta.error ? (
                <Message id={`${props.name}-help`} severity="error" text={meta.error} style={{ marginTop: '5px' }} />
            ) : null}
        </>
    );
};
