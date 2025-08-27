# 🎛️ Control Value Accessor - Angular

**Implementación práctica de Custom Form Controls** en Angular usando la interfaz ControlValueAccessor para crear componentes de formulario reutilizables que se integran perfectamente con Angular Forms.

## 🎯 ¿Qué es un Control Value Accessor?

Un **Control Value Accessor** es una interfaz que permite a los componentes personalizados funcionar como controles de formulario nativos de Angular. Proporciona:

- ✅ **Integración con Reactive Forms y Template Forms**
- ✅ **Validación automática**
- ✅ **Estados de formulario** (touched, dirty, valid)
- ✅ **Two-way data binding**
- ✅ **Accesibilidad** mejorada

## 🛠️ Tecnologías Utilizadas

- **Angular 20** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Angular Forms** - Reactive Forms API
- **ControlValueAccessor** - Interfaz para custom controls

## 📋 Componentes de Ejemplo

### Controles Implementados:
- 📎 **Rating Component** - Sistema de calificación por estrellas
- 🎨 **Color Picker** - Selector de colores personalizado
- 🔢 **Counter Input** - Input numérico con botones +/-
- 📋 **Checkbox List** - Lista de checkboxes como un control
- 📅 **Date Range Picker** - Selector de rango de fechas

## 📚 Conceptos Implementados

### ControlValueAccessor Interface
```typescript
interface ControlValueAccessor {
  writeValue(value: any): void;           // Recibe valor del formulario
  registerOnChange(fn: any): void;        // Registra callback de cambio
  registerOnTouched(fn: any): void;       // Registra callback de touched
  setDisabledState?(disabled: boolean): void; // Maneja estado disabled
}
```

### Características Clave
1. **Bidirectional Data Flow** - Comunicación entre componente y formulario
2. **Form Validation** - Integración con validadores de Angular
3. **Accessibility** - ARIA attributes y keyboard navigation
4. **Reusability** - Componentes reutilizables en cualquier formulario

## 🚀 Comandos de Desarrollo

### Servidor de desarrollo
```bash
ng serve
```
Navega a `http://localhost:4200/` para ver la aplicación.

### Generar nuevo control personalizado
```bash
ng generate component components/my-custom-control
```

### Build de producción
```bash
ng build
```

### Tests unitarios
```bash
ng test
```

## 📄 Estructura del Proyecto

```
src/
├── app/
│   ├── components/          # Custom Form Controls
│   │   ├── rating/          # Rating component con CVA
│   │   ├── color-picker/    # Color picker con CVA
│   │   └── counter-input/   # Counter input con CVA
│   ├── forms/               # Ejemplos de uso
│   │   ├── reactive-example/ # Uso con Reactive Forms
│   │   └── template-example/ # Uso con Template Forms
│   └── shared/              # Utilidades compartidas
│       └── validators/       # Custom validators
└── assets/                  # Assets estáticos
```

## 💡 Casos de Uso

### 1. Reactive Forms
```typescript
this.form = this.fb.group({
  rating: [5, [Validators.required, Validators.min(1)]],
  color: ['#ff0000'],
  quantity: [1, [Validators.min(0), Validators.max(100)]]
});
```

### 2. Template-driven Forms
```html
<app-rating [(ngModel)]="userRating" 
            name="rating" 
            required
            #rating="ngModel">
</app-rating>
```

## 📚 Recursos de Aprendizaje

- [ControlValueAccessor Documentation](https://angular.io/api/forms/ControlValueAccessor)
- [Angular Forms Guide](https://angular.io/guide/forms-overview)
- [Custom Form Controls](https://angular.io/guide/form-validation#custom-validators)

## 🎆 Beneficios

- **Reutilización**: Un componente, múltiples contextos
- **Consistencia**: Comportamiento uniforme en toda la app
- **Mantenibilidad**: Lógica centralizada en el componente
- **Testing**: Fácil de testear de forma aislada
- **Accesibilidad**: ARIA labels y keyboard support integrado
