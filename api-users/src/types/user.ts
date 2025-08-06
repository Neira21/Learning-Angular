export interface User {
  id: number;
  usuario: string;
  password: string;
  rol_id: Rol;
}

export interface Rol{
  id: number;
  nombre: string;
}


