-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 26 jan. 2023 à 20:37
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
-- Structure de la table `brand`
--

DROP TABLE IF EXISTS `brand`;
CREATE TABLE IF NOT EXISTS `brand` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `brand`
--

INSERT INTO `brand` (`id`, `name`) VALUES
(1, 'Special Hobby'),
(2, 'Tamiya'),
(3, 'Eduard'),
(4, 'Academy'),
(5, 'Revell'),
(6, 'Airfix'),
(7, 'Hasegawa'),
(8, 'Italeri'),
(9, 'Heller'),
(10, 'Fujimi');

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Blindés'),
(2, 'Avions'),
(3, 'Véhicules'),
(4, 'Navires'),
(5, 'Hélicoptères');

-- --------------------------------------------------------

--
-- Structure de la table `country`
--

DROP TABLE IF EXISTS `country`;
CREATE TABLE IF NOT EXISTS `country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `country`
--

INSERT INTO `country` (`id`, `name`) VALUES
(1, 'France'),
(2, 'Allemagne'),
(3, 'U.S.A'),
(4, 'URSS'),
(5, 'Japon'),
(6, 'Angleterre');

-- --------------------------------------------------------

--
-- Structure de la table `family`
--

DROP TABLE IF EXISTS `family`;
CREATE TABLE IF NOT EXISTS `family` (
  `id` int NOT NULL AUTO_INCREMENT,
  `country` int NOT NULL,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `c_country_family` (`country`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `family`
--

INSERT INTO `family` (`id`, `country`, `name`) VALUES
(1, 2, 'Messerschmitt'),
(2, 2, 'Focke Wulf'),
(3, 1, 'Morane Saulnier'),
(4, 1, 'Nieuport'),
(5, 6, 'Supermarine'),
(6, 6, 'Hawker'),
(7, 3, 'Fairchild'),
(8, 3, 'Grumann'),
(9, 3, 'Consolited'),
(10, 3, 'Republic'),
(11, 3, 'North American'),
(12, 5, 'Kawasaki'),
(13, 4, 'Yakovlev'),
(14, 4, 'Mikoyan Gurevitch'),
(15, 4, 'Lavochkin');

-- --------------------------------------------------------

--
-- Structure de la table `friend`
--

DROP TABLE IF EXISTS `friend`;
CREATE TABLE IF NOT EXISTS `friend` (
  `id_friend1` int NOT NULL,
  `id_friend2` int NOT NULL,
  `is_ok` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_friend1`,`id_friend2`),
  KEY `id2_friend` (`id_friend2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `model`
--

DROP TABLE IF EXISTS `model`;
CREATE TABLE IF NOT EXISTS `model` (
  `id` int NOT NULL AUTO_INCREMENT,
  `family` int NOT NULL,
  `category` int NOT NULL,
  `brand` int NOT NULL,
  `period` int NOT NULL,
  `scale` int NOT NULL,
  `orders` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `reference` varchar(30) NOT NULL,
  `picture` varchar(200) DEFAULT NULL,
  `scalemates` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `c_brand_model` (`brand`),
  KEY `c_category_model` (`category`),
  KEY `c_family_model` (`family`),
  KEY `c_period_model` (`period`),
  KEY `c_scale_model` (`scale`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `model_user`
--

DROP TABLE IF EXISTS `model_user`;
CREATE TABLE IF NOT EXISTS `model_user` (
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
  KEY `c_model_model` (`model`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner` int NOT NULL,
  `provider` int NOT NULL,
  `reference` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `c_order_owner` (`owner`),
  KEY `c_order_provider` (`provider`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `period`
--

DROP TABLE IF EXISTS `period`;
CREATE TABLE IF NOT EXISTS `period` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `period`
--

INSERT INTO `period` (`id`, `name`) VALUES
(1, 'WWI'),
(2, 'WWII'),
(3, 'Vietnam'),
(4, 'Entre guerres'),
(5, 'Moderne');

-- --------------------------------------------------------

--
-- Structure de la table `provider`
--

DROP TABLE IF EXISTS `provider`;
CREATE TABLE IF NOT EXISTS `provider` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner` int NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `c_user_provider` (`owner`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `scale`
--

DROP TABLE IF EXISTS `scale`;
CREATE TABLE IF NOT EXISTS `scale` (
  `id` int NOT NULL AUTO_INCREMENT,
  `scale` varchar(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `scale`
--

INSERT INTO `scale` (`id`, `scale`) VALUES
(1, '1/72'),
(2, '1/48'),
(3, '1/24'),
(4, '1/32'),
(5, '1/35');

-- --------------------------------------------------------

--
-- Structure de la table `state`
--

DROP TABLE IF EXISTS `state`;
CREATE TABLE IF NOT EXISTS `state` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `state`
--

INSERT INTO `state` (`id`, `name`) VALUES
(1, 'En stock'),
(2, 'En cours'),
(3, 'Terminé'),
(4, 'Liste de souhaits'),
(5, 'Commandé');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rankUser` int NOT NULL DEFAULT '1',
  `firstname` varchar(200) NOT NULL,
  `lastname` varchar(200) NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `login` varchar(200) NOT NULL,
  `email` varchar(255) NOT NULL,
  `refreshToken` VARCHAR(255) NULL, 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Contraintes pour les tables déchargées
--
ALTER TABLE `user` ADD UNIQUE(`login`, `email`);
--
-- Contraintes pour la table `family`
--
ALTER TABLE `family`
  ADD CONSTRAINT `c_country_family` FOREIGN KEY (`country`) REFERENCES `country` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `friend`
--
ALTER TABLE `friend`
  ADD CONSTRAINT `id1_friend` FOREIGN KEY (`id_friend1`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `id2_friend` FOREIGN KEY (`id_friend2`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `model`
--
ALTER TABLE `model`
  ADD CONSTRAINT `c_brand_model` FOREIGN KEY (`brand`) REFERENCES `brand` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `c_category_model` FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `c_family_model` FOREIGN KEY (`family`) REFERENCES `family` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `c_period_model` FOREIGN KEY (`period`) REFERENCES `period` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `c_scale_model` FOREIGN KEY (`scale`) REFERENCES `scale` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `model_user`
--
ALTER TABLE `model_user`
  ADD CONSTRAINT `c_model_model` FOREIGN KEY (`model`) REFERENCES `model` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `c_model_owner` FOREIGN KEY (`owner`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `c_model_state` FOREIGN KEY (`state`) REFERENCES `state` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `c_order_owner` FOREIGN KEY (`owner`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `c_order_provider` FOREIGN KEY (`provider`) REFERENCES `provider` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `provider`
--
ALTER TABLE `provider`
  ADD CONSTRAINT `c_user_provider` FOREIGN KEY (`owner`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
