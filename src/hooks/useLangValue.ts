import { lang } from "@langs/index";
import { useMemo } from "react";

export const useLangValue = (moduleKey: string, path: string, fallback: string) => {
    return useMemo(() => {
        const moduleLang = lang[moduleKey as keyof typeof lang];
        return path.split(".").reduce((acc: any, part) => acc?.[part], moduleLang) || fallback;
    }, [moduleKey, path, fallback]);
};