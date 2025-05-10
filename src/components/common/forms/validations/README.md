# Validaciones de Formularios

Este módulo proporciona utilidades de validación para campos de formulario utilizando Yup.

## Validaciones de String

`stringValidation` permite configurar validaciones para campos de texto.

### Uso Básico

typescript
import { stringValidation } from './string.validations';
// Validación básica
const basicValidation = stringValidation({
isRequired: true,
min: 3,
max: 20
});
// Validación de email
const emailValidation = stringValidation({
isRequired: true,
isEmail: true
});

### Opciones Disponibles para String

| Opción | Tipo | Descripción |
|--------|------|-------------|
| `isRequired` | `boolean` | Campo obligatorio |
| `min` | `number` | Longitud mínima |
| `max` | `number` | Longitud máxima |
| `exactLength` | `number` | Longitud exacta |
| `isEmail` | `boolean` | Validar formato email |
| `isUrl` | `boolean` | Validar formato URL |
| `pattern` | `RegExp` | Patrón personalizado |
| `isUppercase` | `boolean` | Solo mayúsculas |
| `isLowercase` | `boolean` | Solo minúsculas |
| `spaces` | `object` | Configuración de espacios |
| `allowedValues` | `string[]` | Valores permitidos |
| `disallowedValues` | `string[]` | Valores no permitidos |
| `transform` | `function` | Función de transformación |
| `isPhone` | `boolean` | Validar formato de teléfono |
| `isNumericOnly` | `boolean` | Permitir solo números |
| `allowSpecialChars` | `object` | Configuración de caracteres especiales |
| `alphanumeric` | `boolean` | Permitir solo alfanuméricos |
| `alphabetic` | `boolean` | Permitir solo letras |
| `customRegex` | `object[]` | Array de patrones personalizados |
| `trim` | `boolean` | Eliminar espacios inicio/fin |
| `normalizeCase` | `string` | Normalización de mayúsculas/minúsculas |

### Ejemplo Avanzado

typescript
const validation = stringValidation({
isRequired: true,
min: 5,
spaces: {
allowEmpty: false,
allowLeading: false,
allowTrailing: false
},
pattern: /^[A-Za-z]+$/,
transform: (value) => value.toLowerCase()
});

## Validaciones de Number

`numberValidation` permite configurar validaciones para campos numéricos.

### Uso Básico

typescript
import { numberValidation } from './number.validations';
// Validación básica
const basicNumValidation = numberValidation({
required: true,
min: 0,
max: 100
});
// Validación de enteros positivos
const integerValidation = numberValidation({
required: true,
integer: true,
positive: true
});

### Opciones Disponibles para Number

| Opción | Tipo | Descripción |
|--------|------|-------------|
| `required` | `boolean` | Campo obligatorio |
| `min` | `number` | Valor mínimo |
| `max` | `number` | Valor máximo |
| `lessThan` | `number` | Menor que |
| `moreThan` | `number` | Mayor que |
| `integer` | `boolean` | Solo números enteros |
| `positive` | `boolean` | Solo números positivos |
| `negative` | `boolean` | Solo números negativos |
| `round` | `string` | Tipo de redondeo |
| `precision` | `number` | Decimales permitidos |
| `allowZero` | `boolean` | Permitir valor cero |
| `multipleOf` | `number` | Debe ser múltiplo de |
| `range` | `object` | Rango de valores permitidos |
| `decimalSeparator` | `'.' \| ','` | Separador decimal |
| `thousandSeparator` | `boolean` | Separador de miles |

### Ejemplo Avanzado

typescript
const validation = numberValidation({
required: true,
min: 0,
max: 1000,
precision: 2,
round: 'floor'
});

## Mensajes Personalizados

Ambos validadores soportan mensajes personalizados que pueden ser proporcionados como segundo argumento:
typescript
const validation = stringValidation(
{ isRequired: true },
{ required: "Este campo es obligatorio" }
);

### Ejemplos Adicionales

```typescript
// Validación de teléfono
const phoneValidation = stringValidation({
  isRequired: true,
  isPhone: true
});

// Validación numérica con separadores
const currencyValidation = numberValidation({
  isRequired: true,
  precision: 2,
  decimalSeparator: '.',
  thousandSeparator: true,
  range: {
    min: 0,
    max: 1000000
  }
});

// Validación de texto con regex personalizado
const customRegexValidation = stringValidation({
  isRequired: true,
  customRegex: [{
    pattern: /^[A-Z][a-z]+$/,
    message: "Debe comenzar con mayúscula"
  }],
  normalizeCase: 'capitalize'
});
```

Esta documentación proporciona una guía clara y completa sobre cómo utilizar ambos validadores, incluyendo:
- Ejemplos básicos y avanzados
- Tablas con todas las opciones disponibles
- Información sobre personalización de mensajes
- Ejemplos de código para casos de uso comunes
