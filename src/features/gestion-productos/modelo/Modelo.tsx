import DynamicCrudPage from "@components/common/cruds/DynamicCrudPage";
import { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";

const ModeloView = () => {
  const formFields: FieldConfig[] = [
    { name: "nombre", type: "text", gridSize: "medium" },
  ];

  const columns: ICustomColumnItem[] = [
    { field: "nombre", header: "Nombre", sortable: true, filter: true, filterPlaceholder: "Buscar por nombre" },
  ];

  return (
    <DynamicCrudPage
      moduleKey="modelo"
      formFields={formFields}
      columns={columns}
    />
  );
};

export default ModeloView;