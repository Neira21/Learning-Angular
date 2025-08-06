-- Crear base de datos
CREATE DATABASE IF NOT EXISTS usersdb;
USE usersdb;

-- Crear tabla roles
CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  rol_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- Insertar datos de prueba en roles
INSERT INTO roles (nombre, descripcion) VALUES 
('admin', 'Administrador del sistema'),
('user', 'Usuario estándar'),
('moderator', 'Moderador');

-- Insertar datos de prueba en users
INSERT INTO users (usuario, email, rol_id) VALUES 
('admin', 'admin@example.com', 1),
('juan', 'juan@example.com', 2),
('maria', 'maria@example.com', 2),
('carlos', 'carlos@example.com', 3);
