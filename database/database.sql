CREATE DATABASE bookingRooms;

USE bookingRooms;

CREATE TABLE salas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  capacidad INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARBINARY(48) NOT NULL,
  rol TINYINT(1) NOT NULL DEFAULT 0, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sala_id INT NOT NULL,
  usuario_id INT NOT NULL,
  hora_inicio DATETIME NOT NULL,
  hora_fin DATETIME NOT NULL,
  estado ENUM('reservada', 'liberada', 'finalizada') NOT NULL DEFAULT 'reservada',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_reserva_sala FOREIGN KEY (sala_id) REFERENCES salas(id),
  CONSTRAINT fk_reserva_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  CONSTRAINT chk_duracion CHECK (TIMESTAMPDIFF(MINUTE, hora_inicio, hora_fin) <= 120)
);
