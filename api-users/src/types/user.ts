export interface User {
  id: number;
  usuario: string;
  password: string;
  roles: Rol;
}

export interface Rol{
  id: number;
  nombre: string;
}