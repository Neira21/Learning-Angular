# 📝 TodoApp Angular - Introducción

**Proyecto de introducción a Angular** que implementa una aplicación de gestión de tareas (Todo App) para aprender los conceptos fundamentales del framework.

## 🎯 Objetivo del Proyecto

Este proyecto sirve como introducción práctica a Angular, cubriendo:

- Componentes y sus ciclos de vida
- Data binding (one-way y two-way)
- Directivas estructurales (*ngFor, *ngIf)
- Servicios y dependency injection
- Formularios básicos
- Estilos con TailwindCSS y Angular Material

## 🛠️ Tecnologías Utilizadas

- **Angular 17** - Framework principal
- **Angular Material** - Componentes UI
- **TailwindCSS** - Framework de estilos
- **TypeScript** - Lenguaje de programación
- **RxJS** - Programación reactiva

## 🚀 Comandos de Desarrollo

### Servidor de desarrollo

```bash
ng serve
```

Navega a `http://localhost:4200/`. La aplicación se recarga automáticamente al cambiar los archivos.

### Generar código

```bash
ng generate component component-name
ng generate directive|pipe|service|class|guard|interface|enum|module
```

### Build de producción

```bash
ng build
```

Los archivos se almacenan en el directorio `dist/`.

### Tests unitarios

```bash
ng test
```

Ejecuta las pruebas unitarias via [Karma](https://karma-runner.github.io).

## 📚 Conceptos Aprendidos

1. **Componentes**: Estructura básica, decoradores, propiedades
2. **Templates**: Interpolación, property binding, event binding
3. **Directivas**: *ngFor, *ngIf, \*ngSwitch
4. **Servicios**: Inyección de dependencias, singleton pattern
5. **Formularios**: Template-driven forms, validaciones
6. **Estilos**: Component styles, global styles, CSS frameworks

## 🔗 Referencias

- [Angular CLI](https://angular.io/cli)
- [Angular Material](https://material.angular.io/)
- [TailwindCSS](https://tailwindcss.com/)
