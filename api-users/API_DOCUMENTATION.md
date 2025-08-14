# API Users - Sistema de Autenticación JWT

Una API REST completa con autenticación JWT, registro de usuarios, roles y rutas protegidas.

## 🚀 Características

- ✅ Registro y login de usuarios
- ✅ Autenticación con JWT
- ✅ Protección de rutas con middleware
- ✅ Sistema de roles (admin, user, moderator)
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Validación de datos
- ✅ Manejo de errores

## 📦 Instalación

```bash
# Clonar el proyecto
cd api-users

# Instalar dependencias
pnpm install

# Configurar base de datos
# Ejecutar el archivo database.sql en MySQL

# Configurar variables de entorno
# Crear archivo .env basado en .env.example

# Ejecutar en modo desarrollo
pnpm run dev
```

## 🔧 Variables de Entorno

```env
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_NAME=usersdb
JWT_SECRET=your-super-secret-jwt-key-change-in-production-2024
JWT_EXPIRES_IN=24h
```

## 📚 Endpoints

### 🔓 Rutas Públicas (No requieren autenticación)

#### Registro de Usuario
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "juan@example.com",
    "name": "Juan Pérez",
    "role": "user"
  },
  "message": "Usuario registrado exitosamente"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "juan@example.com",
    "name": "Juan Pérez",
    "role": "user"
  },
  "message": "Login exitoso"
}
```

### 🔒 Rutas Protegidas (Requieren autenticación)

**Todas las rutas protegidas requieren el header:**
```
Authorization: Bearer <tu-jwt-token>
```

#### Verificar Token
```http
GET /api/v1/auth/verify
Authorization: Bearer <token>
```

#### Obtener Perfil
```http
GET /api/v1/auth/profile
Authorization: Bearer <token>
```

#### Listar Usuarios
```http
GET /api/v1/users
Authorization: Bearer <token>
```

#### Obtener Usuario por ID
```http
GET /api/v1/users/1
Authorization: Bearer <token>
```

### 👑 Rutas de Administrador (Requieren rol admin)

#### Crear Usuario
```http
POST /api/v1/users
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Nuevo Usuario",
  "email": "nuevo@example.com",
  "password": "password123",
  "role": "user"
}
```

#### Actualizar Usuario
```http
PUT /api/v1/users/1
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Nombre Actualizado",
  "role": "moderator"
}
```

#### Eliminar Usuario
```http
DELETE /api/v1/users/1
Authorization: Bearer <admin-token>
```

### 🧪 Rutas de Testing

#### Ruta Pública
```http
GET /api/v1/test/public
```

#### Ruta Protegida
```http
GET /api/v1/test/protected
Authorization: Bearer <token>
```

#### Solo Usuarios
```http
GET /api/v1/test/user-only
Authorization: Bearer <token>
```

#### Solo Administradores
```http
GET /api/v1/test/admin-only
Authorization: Bearer <admin-token>
```

#### Admin y Moderadores
```http
GET /api/v1/test/admin-moderator
Authorization: Bearer <admin-or-moderator-token>
```

## 👥 Usuarios de Prueba

La base de datos incluye usuarios de prueba (contraseña: `password123`):

- **Admin**: admin@example.com (rol: admin)
- **Juan**: juan@example.com (rol: user)
- **María**: maria@example.com (rol: user)
- **Carlos**: carlos@example.com (rol: moderator)

## 🔐 Sistema de Roles

- **admin**: Acceso completo, puede gestionar usuarios
- **moderator**: Acceso intermedio, puede moderar contenido
- **user**: Acceso básico, solo puede ver su propio perfil

## ⚙️ Estructura del Proyecto

```
src/
├── controllers/     # Lógica de controladores
├── middlewares/     # Middlewares de autenticación
├── models/         # Modelos de datos
├── routers/        # Definición de rutas
├── services/       # Lógica de negocio
├── types/          # Tipos TypeScript
└── index.ts        # Archivo principal
```

## 🛠️ Scripts

```bash
# Desarrollo
pnpm run dev

# Compilar
pnpm run build

# Producción
pnpm start
```

## 📋 Ejemplos de Uso

### Flujo Completo de Autenticación

1. **Registrar usuario:**
```bash
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

2. **Hacer login:**
```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

3. **Usar token en rutas protegidas:**
```bash
curl -X GET http://localhost:4000/api/v1/auth/profile \
  -H "Authorization: Bearer <tu-token-aqui>"
```

## 🚨 Códigos de Error

- **400**: Bad Request - Datos inválidos
- **401**: Unauthorized - Token inválido o faltante
- **403**: Forbidden - Permisos insuficientes
- **404**: Not Found - Recurso no encontrado
- **409**: Conflict - Email ya registrado
- **500**: Internal Server Error - Error del servidor

## 📝 Notas

- Los tokens JWT expiran en 24 horas por defecto
- Las contraseñas se encriptan con bcrypt (12 rounds)
- La API usa CORS para permitir peticiones desde cualquier origen
- Todos los endpoints devuelven JSON
