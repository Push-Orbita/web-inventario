import { lang } from "@langs/index";
import { t } from "i18next";

import * as Yup from "yup";

interface NumberValidationOptions {
    isRequired?: boolean;
    min?: number;
    max?: number;
    lessThan?: number;
    moreThan?: number;
    integer?: boolean;
    positive?: boolean;
    negative?: boolean;
    round?: 'floor' | 'ceil' | 'trunc' | 'round';
    precision?: number;
    allowZero?: boolean;
    multipleOf?: number;
    range?: {
        min: number;
        max: number;
        inclusive?: boolean;
    };
    decimalSeparator?: '.' | ',';
    thousandSeparator?: boolean;
}

export const numberValidation = (options: NumberValidationOptions = {}) => {
    let validation = Yup.number();

    if (options.isRequired) {
        validation = validation.required(t(lang.common.validationString.fieldRequired.toString()));
    }

    if (options.positive) {
        validation = validation.test(
            'positive-or-zero',
            t(lang.common.validationNumber.mustBePositive.toString()),
            value => value === undefined || value >= 0
        );
    }

    if (options.negative) {
        validation = validation.negative(t(lang.common.validationNumber.mustBeNegative.toString()));
    }

    if (options.min !== undefined) {
        validation = validation.min(options.min, t(lang.common.validationNumber.minValue.toString()));
    }

    if (options.max !== undefined) {
        validation = validation.max(options.max, t(lang.common.validationNumber.maxValue.toString()));
    }

    if (options.lessThan !== undefined) {
        validation = validation.lessThan(options.lessThan, t(lang.common.validationNumber.lessThan.toString()));
    }

    if (options.moreThan !== undefined) {
        validation = validation.moreThan(options.moreThan, t(lang.common.validationNumber.moreThan.toString()));
    }

    if (options.integer) {
        validation = validation.integer(t(lang.common.validationNumber.mustBeInteger.toString()));
    }

    if (options.round) {
        validation = validation.round(options.round);
    }

    if (options.precision !== undefined) {
        const precision = options.precision;
        validation = validation.test(
            'precision',
            ({ path }) => t(lang.common.validationNumber.precision.toString(), {
                field: path,
                precision: precision
            }),
            value => {
                if (value === undefined || value === null || (typeof value === 'string' && value === '')) return true;
                const numValue = typeof value === 'string' ? parseFloat(value) : Number(value);
                if (isNaN(numValue)) return true;
                const decimalStr = numValue.toString();
                const decimalPart = decimalStr.split('.')[1];
                
                // Si no hay parte decimal, es válido (permite escribir la parte entera)
                if (!decimalPart) return true;
                
                // Si hay parte decimal, verifica que no exceda la precisión
                return decimalPart.length <= precision;
            }
        );
    }

    if (!options.allowZero) {
        validation = validation.test(
            'not-zero',
            t(lang.common.validationNumber.cannotBeZero.toString()),
            value => value === undefined || value !== 0
        );
    }

    if (options.multipleOf !== undefined) {
        const multipleOf = options.multipleOf;
        validation = validation.test(
            'multiple-of',
            t(lang.common.validationNumber.mustBeMultipleOf.toString()),
            value => value === undefined || value % multipleOf === 0
        );
    }

    if (options.range !== undefined) {
        const { min, max } = options.range;
        validation = validation.test(
            'range',
            t(lang.common.validationNumber.mustBeInRange.toString()),
            value => value === undefined || (value >= min && value <= max)
        );
    }

    if (options.decimalSeparator !== undefined) {
        validation = validation.test(
            'decimal-separator',
            t(lang.common.validationNumber.invalidDecimalSeparator.toString()),
            value => {
                const separator = options.decimalSeparator as string;
                return value === undefined || value.toString().includes(separator);
            }
        );
    }

    if (options.thousandSeparator !== undefined) {
        validation = validation.test(
            'thousand-separator',
            t(lang.common.validationNumber.invalidThousandSeparator.toString()),
            value => value === undefined || value.toString().includes(',')
        );
    }

    return validation;
};