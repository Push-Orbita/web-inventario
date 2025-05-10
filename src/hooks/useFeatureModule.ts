import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { t } from "i18next";
import toast from "react-hot-toast";
import { lang } from "../langs";
import { confirmDialog } from "primereact/confirmdialog";
import { getServiceApi, ModuleKey } from "@config/api/serviceRegistry";


// Este hook es ahora genérico y sabe el tipo de datos según el módulo
export const useFeatureModule = <M extends ModuleKey>(moduleKey: M) => {
    const apiService = getServiceApi(moduleKey);
    const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<any>(moduleKey, apiService.getAll);
    const getLangMessage = (key: string, path: string) => {
        return path.split(".").reduce((acc: any, part) => acc?.[part], lang[key as keyof typeof lang]) || "Mensaje no encontrado";
    };
    const createMutation = UseQueryMutation({
        requestFn: apiService.create,
        options: {
            onError() {
                toast.error(t(getLangMessage(moduleKey, "messages.createdError")));
            },
            onSuccess: () => {
                refetch();
                toast.success(t(getLangMessage(moduleKey, "messages.createdSuccess")));
                resetModuleState();
            },
        },
    });
    const updateMutation = UseQueryMutation({
        requestFn: apiService.update,
        options: {
            onError() {
                toast.error(t(getLangMessage(moduleKey, "messages.updatedError")));
            },
            onSuccess: () => {
                refetch();
                toast.success(t(getLangMessage(moduleKey, "messages.updatedSuccess")));
                resetModuleState();
            },
        },
    });
    const deleteMutation = UseQueryMutation({
        requestFn: apiService.delete,
        options: {
            onError() {
                toast.error(t(getLangMessage(moduleKey, "messages.deletedError")));
            },
            onSuccess: () => {
                refetch();
                toast.success(t(getLangMessage(moduleKey, "messages.deletedSuccess")));
            },
        },
    });
    const handleDelete = (id: number) => {
        confirmDialog({
            message: t(lang.common.labels.deleteMessage),
            header: t(lang.common.labels.deleteMessageTitle),
            icon: "pi pi-exclamation-triangle text-yellow-500",
            acceptClassName: "p-button-danger",
            acceptLabel: t(lang.common.actions.confirm),
            rejectLabel: t(lang.common.actions.cancel),
            accept: async () => {
                await deleteMutation.mutateAsync(id);
            },
        });
    };

    return {
        data,
        isFetching,
        refetch,
        rowData,
        startToolbarTemplate,
        visible,
        resetModuleState,
        handleDelete,
        createMutation,
        updateMutation,
    };
};