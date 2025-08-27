# 🔄 Dynamic Forms - Angular

**Sistema de formularios dinámicos** que permite generar formularios complejos basados en configuración JSON, implementando patrones avanzados de Reactive Forms en Angular.

## 🎯 Objetivo del Proyecto

Este proyecto demuestra cómo crear **formularios completamente dinámicos** que se pueden:
- ✅ **Configurar mediante JSON** - Definición declarativa de formularios
- ✅ **Generar en tiempo de ejecución** - Formularios creados dinámicamente
- ✅ **Validar automáticamente** - Validaciones configurable por campo
- ✅ **Renderizar condicionalmente** - Campos que aparecen según condiciones
- ✅ **Manejar dependencias** - Campos que dependen de otros
- ✅ **Serializar/Deserializar** - Persistencia de estado del formulario

## 🛠️ Tecnologías Utilizadas

- **Angular 20** - Framework principal
- **Angular Material** - Componentes UI
- **Reactive Forms** - Formularios reactivos
- **TypeScript** - Tipado estático
- **RxJS** - Programación reactiva
- **JSON Schema** - Validación de configuraciones

## 📋 Tipos de Campos Soportados

| Tipo | Componente | Características |
|------|------------|------------------|
| **text** | Input Text | Validaciones, máscaras, placeholder |
| **email** | Email Input | Validación de email integrada |
| **password** | Password Input | Mostrar/ocultar, fortaleza |
| **number** | Number Input | Min/max, step, decimales |
| **select** | Dropdown | Opciones estáticas o dinámicas |
| **multiselect** | Multi-select | Selección múltiple con chips |
| **radio** | Radio Group | Opciones excluyentes |
| **checkbox** | Checkbox | Valores booleanos |
| **date** | Date Picker | Rango de fechas, formato |
| **textarea** | Text Area | Filas configurables, contador |
| **file** | File Upload | Múltiples archivos, tipos |

## 📊 Características Avanzadas

### 1. Campos Condicionales
```json
{
  "field": "age",
  "type": "number",
  "showIf": {
    "field": "hasAge",
    "operator": "equals",
    "value": true
  }
}
```

### 2. Validaciones Dinámicas
```json
{
  "field": "email",
  "type": "email",
  "validators": [
    { "type": "required", "message": "Email es requerido" },
    { "type": "email", "message": "Email inválido" },
    { "type": "maxlength", "value": 100 }
  ]
}
```

### 3. Secciones y Grupos
```json
{
  "section": "Información Personal",
  "fields": [
    { "field": "firstName", "type": "text" },
    { "field": "lastName", "type": "text" }
  ]
}
```

## 🚀 Comandos de Desarrollo

### Servidor de desarrollo
```bash
ng serve
```
Navega a `http://localhost:4200/` para ver la aplicación.

### Build de producción
```bash
ng build
```

### Tests unitarios
```bash
ng test
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── dynamic-form/        # Componente principal
│   │   ├── form-field/          # Renderizador de campos
│   │   └── field-types/         # Tipos de campos específicos
│   ├── services/
│   │   ├── form-builder.service.ts  # Constructor de formularios
│   │   ├── validation.service.ts    # Servicio de validaciones
│   │   └── condition.service.ts     # Lógica condicional
│   ├── models/
│   │   ├── form-config.interface.ts # Interfaces de configuración
│   │   └── field-config.interface.ts# Tipos de campos
│   └── examples/                # Ejemplos de configuración
│       ├── user-form.json       # Formulario de usuario
│       └── survey-form.json     # Formulario de encuesta
└── assets/                      # Configuraciones JSON
```

## 📚 Conceptos Implementados

1. **Dynamic Component Loading** - Componentes creados en tiempo de ejecución
2. **Factory Pattern** - Fábrica de campos de formulario
3. **Strategy Pattern** - Diferentes estrategias de validación
4. **Observer Pattern** - Observación de cambios en formularios
5. **Dependency Injection** - Servicios inyectados
6. **Type Safety** - Interfaces TypeScript para configuración

## 📝 Casos de Uso

- **Formularios de configuración** - Admin panels dinámicos
- **Encuestas y cuestionarios** - Preguntas condicionales
- **Formularios de registro** - Campos según tipo de usuario
- **Configuración de productos** - Opciones dinámicas
- **Workflows de aprobación** - Formularios de estados

## 🔗 Recursos

- [Angular Dynamic Forms](https://angular.io/guide/dynamic-form)
- [Reactive Forms Guide](https://angular.io/guide/reactive-forms)
- [Angular Material Forms](https://material.angular.io/components/categories/forms)
