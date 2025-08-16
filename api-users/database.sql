-- Crear base de datos
CREATE DATABASE IF NOT EXISTS usersdbprueba;
USE usersdbprueba;

-- Crear tabla roles
CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  descripcion TEXT,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla users con esquema completo
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100),
  telefono VARCHAR(20),
  fecha_nacimiento DATE,
  genero ENUM('M', 'F', 'Otro') DEFAULT NULL,
  foto_perfil VARCHAR(255),
  rol_id INT NOT NULL,
  activo BOOLEAN DEFAULT TRUE,
  email_verificado BOOLEAN DEFAULT FALSE,
  ultimo_login TIMESTAMP NULL,
  intentos_login_fallidos INT DEFAULT 0,
  bloqueado_hasta TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE RESTRICT,
  INDEX idx_users_email (email),
  INDEX idx_users_usuario (usuario),
  INDEX idx_users_rol_id (rol_id),
  INDEX idx_users_activo (activo)
);

-- Crear tabla refresh_tokens para autenticación
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token_hash VARCHAR(255) NOT NULL UNIQUE, -- Hash del token por seguridad
  device_info VARCHAR(255), -- Información del dispositivo/navegador
  ip_address VARCHAR(45), -- IP donde se generó el token
  expires_at DATETIME NOT NULL,
  revoked BOOLEAN DEFAULT FALSE,
  revoked_at TIMESTAMP NULL,
  revoked_reason VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_refresh_tokens_user_id (user_id),
  INDEX idx_refresh_tokens_expires_at (expires_at),
  INDEX idx_refresh_tokens_revoked (revoked)
);

-- Crear tabla user_sessions para tracking de sesiones
CREATE TABLE IF NOT EXISTS user_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  session_token VARCHAR(255) NOT NULL UNIQUE,
  ip_address VARCHAR(45),
  user_agent TEXT,
  device_type VARCHAR(50),
  location VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_sessions_user_id (user_id),
  INDEX idx_sessions_token (session_token),
  INDEX idx_sessions_active (is_active)
);

-- Crear tabla user_login_history para auditoría
CREATE TABLE IF NOT EXISTS user_login_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT,
  device_type VARCHAR(50),
  location VARCHAR(100),
  login_method ENUM('password', 'refresh_token', 'social') DEFAULT 'password',
  success BOOLEAN NOT NULL,
  failure_reason VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_login_history_user_id (user_id),
  INDEX idx_login_history_login_at (login_at),
  INDEX idx_login_history_success (success)
);

-- Crear tabla password_resets para recuperación de contraseñas
CREATE TABLE IF NOT EXISTS password_resets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token_hash VARCHAR(255) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP NULL,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_password_resets_user_id (user_id),
  INDEX idx_password_resets_expires_at (expires_at)
);

-- Crear tabla email_verifications para verificación de emails
CREATE TABLE IF NOT EXISTS email_verifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  email VARCHAR(100) NOT NULL,
  token_hash VARCHAR(255) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP NULL,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_email_verifications_user_id (user_id),
  INDEX idx_email_verifications_expires_at (expires_at)
);

-- Insertar roles por defecto
INSERT INTO roles (nombre, descripcion) VALUES 
('admin', 'Administrador del sistema - Control total'),
('moderator', 'Moderador - Gestión de usuarios y contenido'),
('user', 'Usuario estándar - Acceso básico'),
('editor', 'Editor - Gestión de contenido'),
('viewer', 'Solo lectura - Acceso limitado')
ON DUPLICATE KEY UPDATE 
  descripcion = VALUES(descripcion),
  updated_at = CURRENT_TIMESTAMP;

-- Insertar usuarios de prueba (contraseñas: password123)
INSERT INTO users (usuario, email, password, nombre, apellido, telefono, rol_id, activo, email_verificado) VALUES 
('admin', 'admin@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj8aPy5gLX4C', 'Administrator', 'System', '+1234567890', 1, TRUE, TRUE),
('moderator', 'moderator@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj8aPy5gLX4C', 'Moderador', 'Principal', '+1234567891', 2, TRUE, TRUE),
('juan_perez', 'juan@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj8aPy5gLX4C', 'Juan', 'Pérez', '+1234567892', 3, TRUE, TRUE),
('maria_garcia', 'maria@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj8aPy5gLX4C', 'María', 'García', '+1234567893', 3, TRUE, FALSE),
('editor_chief', 'editor@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj8aPy5gLX4C', 'Editor', 'Jefe', '+1234567894', 4, TRUE, TRUE)
ON DUPLICATE KEY UPDATE 
  nombre = VALUES(nombre),
  apellido = VALUES(apellido),
  telefono = VALUES(telefono),
  updated_at = CURRENT_TIMESTAMP;

-- Crear evento para limpiar tokens expirados automáticamente (ejecutar cada hora)
DELIMITER //
CREATE EVENT IF NOT EXISTS cleanup_expired_tokens
ON SCHEDULE EVERY 1 HOUR
DO
BEGIN
  -- Limpiar refresh tokens expirados
  DELETE FROM refresh_tokens 
  WHERE expires_at < NOW() OR revoked = TRUE;
  
  -- Limpiar sesiones expiradas
  DELETE FROM user_sessions 
  WHERE expires_at < NOW();
  
  -- Limpiar tokens de reset de password expirados
  DELETE FROM password_resets 
  WHERE expires_at < NOW() OR used = TRUE;
  
  -- Limpiar verificaciones de email expiradas
  DELETE FROM email_verifications 
  WHERE expires_at < NOW() OR verified = TRUE;
END //
DELIMITER ;

-- Habilitar el programador de eventos
SET GLOBAL event_scheduler = ON;
