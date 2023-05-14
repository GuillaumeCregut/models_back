-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 05 mars 2023 à 22:38
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
-- Structure de la vue `model_full`
--

DROP VIEW IF EXISTS `model_full`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `model_full`  AS SELECT `m`.`id` AS `id`, `m`.`name` AS `name`, `m`.`builder` AS `builder`, `m`.`category` AS `category`, `m`.`brand` AS `brand`, `m`.`period` AS `period`, `m`.`scale` AS `scale`, `m`.`reference` AS `reference`, `m`.`picture` AS `picture`, `m`.`scalemates` AS `scalemates`, `bu`.`name` AS `buildername`, `bu`.`country` AS `countryid`, `c`.`name` AS `categoryname`, `br`.`name` AS `brandname`, `p`.`name` AS `periodname`, `s`.`name` AS `scalename`, `co`.`name` AS `countryname` FROM ((((((`model` `m` join `builders` `bu` on((`m`.`builder` = `bu`.`id`))) join `category` `c` on((`m`.`category` = `c`.`id`))) join `brand` `br` on((`m`.`brand` = `br`.`id`))) join `period` `p` on((`m`.`period` = `p`.`id`))) join `scale` `s` on((`m`.`scale` = `s`.`id`))) join `country` `co` on((`bu`.`country` = `co`.`id`)))  ;

--
-- VIEW `model_full`
-- Données : Aucun(e)
--

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
