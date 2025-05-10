import { Form, FieldArray, useFormikContext } from "formik";
import { FC, useEffect } from "react";
import useSelectOptions from "@hooks/useSelectOptions";
import FormCustomButtons from "./FormCustomButtons";
import { FormTextInput } from "./FormTextInput";
import { FormEditorInput } from "./FormEditorInput";
import { FormAutoComplete } from "./FormAutoComplete";
import { FormCheckbox } from "./FormCheckbox";
import FormDatePicker from "./FormDatePicker";
import { Message } from "primereact/message";
import { FormSelect } from "./FormSelect";
import { FormFileUpload } from "./FormFileUpload";
import { FormMultiSelect } from "./FormMultiSelect";
import { FormFileUploadArray } from "./FormFileUploadArray";
import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import FormIconSelect from "./FormIconSelect";
import { getLangMessage } from "@helpers/getLangMessage.helper";
import { t } from "i18next";

export interface FieldConfig {
    name: string;
    label?: string;
    type: "number" | "text" | "email" | "password" | "date" | "select" | "multiselect" | "editor" | "autocomplete" | "checkbox" | "upload" | "upload-array" | "array" | "icon-select";
    fields?: FieldConfig[];
    selectKey?: string;
    optionLabel?: string;
    options?: any[];
    placeholder?: string;
    disabled?: boolean | ((rowData?: any) => boolean);
    rowData?: any;
    gridSize?: "full" | "medium" | "quarter";
    hidden?: boolean;
    defaultValue?: string | number | boolean | [] | {};
    uppercase?: boolean;
    pascalCase?: boolean;
    capitalize?: boolean;
}

interface Props {
    fields: FieldConfig[];
    rowData?: any;
    onCancel: () => void;
    title?: string;
    moduleKey: string;
}

const getGridClass = (gridSize?: string) => {
    switch (gridSize) {
        case "full":
            return "col-12";
        case "medium":
            return "col-12 md:col-6";
        case "quarter":
            return "col-12 md:col-6 lg:col-4";
        default:
            return "col-12 md:col-6 lg:col-4";
    }
};

