# Practice

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

Angular 16 = viejo API Documentation
Angular 17 - 20 = angular nuevo API Documentation lasted version

Backbone ➡️ SPA ➡️ AngularJS ➡️ React lo podía hacer
MVC + MVVM ➡️ Angular lo hacía todo

Manejado por la comunidad ➡️ directivas
Plataforma completa estructural ➡️ Permite aumentar las funcionalidades en elementos del DOM que antes no lo tenían

\*ngIf ➡️ directiva estructural ➡️ renderizar o no algo
directiva ➡️ componentes
Los componentes vienen de la versión de angular 14.3

AngularJs ➡️Angular2
Angular ➡️ Mejora continuas
Team de Angular ➡️ Dan soporte hasta 5 versiones anteriores

- Antes se usaba Webpack que era un bundler que empaquetaba todo el código, lo compilaba y lo minificaba, hacer los build, pasar a producción

- Ahora usan Vite que es un bundler más moderno, más rápido y más eficiente

## Angular

- Detección de cambios ➡️ Zone.js
- ChangeDetectionStrategy ➡️ OnPush => Si un componente tiene OnPush, solo detecta cambios en ese component.
  OnPush:
  Angular solo verifica el componente cuando:
- Cambia una @Input() por referencia.
- Se dispara un evento en el propio componente.
- Se llama a markForCheck() manualmente.
- Se usa un async pipe que emite un nuevo valor.

- Entra signals

- Programación reactiva ➡️ RxJS
  . Canales
  . Espectadores
  . Eventos

RxJS ➡️ Biblioteca para programación reactiva usando Observables
. Observables ➡️ Secuencia de valores a lo largo del tiempo
. Operadores ➡️ Funciones que permiten transformar, filtrar y combinar observables
Solo uno puede emitir valores | Unidireccional
. Suscripciones ➡️ Mecanismo para recibir valores emitidos por un observable | Bidireccional
. Subjects ➡️ Tipo especial de observable que permite emitir valores a múltiples suscriptores
. BehaviorSubject ➡️ Mantiene el valor actual y emite ese valor a nuevos suscriptores

Lazy loading: Para cargar los módulos solo cuando se necesitan, mejorando la velocidad de carga inicial de la aplicación

➡️Performance: Mejora la velocidad de carga y la experiencia del usuario al cargar solo lo necesario.
➡️Seguridad: Implementa medidas para proteger la aplicación y los datos del usuario. parte privada parte publica

Transpilation
Transformation ➡️ codigo de alto nivel a otro de alto nivel
Typescript ➡️ JavaScript
