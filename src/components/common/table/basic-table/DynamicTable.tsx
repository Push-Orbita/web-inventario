import CustomBasicTable from "@components/common/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "./interfaces/custombasictable";
import { getLangMessage } from "@helpers/getLangMessage.helper";
import { t } from "i18next";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
    columns: ICustomColumnItem[];
    moduleKey: string;
}

const DynamicTable = ({ data, isFetching, handleDelete, columns, moduleKey }: Props) => {
    return (
        <CustomBasicTable
            data={data?.data ?? []}
            loading={isFetching}
            columns={columns}
            handleDelete={handleDelete}
            filterDisplay="row"
            rowsPerPageOptions={[10, 100, 1000]}
            rows={10}
            tableTitle={t(getLangMessage(moduleKey, "list"))}
        />
    );
};

export default DynamicTable;
