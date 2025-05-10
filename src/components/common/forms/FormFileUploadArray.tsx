import { useEffect, useState } from "react";
import { useField, useFormikContext } from "formik";
import Compress from "compress.js";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Tag } from "primereact/tag";

interface FormFileUploadArrayProps {
    label: string;
    name: string;
    accept?: string;
    maxFileSize?: number;
}

export const FormFileUploadArray = ({
    label,
    name,
    accept = "image/*",
    maxFileSize = 1000000,
}: FormFileUploadArrayProps) => {
    const [{ value }, meta] = useField<string[]>(name);
    const { setFieldValue } = useFormikContext();
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

    useEffect(() => {
        if (Array.isArray(value)) {
            setSelectedFiles(value);
        }
    }, [value]);

    const compressImage = async (file: File): Promise<File> => {
        const compress = new Compress();
        const compressedFiles = await compress.compress([file], {
            size: 0.2,
            quality: 0.75,
            maxWidth: 1024,
            maxHeight: 1024,
            resize: true,
        });

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
        const files = event.files as File[];
        if (!files.length) return;

        try {
            const processedFiles = await Promise.all(
                files.map(async (file) => {
                    if (file.type === "image/png") {
                        return await convertFileToBase64(file); // Sin compresión para PNG
                    }
                    const compressed = await compressImage(file);
                    return await convertFileToBase64(compressed);
                })
            );

            const newFileList = [...selectedFiles, ...processedFiles];

            setFieldValue(name, newFileList);
            setSelectedFiles(newFileList);
        } catch (error) {
            console.error("Error al procesar archivos:", error);
        }
    };
    const removeFile = (index: number) => {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        setFieldValue(name, updatedFiles);
        setSelectedFiles(updatedFiles);
    };

    return (
        <div style={{ marginBottom: "1rem" }}>
            <label htmlFor={name} style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
                {label}
            </label>

            <FileUpload
                mode="basic"
                name={name}
                accept={accept}
                maxFileSize={maxFileSize}
                multiple
                customUpload
                auto
                uploadHandler={onFileSelect}
                chooseLabel="Seleccionar archivos"
            />

            {selectedFiles.length > 0 && (
                <div style={{ marginTop: "10px" }}>
                    {selectedFiles.map((file, index) => (
                        <div
                            key={index}
                            className="flex align-items-center gap-3"
                            style={{
                                marginTop: "10px",
                                padding: "8px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {file.startsWith("data:image") ? (
                                <img src={file} alt={`preview-${index}`} style={{ width: "80px", height: "80px", objectFit: "cover" }} />
                            ) : (
                                <Tag value="Archivo" severity="info" />
                            )}
                            <Button
                                icon="pi pi-trash"
                                className="p-button-danger p-button-rounded"
                                onClick={() => removeFile(index)}
                                tooltip="Eliminar archivo"
                            />
                        </div>
                    ))}
                </div>
            )}

            {meta.touched && meta.error ? <Message severity="error" text={meta.error} style={{ marginTop: "5px" }} /> : null}
        </div>
    );
};
