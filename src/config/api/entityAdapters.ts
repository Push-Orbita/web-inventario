
import { contactoToTable } from "@features/contacto/adapter/contacto.adapter";
import { formikToSeccionNormas, seccionNormasToFormik } from "@features/inicio/seccion-normas/model/adapter/seccionNormas.adapter";
import { formikToProceso, procesoToFormik } from "@features/nosotros/proceso/adapter/proceso.adapter";
import { noticiaToFormik, formikToNoticia } from "@features/noticia/model/adapter/noticia.adapter";

const entityAdapters = {
    noticia: {
        toFormik: noticiaToFormik,
        toApi: formikToNoticia
    },
    seccionNormas: {
        toFormik: seccionNormasToFormik,
        toApi: formikToSeccionNormas,
    },
    proceso: {
        toFormik: procesoToFormik,
        toApi: formikToProceso
    },
    contacto: {
        toTable: contactoToTable
    }
};

export type ModuleKey = keyof typeof entityAdapters;
export const getEntityAdapter = (moduleKey: string) => {
    const defaultAdapter = {
        toFormik: (data: any) => data,
        toApi: (data: any) => data,
        toTable: (input: any) => {
            const normalized = Array.isArray(input)
                ? input
                : Array.isArray(input?.data)
                    ? input.data
                    : input
                        ? [input]
                        : [];

            return {
                data: normalized,
                metadata: {
                    count: normalized.length,
                    pageNumber: 1,
                    pageSize: normalized.length,
                    totalPages: 1,
                },
            };
        },
    };

    return {
        ...defaultAdapter,
        ...entityAdapters[moduleKey as ModuleKey],
    };
};