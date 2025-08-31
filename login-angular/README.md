# 🛡️ Proyecto de Login con Angular 20 y Express

Este proyecto es una práctica para comprender los fundamentos de autenticación y autorización en aplicaciones web. Consta de dos partes principales:

Backend (API): Construido con Express.js.

Frontend (Cliente): Construido con Angular 20.


El objetivo es implementar un flujo de login completo con JWT, Local Storage, guards, manejo de errores y protección de rutas.


---

## ✅ Características

Autenticación con JWT en el backend.

Login en Angular consumiendo la API REST.

Almacenamiento seguro del token en Local Storage.

Route Guards para proteger rutas en el frontend.

Interceptors HTTP para enviar el token en cada petición.

Manejo de errores en frontend y backend.

Logout con limpieza de token.



---

## ⚙️ Tecnologías Utilizadas

Backend:

Node.js

Express.js

jsonwebtoken para la generación y validación de tokens.

Frontend:

Angular 20

RxJS

Angular Router para las rutas protegidas.

HTTPClient para las peticiones a la API.

---


## 🔑 Flujo de Autenticación

1. El usuario ingresa email y contraseña en el formulario de login.


2. El frontend envía la petición POST /login al backend.


3. El backend valida credenciales y responde con un JWT.


4. El frontend guarda el token en Local Storage.


5. Route Guards verifican el token antes de entrar a rutas privadas.


6. En cada petición, se envía el token en el Authorization Header.


7. Logout limpia el token del Local Storage.




---

✅ Funcionalidades Clave en el Frontend

Auth Service para login/logout y manejo del token.

HTTP Interceptor para añadir el token en las peticiones.

Auth Guard para proteger rutas privadas.

Manejo global de errores (401, 403, etc.).
