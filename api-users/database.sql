-- Crear base de datos
CREATE DATABASE IF NOT EXISTS usersdb;
USE usersdb;

-- Crear tabla users con nuevo esquema
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user', 'moderator') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla roles (mantener para compatibilidad)
CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de prueba en roles
INSERT INTO roles (nombre, descripcion) VALUES 
('admin', 'Administrador del sistema'),
('user', 'Usuario estándar'),
('moderator', 'Moderador')
ON DUPLICATE KEY UPDATE descripcion = VALUES(descripcion);

-- Insertar datos de prueba en users (con contraseñas hasheadas)
-- Nota: Las contraseñas están hasheadas con bcrypt
-- admin: password123
-- user: password123
-- moderator: password123

INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj8aPy5gLX4C', 'admin'),
('Juan Pérez', 'juan@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj8aPy5gLX4C', 'user'),
('María García', 'maria@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj8aPy5gLX4C', 'user'),
('Carlos Moderador', 'carlos@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj8aPy5gLX4C', 'moderator')
ON DUPLICATE KEY UPDATE 
  name = VALUES(name),
  password = VALUES(password),
  role = VALUES(role);

-- Crear índices para optimizar búsquedas
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
