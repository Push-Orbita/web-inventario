import { Field, useFormikContext } from 'formik';
interface Props {
    name: string;
}

const FileUploadWithFormik = ({ name }: Props) => { 
    const formik = useFormikContext();
    return (
        <div className="card flex justify-content-center">
            <Field
                type="file"
                id={name}
                name={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const file = event.currentTarget.files && event.currentTarget.files[0];
                    // Asigna el archivo al campo 'file' en el estado de Formik
                    // Esto es necesario porque el componente Field de Formik no maneja el cambio de archivos automáticamente
                    formik.setFieldValue(name, file);
                }}
            />
        </div>
    );
};

export default FileUploadWithFormik;
