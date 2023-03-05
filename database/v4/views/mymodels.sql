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
-- Structure de la vue `mymodels`
--

DROP VIEW IF EXISTS `mymodels`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `mymodels`  AS SELECT `mu`.`id` AS `id`, `mu`.`model` AS `idModel`, `mu`.`state` AS `state`, `mu`.`pictures` AS `pictures`, `mu`.`owner` AS `owner`, `s`.`name` AS `stateName`, `m`.`name` AS `modelName`, `m`.`reference` AS `reference`, `m`.`picture` AS `boxPicture`, `bu`.`name` AS `builderName`, `st`.`name` AS `scaleName`, `br`.`name` AS `brandName` FROM (((((`model_user` `mu` join `state` `s` on((`mu`.`state` = `s`.`id`))) join `model` `m` on((`mu`.`model` = `m`.`id`))) join `builders` `bu` on((`m`.`builder` = `bu`.`id`))) join `scale` `st` on((`m`.`scale` = `st`.`id`))) join `brand` `br` on((`m`.`brand` = `br`.`id`)))  ;

--
-- VIEW `mymodels`
-- Données : Aucun(e)
--

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
