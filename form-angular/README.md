# 📝 Forms Angular - Formularios en Angular

**Proyecto educativo sobre formularios en Angular** que cubre tanto Template-driven Forms como Reactive Forms, incluyendo validaciones, patrones avanzados y mejores prácticas.

## 🎯 Objetivo del Proyecto

Este proyecto es una **guía completa de formularios** que demuestra:

- ✅ **Template-driven Forms** - Formularios basados en templates
- ✅ **Reactive Forms** - Formularios reactivos con FormBuilder
- ✅ **Validaciones personalizadas** - Custom validators
- ✅ **Validaciones asíncronas** - Validación con APIs
- ✅ **Form Arrays** - Formularios dinámicos
- ✅ **Nested Forms** - Formularios anidados
- ✅ **Cross-field validation** - Validación entre campos
- ✅ **Error handling** - Manejo elegante de errores

## 🛠️ Tecnologías Utilizadas

- **Angular** - Framework principal
- **Angular Forms** - FormsModule y ReactiveFormsModule
- **TypeScript** - Tipado fuerte
- **RxJS** - Streams y observables
- **Angular Material** - Componentes UI para formularios

## 📋 Tipos de Formularios Implementados

### 1. Template-driven Forms

- 📄 **Formulario de contacto** - Básico con validaciones HTML5
- 📄 **Formulario de registro** - Con validaciones personalizadas
- 📄 **Formulario de encuesta** - Campos dinámicos

### 2. Reactive Forms

- 🔄 **Formulario de usuario** - FormBuilder y FormGroup
- 🔄 **Formulario de dirección** - FormArray para múltiples direcciones
- 🔄 **Formulario de producto** - Nested FormGroups
- 🔄 **Formulario de pago** - Validaciones complejas

### 3. Validaciones Avanzadas

- ✅ **Validadores personalizados** - Custom validators
- ✅ **Validaciones condicionales** - Según otros campos

## 📊 Patrones y Conceptos

### FormBuilder Pattern

```typescript
this.userForm = this.fb.group({
  name: ["", [Validators.required, Validators.minLength(2)]],
  email: ["", [Validators.required, Validators.email], [this.emailValidator]],
  addresses: this.fb.array([this.createAddressForm()]),
});
```

### Custom Validators

```typescript
static strongPassword(control: AbstractControl): ValidationErrors | null {
  const password = control.value;
  if (!password) return null;

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumeric = /[0-9]/.test(password);

  const valid = hasUpper && hasLower && hasNumeric && password.length >= 8;
  return valid ? null : { strongPassword: true };
}
```

### Async Validators

```typescript
emailValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  return this.http.post('/api/validate-email', { email: control.value })
    .pipe(
      map(result => result.exists ? { emailTaken: true } : null),
      catchError(() => of(null))
    );
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
│   │   ├── template-forms/      # Template-driven examples
│   │   │   ├── contact-form/
│   │   │   ├── registration-form/
│   │   │   └── survey-form/
│   │   ├── reactive-forms/      # Reactive forms examples
│   │   │   ├── user-form/
│   │   │   ├── address-form/
│   │   │   ├── product-form/
│   │   │   └── payment-form/
│   │   └── advanced/            # Advanced patterns
│   │       ├── dynamic-form-array/
│   │       ├── nested-forms/
│   │       └── conditional-validation/
│   ├── validators/
│   │   ├── custom.validators.ts # Validadores personalizados
│   │   └── async.validators.ts  # Validadores asíncronos
│   └── services/
│       └── form.service.ts      # Servicio para forms
└── assets/                      # Datos de ejemplo
```

## 📚 Conceptos de Formularios Cubiertos

1. **Form Controls** - Controles individuales de formulario
2. **Form Groups** - Agrupación de controles relacionados
3. **Form Arrays** - Arrays dinámicos de controles
4. **Form Builders** - Constructor de formularios
5. **Validators** - Validación síncrona y asíncrona
6. **Form States** - Pristine, dirty, touched, valid
7. **Error Handling** - Manejo y display de errores
8. **Accessibility** - ARIA labels y keyboard navigation

## 📈 Mejores Prácticas Implementadas

- **Separación de responsabilidades** - Lógica separada de presentación
- **Reutilización de validadores** - Validators como servicios
- **Manejo de errores centralizado** - Error handling consistente
- **Optimización de performance** - OnPush change detection
- **Accesibilidad** - WCAG guidelines compliance
- **Testing** - Unit tests para validadores y componentes

## 🔗 Recursos

- [Angular Forms Guide](https://angular.io/guide/forms-overview)
- [Reactive Forms](https://angular.io/guide/reactive-forms)
- [Form Validation](https://angular.io/guide/form-validation)
