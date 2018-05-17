-- --------------------------------------------------------
-- Host:                         server.pascalvanhoof.nl
-- Server versie:                5.7.17-0ubuntu0.16.04.1 - (Ubuntu)
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

-- Structuur van  tabel smartgardening.coordinate wordt geschreven
CREATE TABLE IF NOT EXISTS `coordinate` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Latitude` decimal(10,8) NOT NULL,
  `Longitude` decimal(11,8) NOT NULL,
  `DepartmentID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `DepartmentID` (`DepartmentID`),
  CONSTRAINT `coordinate_ibfk_1` FOREIGN KEY (`DepartmentID`) REFERENCES `department` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporteren was gedeselecteerd
-- Structuur van  tabel smartgardening.department wordt geschreven
CREATE TABLE IF NOT EXISTS `department` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `GreenhouseID` int(11) NOT NULL,
  `SensorSpacingX` float(6,2) NOT NULL,
  `SensorSpacingY` float(6,2) NOT NULL,
  `SensorSpacingZ` float(6,2) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `GreenhouseID` (`GreenhouseID`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`GreenhouseID`) REFERENCES `greenhouse` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Data exporteren was gedeselecteerd
-- Structuur van  tabel smartgardening.greenhouse wordt geschreven
CREATE TABLE IF NOT EXISTS `greenhouse` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Data exporteren was gedeselecteerd
-- Structuur van  tabel smartgardening.sensor wordt geschreven
CREATE TABLE IF NOT EXISTS `sensor` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SensorNodeID` int(11) NOT NULL,
  `TypeID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `SensorNodeID` (`SensorNodeID`),
  KEY `TypeID` (`TypeID`),
  CONSTRAINT `sensor_ibfk_1` FOREIGN KEY (`SensorNodeID`) REFERENCES `sensornode` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `sensor_ibfk_2` FOREIGN KEY (`TypeID`) REFERENCES `type` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

-- Data exporteren was gedeselecteerd
-- Structuur van  tabel smartgardening.sensordata wordt geschreven
CREATE TABLE IF NOT EXISTS `sensordata` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SensorID` int(11) NOT NULL,
  `Timestamp` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `Value` float(6,2) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `SensorID` (`SensorID`),
  CONSTRAINT `sensordata_ibfk_1` FOREIGN KEY (`SensorID`) REFERENCES `sensor` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Data exporteren was gedeselecteerd
-- Structuur van  tabel smartgardening.sensornode wordt geschreven
CREATE TABLE IF NOT EXISTS `sensornode` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DepartmentID` int(11) NOT NULL,
  `Latitude` decimal(10,8) NOT NULL,
  `Longitude` decimal(11,8) NOT NULL,
  `Altitude` float(6,2) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `DepartmentID` (`DepartmentID`),
  CONSTRAINT `sensornode_ibfk_1` FOREIGN KEY (`DepartmentID`) REFERENCES `department` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Data exporteren was gedeselecteerd
-- Structuur van  tabel smartgardening.setting wordt geschreven
CREATE TABLE IF NOT EXISTS `setting` (
  `UserID` int(11) NOT NULL,
  `DepartmentID` int(11) NOT NULL,
  `TypeID` int(11) NOT NULL,
  `Minimum` int(11) NOT NULL,
  `Maximum` int(11) NOT NULL,
  PRIMARY KEY (`UserID`,`DepartmentID`,`TypeID`),
  KEY `setting_ibfk_2` (`DepartmentID`),
  KEY `setting_ibfk_3` (`TypeID`),
  CONSTRAINT `setting_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `setting_ibfk_2` FOREIGN KEY (`DepartmentID`) REFERENCES `department` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `setting_ibfk_3` FOREIGN KEY (`TypeID`) REFERENCES `type` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporteren was gedeselecteerd
-- Structuur van  tabel smartgardening.type wordt geschreven
CREATE TABLE IF NOT EXISTS `type` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Unit` varchar(10) NOT NULL,
  `Name` varchar(30) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Data exporteren was gedeselecteerd
-- Structuur van  tabel smartgardening.user wordt geschreven
CREATE TABLE IF NOT EXISTS `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Data exporteren was gedeselecteerd
-- Structuur van  tabel smartgardening.user_greenhouse wordt geschreven
CREATE TABLE IF NOT EXISTS `user_greenhouse` (
  `UserID` int(11) NOT NULL,
  `GreenhouseID` int(11) NOT NULL,
  PRIMARY KEY (`UserID`,`GreenhouseID`),
  KEY `user_greenhouse_ibfk_1` (`GreenhouseID`),
  CONSTRAINT `user_greenhouse_ibfk_1` FOREIGN KEY (`GreenhouseID`) REFERENCES `greenhouse` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_greenhouse_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporteren was gedeselecteerd
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
