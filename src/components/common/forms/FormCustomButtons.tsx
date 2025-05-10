import { t } from "i18next";
import { Button } from "primereact/button";
import { lang } from "../../../langs";
import { useFormikContext } from "formik";

interface Props {
    onCancel: () => void;
}

const FormCustomButtons = ({ onCancel }: Props) => {
    const { isSubmitting, handleSubmit } = useFormikContext();

    return (
        <div className="flex justify-content-end flex-wrap gap-3">
            <Button
                type="button"
                label={t(lang.common.actions.cancel)}
                icon="pi pi-times"
                onClick={onCancel}
                className="p-button-text"
                disabled={isSubmitting}
            />
            <Button
                type="button"
                label={t(lang.common.actions.save)}
                icon="pi pi-save"
                disabled={isSubmitting}
                onClick={() => handleSubmit()}
            />
        </div>
    );
};

export default FormCustomButtons;