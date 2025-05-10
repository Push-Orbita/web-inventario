import { useEffect, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    fullWidth?: boolean;
    [x: string]: any;
}

export const FormEditorInput = ({ label, ...props }: Props) => {
    const [field, meta] = useField(props);
    const { setFieldValue } = useFormikContext();
    const [editorContent, setEditorContent] = useState("");

    useEffect(() => {
        if (field.value) {

            setEditorContent(field.value);
        }
    }, [field.value]);

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <Editor
                id={props.name}
                name={field.name}
                value={editorContent} // Aseguramos que el HTML se pase correctamente
                onTextChange={(e: EditorTextChangeEvent) => setFieldValue(props.name, e.htmlValue)}
                style={{ height: '320px' }}
            />

            {meta.touched && meta.error ? (
                <small id={props.name} style={{ color: 'var(--red-500)' }}>
                    {meta.error}
                </small>
            ) : null}
        </>
    );
};
