import { ModuleKey } from "@config/api/serviceRegistry";
import { useFeatureModule } from "@hooks/useFeatureModule";

import DynamicFormFields, { FieldConfig } from "@components/common/forms/DynamicFormFields";
import DynamicTable from "../table/basic-table/DynamicTable";
import { ICustomColumnItem } from "../table/basic-table/interfaces/custombasictable";
import { CrudPage } from "./CrudPage";

interface Props {
    moduleKey: ModuleKey;
    formFields: FieldConfig[];
    columns: ICustomColumnItem[];
    validationSchema?: any;
}

const DynamicCrudPage = ({ moduleKey, formFields, columns, validationSchema }: Props) => {
    const feature = useFeatureModule(moduleKey);
    return (
        <CrudPage
            moduleKey={moduleKey}
            FormComponent={DynamicFormFields}
            TableComponent={({ data, isFetching, handleDelete, moduleKey }) => (
                <DynamicTable
                    data={data}
                    isFetching={isFetching}
                    columns={columns}
                    handleDelete={handleDelete}
                    moduleKey={moduleKey}
                />
            )}
            formFields={formFields}
            validationSchema={validationSchema}
            {...feature}
        />
    );
};

export default DynamicCrudPage;