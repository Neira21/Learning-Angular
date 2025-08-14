import { z } from 'zod';

// Esquema para User
export const UserSchema = z.object({
  id: z.number().min(1, 'El ID debe ser un número positivo').optional(),
  usuario: z.string()
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(50, 'El usuario no puede exceder 50 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'El usuario solo puede contener letras, números y guiones bajos'),
  password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(20, 'La contraseña no puede exceder 20 caracteres'),
  rol_id: z.number()
    .positive('El rol_id debe ser un número positivo').optional(),
});

export const RolSchema = z.object({
  // lista de roles
  //el id es requerido para actualizar o eliminar un rol
  id: z.number().min(1, 'El ID debe ser un número positivo'),
  nombre: z.string(),
})

// Esquema para login
export const LoginSchema = z.object({
  usuario: z.string().min(1, 'El usuario es requerido'),
  password: z.string().min(1, 'La contraseña es requerida')
});

// Esquema para respuesta de autenticación
export const AuthResponseSchema = z.object({
  success: z.boolean(),
  token: z.string().optional(),
  user: UserSchema.omit({ password: true }),
  message: z.string()
});

export const RegisterUserSchema = UserSchema.omit({ id: true });

// Para crear usuarios (admin - sin id)
export const CreateUserSchema = UserSchema.omit({ id: true });





// Tipos inferidos de los esquemas (para usar en TypeScript)
export type UserType = z.infer<typeof UserSchema>;
export type RolType = z.infer<typeof RolSchema>;
export type LoginType = z.infer<typeof LoginSchema>;
export type AuthResponseType = z.infer<typeof AuthResponseSchema>;
export type RegisterUserType = z.infer<typeof RegisterUserSchema>;
export type CreateUserType = z.infer<typeof CreateUserSchema>;
