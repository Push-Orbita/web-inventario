import Compress from "compress.js";
import { useField, useFormikContext } from "formik";
import { Button } from "primereact/button";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { Message } from "primereact/message";
import { useEffect, useState } from "react";

interface FormFileUploadProps {
    label: string;
    name: string;
    multiple?: boolean;
    accept?: string;
    maxFileSize?: number;
}

export const FormFileUpload = ({ label, name, multiple = false, accept, maxFileSize }: FormFileUploadProps) => {
    const [{ value }, meta] = useField(name);
    const { setFieldValue } = useFormikContext();

    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);


    useEffect(() => {
        if (value) {
            setSelectedFile(value);
        }
    }, [meta.value]);

    const compressImage = async (file: File): Promise<File> => {
        const compress = new Compress();
        const compressedFiles = await compress.compress([file], {
            size: 0.2,
            quality: 0.75,
            maxWidth: 1024,
            maxHeight: 1024,
            resize: true,
            convertSize: Infinity,
        } as any);

        const { data, ext } = compressedFiles[0];
        const compressedBlob = await fetch(`data:image/${ext};base64,${data}`).then((res) => res.blob());
        return new File([compressedBlob], file.name, { type: file.type });
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const onFileSelect = async (event: FileUploadHandlerEvent) => {
        const files = event.files;
        if (!files.length) return;

        try {
            const processedFiles = await Promise.all(
                files.map(async (file) => {
                    // Si es PNG, no comprimir
                    if (file.type === "image/png") {
                        return await convertFileToBase64(file);
                    }

                    // Comprimir para el resto
                    const compressed = await compressImage(file);
                    return await convertFileToBase64(compressed);
                })
            );

            setFieldValue(name, multiple ? processedFiles : processedFiles[0]);
            setSelectedFile(processedFiles[0]);
            setFileName(files[0].name);
        } catch (error) {
            console.error("Error al procesar la imagen:", error);
        }
    };
    const removeFile = () => {
        setFieldValue(name, "");
        setSelectedFile(null);
        setFileName(null);
    };

    return (
        <div style={{ marginBottom: "1rem" }}>
            <label htmlFor={name} style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
                {label}
            </label>

            {!selectedFile ? (
                <FileUpload
                    mode="basic"
                    name={name}
                    accept={accept}
                    maxFileSize={maxFileSize}
                    multiple={multiple}
                    customUpload
                    auto
                    uploadHandler={onFileSelect}
                    chooseLabel="Seleccionar archivo"
                />
            ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                    {selectedFile.startsWith("data:image") ? (
                        <img src={selectedFile} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }} />
                    ) : (
                        <p style={{ fontSize: "14px", fontStyle: "italic" }}>📂 {fileName}</p>
                    )}
                    <Button icon="pi pi-trash" className="p-button-danger p-button-rounded" onClick={removeFile} tooltip="Eliminar archivo" />
                </div>
            )}

            {meta.touched && meta.error ? <Message severity="error" text={meta.error} style={{ marginTop: "5px" }} /> : null}
        </div>
    );
};