const DynamicFormFields: FC<Props> = ({ fields, rowData, onCancel, title = "Título", moduleKey }) => {
    const formik = useFormikContext<any>();

    if (!formik) {
        console.error("DynamicFormFields debe estar dentro de Formik.");
        return null;
    }

    useEffect(() => {
        if (!rowData) {
            fields.forEach(({ name, defaultValue }) => {
                if (defaultValue !== undefined && formik.values[name] === undefined) {
                    formik.setFieldValue(name, defaultValue);
                }
            });
        }
    }, [fields, rowData, formik]);
    const resolveLabel = (fieldName: string) =>
        t(getLangMessage(moduleKey, `form.${fieldName}`)) || "Label";

    return (

        <>

            <Form onSubmit={formik.handleSubmit}>
                <div className="col-12">
                    <Message
                        severity={rowData ? "warn" : "info"}
                        text={title}
                        style={{ width: "100%", fontSize: "900", height: "3rem" }}
                    />
                </div>
                <div className="p-fluid formgrid grid mb-3">
                    {fields.map(field => {
                        const {
                            name, label, type, selectKey, optionLabel, placeholder,
                            disabled, gridSize, hidden, uppercase, pascalCase, capitalize, fields: subFields
                        } = field;

                        if (hidden) {
                            return <input key={name} type="hidden" name={name} />;
                        }

                        const isDisabled = typeof disabled === "function" ? disabled(rowData) : disabled;
                        const columnClass = getGridClass(gridSize);
                        const optionsData = field.options ?? [];
                        const shouldUseSelectKey = !field.options && selectKey;
                        const labelFromLang = t(getLangMessage(moduleKey, `form.${name}`)) || "Label";

                        if (type === "array" && Array.isArray(subFields)) {
                            return (
                                <div key={name} className="col-12 mt-3">
                                    <Fieldset legend={label} className="custom-fieldset">
                                        <FieldArray
                                            name={name}
                                            render={(arrayHelpers) => (
                                                <>
                                                    {!Array.isArray(formik.values[name]) || formik.values[name].length === 0 ? (
                                                        <Message
                                                            className="w-full justify-content-start h-3rem m-2"
                                                            severity="info"
                                                            text={`No hay ${label?.toLowerCase() ?? "elementos"} agregados`}
                                                        />
                                                    ) : (
                                                        formik.values[name].map((_: any, index: number) => (
                                                            <div
                                                                key={index}
                                                                className="p-fluid border-round border-1 surface-border p-3 mb-3"
                                                            >
                                                                {/* Grilla de campos */}
                                                                <div className="grid">
                                                                    {subFields.map((subField) => {
                                                                        const fieldName = `${name}[${index}].${subField.name}`;
                                                                        const subColumnClass = getGridClass(subField.gridSize);
                                                                        const { options, isLoading } = subField.selectKey
                                                                            ? useSelectOptions(
                                                                                subField.selectKey,
                                                                                (item) => item[subField.optionLabel ?? "nombre"]
                                                                            )
                                                                            : { options: [], isLoading: false };
                                                                        const isDisabled =
                                                                            typeof subField.disabled === "function"
                                                                                ? subField.disabled(rowData)
                                                                                : subField.disabled;

                                                                        return (
                                                                            <div key={fieldName} className={subColumnClass}>
                                                                                {subField.type === "text" ||
                                                                                    subField.type === "email" ||
                                                                                    subField.type === "password" ||
                                                                                    subField.type === "number" ? (
                                                                                    <FormTextInput
                                                                                        name={fieldName}
                                                                                        label={resolveLabel(subField.name)}
                                                                                        type={subField.type}
                                                                                        placeholder={subField.placeholder}
                                                                                        disabled={isDisabled}
                                                                                        uppercase={subField.uppercase}
                                                                                        pascalCase={subField.pascalCase}
                                                                                        capitalize={subField.capitalize}
                                                                                    />
                                                                                ) : subField.type === "select" ? (
                                                                                    <FormSelect
                                                                                        name={fieldName}
                                                                                        label={resolveLabel(subField.name)}
                                                                                        optionLabel={subField.optionLabel ?? "nombre"}
                                                                                        options={options}
                                                                                        disabled={isDisabled || isLoading}
                                                                                    />
                                                                                ) : subField.type === "multiselect" ? (
                                                                                    <FormMultiSelect
                                                                                        label={resolveLabel(subField.name)}
                                                                                        name={fieldName}
                                                                                        optionLabel={subField.optionLabel ?? "nombre"}
                                                                                        options={options}
                                                                                        isLoading={isLoading}
                                                                                        disabled={isDisabled}
                                                                                        placeholder={subField.placeholder}
                                                                                    />
                                                                                ) : subField.type === "date" ? (
                                                                                    <FormDatePicker label={resolveLabel(subField.name)} name={fieldName} disabled={isDisabled} />
                                                                                ) : subField.type === "editor" ? (
                                                                                    <FormEditorInput name={fieldName} label={resolveLabel(subField.name)} />
                                                                                ) : subField.type === "autocomplete" ? (
                                                                                    <FormAutoComplete
                                                                                        label={resolveLabel(subField.name)}
                                                                                        name={fieldName}
                                                                                        optionLabel={subField.optionLabel ?? "nombre"}
                                                                                        options={options}
                                                                                    />
                                                                                ) : subField.type === "checkbox" ? (
                                                                                    <FormCheckbox label={resolveLabel(subField.name)} name={fieldName} />
                                                                                ) : subField.type === "upload" ? (
                                                                                    <FormFileUpload name={fieldName} label={resolveLabel(subField.name)} accept="image/*" />
                                                                                ) : subField.type === "upload-array" ? (
                                                                                    <FormFileUploadArray name={fieldName} label={resolveLabel(subField.name)} accept="image/*" />
                                                                                ) : subField.type === "icon-select" ? (
                                                                                    <FormIconSelect name={fieldName} label={resolveLabel(subField.name)} />
                                                                                ) : (
                                                                                    <div className="text-red-500">Tipo no soportado: {subField.type}</div>
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    })}

                                                                    {/* Botón Eliminar debajo alineado a la derecha */}
                                                                    <div className="col-12 flex justify-content-end mt-2">
                                                                        <Button
                                                                            icon="pi pi-trash"
                                                                            severity="danger"
                                                                            label="Eliminar"
                                                                            type="button"
                                                                            onClick={() => arrayHelpers.remove(index)}
                                                                            className="p-button-sm w-full md:w-auto"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))

                                                    )}

                                                    {/* Botón agregar */}
                                                    <div className="col-12 md:col-4 mt-3">
                                                        <Button
                                                            type="button"
                                                            icon="pi pi-plus"
                                                            label={`Agregar ${label}`}
                                                            onClick={() => arrayHelpers.push({})}
                                                            className="p-button-sm p-button-outlined w-full md:w-auto"
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        />
                                    </Fieldset>
                                </div>
                            );
                        }



                        const { options, isLoading } = shouldUseSelectKey
                            ? useSelectOptions(selectKey, item => item[optionLabel ?? "nombre"])
                            : { options: optionsData, isLoading: false };

                        return (
                            <div key={name} className={`${columnClass} mt-2`}>
                                {type === "text" || type === "email" || type === "password" || type === "number" ? (
                                    <FormTextInput
                                        label={labelFromLang}
                                        name={name}
                                        type={type}
                                        placeholder={placeholder}
                                        disabled={isDisabled}
                                        uppercase={uppercase}
                                        pascalCase={pascalCase}
                                        capitalize={capitalize}
                                    />
                                ) : type === "select" ? (
                                    <FormSelect
                                        label={labelFromLang}
                                        name={name}
                                        optionLabel={optionLabel ?? "nombre"}
                                        options={options}
                                        disabled={isDisabled || isLoading}
                                    />
                                ) : type === "multiselect" ? (
                                    <FormMultiSelect
                                        label={labelFromLang}
                                        name={name}
                                        optionLabel={optionLabel ?? "nombre"}
                                        options={options}
                                        isLoading={isLoading}
                                        disabled={isDisabled}
                                        placeholder={placeholder}
                                    />
                                ) : type === "date" ? (
                                    <FormDatePicker label={labelFromLang} name={name} disabled={isDisabled} />
                                ) : type === "editor" ? (
                                    <FormEditorInput label={labelFromLang} name={name} />
                                ) : type === "autocomplete" ? (
                                    <FormAutoComplete
                                        label={labelFromLang}
                                        name={name}
                                        optionLabel={optionLabel ?? "nombre"}
                                        options={options}
                                    />
                                ) : type === "checkbox" ? (
                                    <FormCheckbox label={labelFromLang} name={name} />
                                ) : type === "upload" ? (
                                    <FormFileUpload name={name} label={labelFromLang} accept="image/*" />
                                ) : type === "upload-array" ? (
                                    <FormFileUploadArray name={name} label={labelFromLang} accept="image/*" />
                                ) : type === "icon-select" ? (
                                    <FormIconSelect name={name} label={labelFromLang} />
                                ) : null}
                            </div>
                        );
                    })}
                </div>
                <FormCustomButtons onCancel={onCancel} />
            </Form>
        </>
    );
};

export default DynamicFormFields;
