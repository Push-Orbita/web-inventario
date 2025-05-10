import React, { useEffect } from "react";
import { t } from "i18next";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";

import { getEntityAdapter } from "@config/api/entityAdapters";
import { useFormHandler } from "@hooks/useFormHandler";
import { useLangValue } from "@hooks/useLangValue";
import { DashboardLayout } from "@layout/DashboardLayout";
import { FieldConfig } from "../forms/DynamicFormFields";

interface Props {
    moduleKey: string;
    data: any;
    isFetching: boolean;
    visible: boolean;
    rowData: any;
    handleDelete: (id: number) => void;
    refetch: () => void;
    startToolbarTemplate: () => React.ReactNode;
    resetModuleState: () => void;
    formFields: FieldConfig[];
    FormComponent: React.FC<{
        title?: string;
        refetch: () => void;
        fields: FieldConfig[];
        rowData?: any;
        onCancel: () => void;
        moduleKey: string;
    }>;
    TableComponent: React.FC<{ data: any; isFetching: boolean; handleDelete: (id: number) => void, moduleKey: string; }>;
    createMutation: any;
    updateMutation: any;
    validationSchema?: Yup.ObjectSchema<any>;
}

export const CrudPage = ({
    moduleKey,
    data,
    isFetching,
    visible,
    rowData,
    handleDelete,
    refetch,
    startToolbarTemplate,
    resetModuleState,
    formFields,
    FormComponent,
    TableComponent,
    createMutation,
    updateMutation,
    validationSchema,
}: Props) => {
    const title = useLangValue(moduleKey, "title", moduleKey);
    const editLabel = useLangValue(moduleKey, "edit", "Editar");
    const newLabel = useLangValue(moduleKey, "new", "Nuevo");

    const formHandler = useFormHandler({
        createMutation,
        updateMutation,
        refetch,
        closeForm: resetModuleState,
        rowData,
    });

    // Obtiene el adaptador para el módulo (si existe)
    const adapter = getEntityAdapter(moduleKey);

    useEffect(() => {
        resetModuleState();
    }, []);

    // Convierte rowData al formato Formik (si hay adapter)
    const initialValues = formFields.reduce((acc, field) => {
        const adaptedData = adapter.toFormik(rowData ?? {});
        acc[field.name] = adaptedData[field.name] ?? field.defaultValue ?? "";
        return acc;
    }, {} as Record<string, any>);

    const tableData = adapter.toTable ? adapter.toTable(data ?? []) : data ?? [];

    // Maneja el submit adaptando los valores al formato esperado por la API
    const handleSubmit = (values: any, formikHelpers: FormikHelpers<any>) => {
        const adaptedValues = adapter.toApi(values);
        return formHandler(adaptedValues, formikHelpers);
    };



    return (
        <DashboardLayout>
            <div className="text-3xl mt-2 mb-2">{t(title)}</div>
            <div className="card">
                {visible ? (
                    <Formik<any>
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <FormComponent
                                title={rowData ? t(editLabel) : t(newLabel)}
                                refetch={refetch}
                                fields={formFields}
                                rowData={rowData}
                                onCancel={() => resetModuleState()}
                                moduleKey={moduleKey}
                            />
                        )}
                    </Formik>
                ) : (
                    <div>
                        <div className="grid">
                            <div className="col-12">{startToolbarTemplate()}</div>
                        </div>
                        <TableComponent
                            data={tableData}
                            isFetching={isFetching}
                            handleDelete={handleDelete}
                            moduleKey={moduleKey}
                        />
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};