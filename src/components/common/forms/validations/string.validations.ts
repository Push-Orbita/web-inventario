import { t } from "i18next";
import * as Yup from "yup";
import { lang } from "@langs/index";


interface StringValidationMessages {
    noEmptySpaces?: string;
    noLeadingSpaces?: string;
    noTrailingSpaces?: string;
    required?: string;
    min?: string;
    max?: string;
    length?: string;
    email?: string;
    url?: string;
    matches?: string;
    uppercase?: string;
    lowercase?: string;
    oneOf?: string;
    notOneOf?: string;
}

interface StringValidationOptions {
    isRequired?: boolean;
    min?: number;
    max?: number;
    exactLength?: number;
    isEmail?: boolean;
    isUrl?: boolean;
    pattern?: RegExp;
    isUppercase?: boolean;
    isLowercase?: boolean;
    spaces?: {
        allowEmpty?: boolean;      // Por defecto: false
        allowLeading?: boolean;    // Por defecto: false
        allowTrailing?: boolean;   // Por defecto: false
    };
    allowedValues?: string[];
    disallowedValues?: string[];
    transform?: (value: string) => string;
    isPhone?: boolean;
    isNumericOnly?: boolean;
    allowSpecialChars?: {
        dots?: boolean;
        dashes?: boolean;
        spaces?: boolean;
    };
    alphanumeric?: boolean;
    alphabetic?: boolean;
    customRegex?: {
        pattern: RegExp;
        message: string;
    }[];
    trim?: boolean;
    normalizeCase?: 'upper' | 'lower' | 'capitalize';
}

const defaultMessages = {
    noEmptySpaces: t(lang.common.validationString.noEmptySpaces.toString()),
    noLeadingSpaces: t(lang.common.validationString.noLeadingSpaces.toString()),
    noTrailingSpaces: t(lang.common.validationString.noTrailingSpaces.toString()),
    required: t(lang.common.validationString.fieldRequired.toString()),
    min: t(lang.common.validationString.minLength.toString()),
    max: t(lang.common.validationString.maxLength.toString()),
    length: t(lang.common.validationString.exactLength.toString()),
    email: t(lang.common.validationString.invalidEmail.toString()),
    url: t(lang.common.validationString.invalidUrl.toString()),
    matches: t(lang.common.validationString.patternMismatch.toString()),
    uppercase: t(lang.common.validationString.mustBeUppercase.toString()),
    lowercase: t(lang.common.validationString.mustBeLowercase.toString()),
    oneOf: t(lang.common.validationString.mustBeOneOf.toString()),
    notOneOf: t(lang.common.validationString.cannotBeOneOf.toString())
};

export const stringValidation = (
    options: StringValidationOptions = {},
    customMessages?: StringValidationMessages
) => {
    const messages = {
        ...defaultMessages,
        ...customMessages
    };

    let validation = Yup.string();

    // Aplicar transformación personalizada si se proporciona
    if (options.transform) {
        validation = validation.transform(options.transform);
    }

    // Validaciones de espacios - ahora usando el objeto spaces
    if (!options.spaces?.allowEmpty) {
        validation = validation.test(
            "no-only-spaces",
            messages.noEmptySpaces,
            (value) => !value || value.trim().length > 0
        );
    }

    if (!options.spaces?.allowLeading) {
        validation = validation.test(
            "no-leading-spaces",
            messages.noLeadingSpaces,
            (value) => !value || value.trimStart() === value
        );
    }

    if (!options.spaces?.allowTrailing) {
        validation = validation.test(
            "no-trailing-spaces",
            messages.noTrailingSpaces,
            (value) => !value || value.trimEnd() === value
        );
    }

    // Validaciones de longitud
    if (options.min) {
        validation = validation.min(
            options.min,
            ({ min }) => t(lang.common.validationString.minLength.toString(), { min })
        );
    }

    if (options.max) {
        validation = validation.max(
            options.max,
            ({ max }) => t(lang.common.validationString.maxLength.toString(), { max })
        );
    }

    if (options.exactLength) {
        validation = validation.length(options.exactLength, messages.length);
    }

    // Validaciones de formato
    if (options.isEmail) {
        validation = validation.email(messages.email);
    }

    if (options.isUrl) {
        validation = validation.url(messages.url);
    }

    if (options.pattern) {
        validation = validation.matches(options.pattern, messages.matches);
    }

    // Validaciones de caso
    if (options.isUppercase) {
        validation = validation.uppercase(messages.uppercase);
    }

    if (options.isLowercase) {
        validation = validation.lowercase(messages.lowercase);
    }

    // Validaciones de valores permitidos/no permitidos
    if (options.allowedValues) {
        validation = validation.oneOf(options.allowedValues, messages.oneOf);
    }

    if (options.disallowedValues) {
        validation = validation.notOneOf(options.disallowedValues, messages.notOneOf);
    }

    // Agregar validación para teléfonos
    if (options.isPhone) {
        validation = validation.test(
            'is-valid-phone',
            t(lang.common.validationString.invalidPhone.toString()),
            value => !value || /^[\d\s()-]+$/.test(value)
        );
    }

    // Agregar validación para solo números
    if (options.isNumericOnly) {
        validation = validation.test(
            'numeric-only',
            t(lang.common.validationString.numericOnly.toString()),
            value => !value || /^\d+$/.test(value)
        );
    }

    // Requerido debe ser lo último para mantener consistencia en los mensajes
    if (options.isRequired) {
        validation = validation.required(messages.required);
    }

    return validation;
};
