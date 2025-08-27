# 🔐 API Users - Backend REST

**API REST completa para gestión de usuarios** con autenticación JWT, construida con Node.js, Express y TypeScript siguiendo principios de arquitectura limpia.

## 🎯 Características Principales

- ✅ **Autenticación JWT** - Login/registro seguro
- ✅ **CRUD de Usuarios** - Gestión completa de usuarios
- ✅ **Roles y Permisos** - Sistema de autorización
- ✅ **Validación de Datos** - Usando Zod para type-safe validation
- ✅ **Encriptación** - Passwords hasheados con bcrypt
- ✅ **CORS** - Configuración para aplicaciones frontend
- ✅ **Error Handling** - Manejo centralizado de errores
- ✅ **TypeScript** - Tipado estático completo

## 🛠️ Tecnologías

- **Node.js + Express** - Runtime y framework web
- **TypeScript** - Tipado estático
- **MySQL** - Base de datos relacional
- **JWT** - JSON Web Tokens para autenticación
- **Bcrypt** - Hash de contraseñas
- **Zod** - Validación y parsing de datos
- **CORS** - Cross-Origin Resource Sharing

## 📁 Arquitectura del Proyecto

```
src/
├── 📁 config/           # Configuraciones
│   ├── database.ts      # Config de MySQL
│   ├── env.ts          # Variables de entorno
│   └── cors.ts         # Config CORS
├── 📁 controllers/      # Controladores HTTP
│   ├── authController.ts # Login, registro, tokens
│   └── userController.ts # CRUD usuarios
├── 📁 middlewares/      # Middlewares
│   ├── auth.ts         # Validación JWT
│   ├── errorHandler.ts # Manejo de errores
│   └── validation.ts   # Validación de datos
├── 📁 models/          # Modelos de datos
│   ├── User.ts         # Modelo Usuario
│   └── Role.ts         # Modelo Rol
├── 📁 routes/          # Definición de rutas
│   ├── authRoutes.ts   # Rutas autenticación
│   └── userRoutes.ts   # Rutas usuarios
├── 📁 services/        # Lógica de negocio
│   ├── authService.ts  # Servicios auth
│   └── userService.ts  # Servicios usuario
├── 📁 repositories/    # Acceso a datos
│   ├── userRepository.ts # Repository pattern
│   └── roleRepository.ts # Abstracción DB
├── 📁 utils/           # Utilidades
│   ├── bcrypt.ts       # Hash passwords
│   ├── jwt.ts          # JWT helpers
│   └── validators.ts   # Validadores custom
├── 📁 types/           # Tipos TypeScript
│   ├── auth.types.ts   # Tipos autenticación
│   └── user.types.ts   # Tipos usuario
└── index.ts            # Punto de entrada
```

## 🚀 Comandos de Desarrollo

### Instalación
```bash
pnpm install
```

### Desarrollo
```bash
pnpm run dev
```

### Build de producción
```bash
pnpm run build
pnpm start
```

## 📡 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refrescar token

### Usuarios (Requiere autenticación)
- `GET /api/users` - Listar usuarios
- `GET /api/users/:id` - Obtener usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

## 🗃️ Base de Datos

Estructura de tablas principales:
- **users** - Información de usuarios
- **roles** - Roles del sistema
- **user_roles** - Relación usuarios-roles

## 📚 Conceptos Implementados

1. **Repository Pattern** - Abstracción de acceso a datos
2. **Dependency Injection** - Inversión de dependencias
3. **Middleware Pattern** - Procesamiento de requests
4. **JWT Authentication** - Stateless authentication
5. **Error Handling** - Manejo centralizado de errores
6. **Validation Layer** - Validación con Zod
7. **Clean Architecture** - Separación de responsabilidades
