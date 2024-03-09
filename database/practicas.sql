-- Crear la base de datos "aprobados/as"
CREATE DATABASE practicas;

-- Usar la base de datos "practicas"
USE practicas;

-- Crear la tabla "usuarios"
CREATE TABLE usuarios (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);