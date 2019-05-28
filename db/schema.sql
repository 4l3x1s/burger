-- Create the database burger_db
CREATE DATABASE burgers_db;
USE `burgers_db`;

-- If the table already exists, remove it before trying to recreate it
DROP TABLE IF EXISTS burger;

-- Create the table burgers
CREATE TABLE `burgers`
(
	id int NOT NULL AUTO_INCREMENT,
	burger_name varchar(255) NOT NULL,
    devoured boolean NOT NULL,
	PRIMARY KEY (id)
);
