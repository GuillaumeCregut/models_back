-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 05 mars 2023 à 22:37
-- Version du serveur : 8.0.21
-- Version de PHP : 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `modelskits`
--

-- --------------------------------------------------------

--
-- Structure de la vue `model_favorite`
--

DROP VIEW IF EXISTS `model_favorite`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `model_favorite`  AS SELECT `mu`.`id` AS `id`, `mu`.`owner` AS `owner`, `mu`.`model` AS `model`, `m`.`name` AS `modelName`, `b`.`name` AS `brandName`, `bu`.`name` AS `builderName`, `s`.`name` AS `scaleName` FROM ((((`model_user` `mu` join `model` `m` on((`mu`.`model` = `m`.`id`))) join `brand` `b` on((`m`.`brand` = `b`.`id`))) join `builders` `bu` on((`m`.`builder` = `bu`.`id`))) join `scale` `s` on((`m`.`scale` = `s`.`id`))) WHERE (`mu`.`state` = 4)  ;

--
-- VIEW `model_favorite`
-- Données : Aucun(e)
--

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
