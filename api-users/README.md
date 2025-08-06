
# API Users

src/
├── 📁 config/           # Configuraciones
│   ├── database.ts      # Config de MySQL
│   ├── env.ts          # Variables de entorno
│   └── cors.ts         # Config CORS
├── 📁 controllers/      # Controladores
│   ├── authController.ts
│   └── userController.ts
├── 📁 middlewares/      # Middlewares
│   ├── auth.ts         # JWT validation
│   ├── errorHandler.ts # Error handling
│   └── validation.ts   # Validación de datos
├── 📁 models/          # Modelos de datos
│   ├── User.ts
│   └── Role.ts
├── 📁 routes/          # Rutas
│   ├── authRoutes.ts
│   └── userRoutes.ts
├── 📁 services/        # Lógica de negocio
│   ├── authService.ts
│   └── userService.ts
├── 📁 repositories/    # Acceso a datos
│   ├── userRepository.ts
│   └── roleRepository.ts
├── 📁 utils/           # Utilidades
│   ├── bcrypt.ts
│   ├── jwt.ts
│   └── validators.ts
├── 📁 types/           # Tipos TypeScript
│   ├── auth.types.ts
│   └── user.types.ts
└── index.ts            # Punto de entrada