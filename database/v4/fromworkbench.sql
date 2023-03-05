-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: modelskits
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `all_info_model`
--

DROP TABLE IF EXISTS `all_info_model`;
/*!50001 DROP VIEW IF EXISTS `all_info_model`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `all_info_model` AS SELECT 
 1 AS `id`,
 1 AS `model`,
 1 AS `provider`,
 1 AS `pictures`,
 1 AS `price`,
 1 AS `owner`,
 1 AS `state`,
 1 AS `modelName`,
 1 AS `picture`,
 1 AS `reference`,
 1 AS `scalemates`,
 1 AS `brandName`,
 1 AS `periodName`,
 1 AS `scaleName`,
 1 AS `builderName`,
 1 AS `categoryName`,
 1 AS `providerName`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Special Hobby'),(2,'Tamiya'),(3,'Eduard'),(4,'Academy'),(5,'Revell'),(6,'Airfix'),(7,'Hasegawa'),(8,'Italeri'),(9,'Heller'),(10,'Fujimi');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `builders`
--

DROP TABLE IF EXISTS `builders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `builders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `country` int NOT NULL,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `c_country_family` (`country`),
  CONSTRAINT `c_country_family` FOREIGN KEY (`country`) REFERENCES `country` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `builders`
--

LOCK TABLES `builders` WRITE;
/*!40000 ALTER TABLE `builders` DISABLE KEYS */;
INSERT INTO `builders` VALUES (1,2,'Messerschmitt'),(2,2,'Focke Wulf'),(3,1,'Morane Saulnier'),(4,1,'Nieuport'),(5,6,'Supermarine'),(6,6,'Hawker'),(7,3,'Fairchild'),(8,3,'Grumann'),(9,3,'Consolited'),(10,3,'Republic'),(11,3,'North American'),(12,5,'Kawasaki'),(13,4,'Yakovlev'),(14,4,'Mikoyan Gurevitch'),(15,4,'Lavochkin'),(16,1,'Spad');
/*!40000 ALTER TABLE `builders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Blindés'),(2,'Avions'),(3,'Véhicules'),(4,'Navires'),(5,'Hélicoptères');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'France'),(2,'Allemagne'),(3,'U.S.A'),(4,'URSS'),(5,'Japon'),(6,'Angleterre');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend` (
  `id_friend1` int NOT NULL,
  `id_friend2` int NOT NULL,
  `is_ok` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_friend1`,`id_friend2`),
  KEY `id2_friend` (`id_friend2`),
  CONSTRAINT `id1_friend` FOREIGN KEY (`id_friend1`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `id2_friend` FOREIGN KEY (`id_friend2`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model`
--

DROP TABLE IF EXISTS `model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model` (
  `id` int NOT NULL AUTO_INCREMENT,
  `builder` int NOT NULL,
  `category` int NOT NULL,
  `brand` int NOT NULL,
  `period` int NOT NULL,
  `scale` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `reference` varchar(30) NOT NULL,
  `picture` varchar(200) DEFAULT NULL,
  `scalemates` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `c_brand_model` (`brand`),
  KEY `c_category_model` (`category`),
  KEY `c_family_model` (`builder`),
  KEY `c_period_model` (`period`),
  KEY `c_scale_model` (`scale`),
  CONSTRAINT `c_brand_model` FOREIGN KEY (`brand`) REFERENCES `brand` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `c_category_model` FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `c_family_model` FOREIGN KEY (`builder`) REFERENCES `builders` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `c_period_model` FOREIGN KEY (`period`) REFERENCES `period` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `c_scale_model` FOREIGN KEY (`scale`) REFERENCES `scale` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Temporary view structure for view `model_favorite`
--

DROP TABLE IF EXISTS `model_favorite`;
/*!50001 DROP VIEW IF EXISTS `model_favorite`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `model_favorite` AS SELECT 
 1 AS `id`,
 1 AS `owner`,
 1 AS `model`,
 1 AS `modelName`,
 1 AS `brandName`,
 1 AS `builderName`,
 1 AS `scaleName`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `model_full`
--

DROP TABLE IF EXISTS `model_full`;
/*!50001 DROP VIEW IF EXISTS `model_full`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `model_full` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `builder`,
 1 AS `category`,
 1 AS `brand`,
 1 AS `period`,
 1 AS `scale`,
 1 AS `reference`,
 1 AS `picture`,
 1 AS `scalemates`,
 1 AS `buildername`,
 1 AS `countryid`,
 1 AS `categoryname`,
 1 AS `brandname`,
 1 AS `periodname`,
 1 AS `scalename`,
 1 AS `countryname`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `model_order`
--

DROP TABLE IF EXISTS `model_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `model_id` int NOT NULL,
  `order_id` varchar(50) NOT NULL,
  `qtte` int NOT NULL,
  `price` double unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `model_order` (`model_id`),
  KEY `oder_order` (`order_id`),
  CONSTRAINT `model_order` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `oder_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`reference`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_order`
--


--
-- Table structure for table `model_user`
--

DROP TABLE IF EXISTS `model_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner` int NOT NULL,
  `model` int NOT NULL,
  `state` int NOT NULL,
  `provider` int DEFAULT NULL,
  `pictures` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `c_model_owner` (`owner`),
  KEY `c_model_state` (`state`),
  KEY `c_model_model` (`model`),
  CONSTRAINT `c_model_model` FOREIGN KEY (`model`) REFERENCES `model` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `c_model_owner` FOREIGN KEY (`owner`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `c_model_state` FOREIGN KEY (`state`) REFERENCES `state` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Temporary view structure for view `mymodels`
--

DROP TABLE IF EXISTS `mymodels`;
/*!50001 DROP VIEW IF EXISTS `mymodels`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `mymodels` AS SELECT 
 1 AS `id`,
 1 AS `idModel`,
 1 AS `state`,
 1 AS `pictures`,
 1 AS `owner`,
 1 AS `stateName`,
 1 AS `modelName`,
 1 AS `reference`,
 1 AS `boxPicture`,
 1 AS `builderName`,
 1 AS `scaleName`,
 1 AS `brandName`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `owner` int NOT NULL,
  `provider` int NOT NULL,
  `reference` varchar(50) NOT NULL,
  PRIMARY KEY (`reference`),
  KEY `c_order_owner` (`owner`),
  KEY `c_order_provider` (`provider`),
  CONSTRAINT `c_order_owner` FOREIGN KEY (`owner`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `c_order_provider` FOREIGN KEY (`provider`) REFERENCES `provider` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `period`
--

DROP TABLE IF EXISTS `period`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `period` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `period`
--

LOCK TABLES `period` WRITE;
/*!40000 ALTER TABLE `period` DISABLE KEYS */;
INSERT INTO `period` VALUES (1,'WWI'),(2,'WWII'),(3,'Vietnam'),(4,'Entre guerres'),(5,'Moderne');
/*!40000 ALTER TABLE `period` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider`
--

DROP TABLE IF EXISTS `provider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provider` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner` int NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `c_user_provider` (`owner`),
  CONSTRAINT `c_user_provider` FOREIGN KEY (`owner`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider`
--

--
-- Table structure for table `scale`
--

DROP TABLE IF EXISTS `scale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scale` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scale`
--

LOCK TABLES `scale` WRITE;
/*!40000 ALTER TABLE `scale` DISABLE KEYS */;
INSERT INTO `scale` VALUES (1,'1/72'),(2,'1/48'),(3,'1/24'),(4,'1/32'),(5,'1/35');
/*!40000 ALTER TABLE `scale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'En stock'),(2,'En cours'),(3,'Terminé'),(4,'Liste de souhaits'),(5,'Commandé');
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rankUser` int NOT NULL DEFAULT '1',
  `firstname` varchar(200) NOT NULL,
  `lastname` varchar(200) NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `login` varchar(200) NOT NULL,
  `email` varchar(255) NOT NULL,
  `refreshToken` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Final view structure for view `all_info_model`
--

/*!50001 DROP VIEW IF EXISTS `all_info_model`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `all_info_model` AS select `mu`.`id` AS `id`,`mu`.`model` AS `model`,`mu`.`provider` AS `provider`,`mu`.`pictures` AS `pictures`,`mu`.`price` AS `price`,`mu`.`owner` AS `owner`,`mu`.`state` AS `state`,`m`.`name` AS `modelName`,`m`.`picture` AS `picture`,`m`.`reference` AS `reference`,`m`.`scalemates` AS `scalemates`,`b`.`name` AS `brandName`,`p`.`name` AS `periodName`,`s`.`name` AS `scaleName`,`bu`.`name` AS `builderName`,`c`.`name` AS `categoryName`,`pr`.`name` AS `providerName` from (((((((`model_user` `mu` join `model` `m` on((`mu`.`model` = `m`.`id`))) join `brand` `b` on((`m`.`brand` = `b`.`id`))) join `period` `p` on((`m`.`period` = `p`.`id`))) join `scale` `s` on((`m`.`scale` = `s`.`id`))) join `builders` `bu` on((`m`.`builder` = `bu`.`id`))) join `category` `c` on((`m`.`category` = `c`.`id`))) left join `provider` `pr` on((`mu`.`provider` = `pr`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `model_favorite`
--

/*!50001 DROP VIEW IF EXISTS `model_favorite`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `model_favorite` AS select `mu`.`id` AS `id`,`mu`.`owner` AS `owner`,`mu`.`model` AS `model`,`m`.`name` AS `modelName`,`b`.`name` AS `brandName`,`bu`.`name` AS `builderName`,`s`.`name` AS `scaleName` from ((((`model_user` `mu` join `model` `m` on((`mu`.`model` = `m`.`id`))) join `brand` `b` on((`m`.`brand` = `b`.`id`))) join `builders` `bu` on((`m`.`builder` = `bu`.`id`))) join `scale` `s` on((`m`.`scale` = `s`.`id`))) where (`mu`.`state` = 4) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `model_full`
--

/*!50001 DROP VIEW IF EXISTS `model_full`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `model_full` AS select `m`.`id` AS `id`,`m`.`name` AS `name`,`m`.`builder` AS `builder`,`m`.`category` AS `category`,`m`.`brand` AS `brand`,`m`.`period` AS `period`,`m`.`scale` AS `scale`,`m`.`reference` AS `reference`,`m`.`picture` AS `picture`,`m`.`scalemates` AS `scalemates`,`bu`.`name` AS `buildername`,`bu`.`country` AS `countryid`,`c`.`name` AS `categoryname`,`br`.`name` AS `brandname`,`p`.`name` AS `periodname`,`s`.`name` AS `scalename`,`co`.`name` AS `countryname` from ((((((`model` `m` join `builders` `bu` on((`m`.`builder` = `bu`.`id`))) join `category` `c` on((`m`.`category` = `c`.`id`))) join `brand` `br` on((`m`.`brand` = `br`.`id`))) join `period` `p` on((`m`.`period` = `p`.`id`))) join `scale` `s` on((`m`.`scale` = `s`.`id`))) join `country` `co` on((`bu`.`country` = `co`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `mymodels`
--

/*!50001 DROP VIEW IF EXISTS `mymodels`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `mymodels` AS select `mu`.`id` AS `id`,`mu`.`model` AS `idModel`,`mu`.`state` AS `state`,`mu`.`pictures` AS `pictures`,`mu`.`owner` AS `owner`,`s`.`name` AS `stateName`,`m`.`name` AS `modelName`,`m`.`reference` AS `reference`,`m`.`picture` AS `boxPicture`,`bu`.`name` AS `builderName`,`st`.`name` AS `scaleName`,`br`.`name` AS `brandName` from (((((`model_user` `mu` join `state` `s` on((`mu`.`state` = `s`.`id`))) join `model` `m` on((`mu`.`model` = `m`.`id`))) join `builders` `bu` on((`m`.`builder` = `bu`.`id`))) join `scale` `st` on((`m`.`scale` = `st`.`id`))) join `brand` `br` on((`m`.`brand` = `br`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-05 23:46:47
