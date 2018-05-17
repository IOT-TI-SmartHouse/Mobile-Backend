-- --------------------------------------------------------
-- Host:                         145.48.6.78
-- Server versie:                5.7.22-0ubuntu0.16.04.1 - (Ubuntu)
-- Server OS:                    Linux
-- HeidiSQL Versie:              9.5.0.5278
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Databasestructuur van smartgardening wordt geschreven
CREATE DATABASE IF NOT EXISTS `smartgardening` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `smartgardening`;

-- Structuur van  tabel smartgardening.Coordinates wordt geschreven
CREATE TABLE IF NOT EXISTS `Coordinates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `departmentId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `departmentId` (`departmentId`),
  CONSTRAINT `Coordinates_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `Departments` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumpen data van tabel smartgardening.Coordinates: ~0 rows (ongeveer)
/*!40000 ALTER TABLE `Coordinates` DISABLE KEYS */;
/*!40000 ALTER TABLE `Coordinates` ENABLE KEYS */;

-- Structuur van  tabel smartgardening.Departments wordt geschreven
CREATE TABLE IF NOT EXISTS `Departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `greenhouseId` int(11) DEFAULT NULL,
  `sensorSpacingX` float(6,2) DEFAULT NULL,
  `sensorSpacingY` float(6,2) DEFAULT NULL,
  `sensorSpacingZ` float(6,2) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `greenhouseId` (`greenhouseId`),
  CONSTRAINT `Departments_ibfk_1` FOREIGN KEY (`greenhouseId`) REFERENCES `Greenhouses` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumpen data van tabel smartgardening.Departments: ~0 rows (ongeveer)
/*!40000 ALTER TABLE `Departments` DISABLE KEYS */;
/*!40000 ALTER TABLE `Departments` ENABLE KEYS */;

-- Structuur van  tabel smartgardening.Greenhouses wordt geschreven
CREATE TABLE IF NOT EXISTS `Greenhouses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumpen data van tabel smartgardening.Greenhouses: ~0 rows (ongeveer)
/*!40000 ALTER TABLE `Greenhouses` DISABLE KEYS */;
/*!40000 ALTER TABLE `Greenhouses` ENABLE KEYS */;

-- Structuur van  tabel smartgardening.GreenhouseUser wordt geschreven
CREATE TABLE IF NOT EXISTS `GreenhouseUser` (
  `greenhouseId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`greenhouseId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `GreenhouseUser_ibfk_1` FOREIGN KEY (`greenhouseId`) REFERENCES `Greenhouses` (`id`),
  CONSTRAINT `GreenhouseUser_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumpen data van tabel smartgardening.GreenhouseUser: ~0 rows (ongeveer)
/*!40000 ALTER TABLE `GreenhouseUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `GreenhouseUser` ENABLE KEYS */;

-- Structuur van  tabel smartgardening.SensorData wordt geschreven
CREATE TABLE IF NOT EXISTS `SensorData` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sensorId` int(11) DEFAULT NULL,
  `value` double DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sensorId` (`sensorId`),
  CONSTRAINT `SensorData_ibfk_1` FOREIGN KEY (`sensorId`) REFERENCES `Sensors` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumpen data van tabel smartgardening.SensorData: ~0 rows (ongeveer)
/*!40000 ALTER TABLE `SensorData` DISABLE KEYS */;
/*!40000 ALTER TABLE `SensorData` ENABLE KEYS */;

-- Structuur van  tabel smartgardening.SensorNodes wordt geschreven
CREATE TABLE IF NOT EXISTS `SensorNodes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `departmentId` int(11) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `altitude` float(6,2) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `departmentId` (`departmentId`),
  CONSTRAINT `SensorNodes_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `Departments` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumpen data van tabel smartgardening.SensorNodes: ~0 rows (ongeveer)
/*!40000 ALTER TABLE `SensorNodes` DISABLE KEYS */;
/*!40000 ALTER TABLE `SensorNodes` ENABLE KEYS */;

-- Structuur van  tabel smartgardening.Sensors wordt geschreven
CREATE TABLE IF NOT EXISTS `Sensors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sensorNodeId` int(11) DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sensorNodeId` (`sensorNodeId`),
  KEY `typeId` (`typeId`),
  CONSTRAINT `Sensors_ibfk_1` FOREIGN KEY (`sensorNodeId`) REFERENCES `SensorNodes` (`id`) ON DELETE SET NULL,
  CONSTRAINT `Sensors_ibfk_2` FOREIGN KEY (`typeId`) REFERENCES `Types` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumpen data van tabel smartgardening.Sensors: ~0 rows (ongeveer)
/*!40000 ALTER TABLE `Sensors` DISABLE KEYS */;
/*!40000 ALTER TABLE `Sensors` ENABLE KEYS */;

-- Structuur van  tabel smartgardening.SequelizeMeta wordt geschreven
CREATE TABLE IF NOT EXISTS `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `SequelizeMeta_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumpen data van tabel smartgardening.SequelizeMeta: ~10 rows (ongeveer)
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
REPLACE INTO `SequelizeMeta` (`name`) VALUES
	('20171123162723-create-greenhouse.js'),
	('20171123162724-create-user.js'),
	('20171123162725-create-greenhouseuser.js'),
	('20171123171333-create-department.js'),
	('20171123184229-create-coordinate.js'),
	('20171123200416-create-sensor-node.js'),
	('20171123200910-create-type.js'),
	('20171123201110-create-sensor.js'),
	('20171123202208-create-sensor-data.js'),
	('20171123202749-create-setting.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;

-- Structuur van  tabel smartgardening.Settings wordt geschreven
CREATE TABLE IF NOT EXISTS `Settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `departmentId` int(11) DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  `minimum` float(6,2) DEFAULT NULL,
  `maximum` float(6,2) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `departmentId` (`departmentId`),
  KEY `typeId` (`typeId`),
  CONSTRAINT `Settings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `Settings_ibfk_2` FOREIGN KEY (`departmentId`) REFERENCES `Departments` (`id`) ON DELETE SET NULL,
  CONSTRAINT `Settings_ibfk_3` FOREIGN KEY (`typeId`) REFERENCES `Types` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumpen data van tabel smartgardening.Settings: ~0 rows (ongeveer)
/*!40000 ALTER TABLE `Settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `Settings` ENABLE KEYS */;

-- Structuur van  tabel smartgardening.Types wordt geschreven
CREATE TABLE IF NOT EXISTS `Types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumpen data van tabel smartgardening.Types: ~0 rows (ongeveer)
/*!40000 ALTER TABLE `Types` DISABLE KEYS */;
/*!40000 ALTER TABLE `Types` ENABLE KEYS */;

-- Structuur van  tabel smartgardening.Users wordt geschreven
CREATE TABLE IF NOT EXISTS `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime default CURRENT_TIMESTAMP,
  `updatedAt` datetime default CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Users` ( `Username`, `Password`, `Email`) VALUES
	('admin', 'admin', 'admin');

-- Dumpen data van tabel smartgardening.Users: ~0 rows (ongeveer)
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
