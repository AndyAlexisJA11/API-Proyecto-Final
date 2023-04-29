CREATE DATABASE IF NOT EXISTS Proyecto_Graduacion

use Proyecto_Graduacion;

CREATE TABLE usuario (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT(5) DEFAULT NULL,
    primary key (id)
);

DESCRIBE usuario; 

INSERT INTO usuarios () values 
(1, "Andy", 3000),
(2, "Allan", 2000),
(3, "Alexis", 2500),
(4, "Ardany", 1500),
