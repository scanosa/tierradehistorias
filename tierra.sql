-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql82
-- Generation Time: Jul 07, 2024 at 10:08 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: 'tierra'
--

-- --------------------------------------------------------

--
-- Table structure for table 'books'
--

CREATE TABLE 'books' (
  'id' int NOT NULL,
  'title' varchar(255) NOT NULL,
  'editorial' varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  'description' text,
  'ano' int NOT NULL,
  'autor' varchar(255) NOT NULL,
  'image' varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table 'books'
--

INSERT INTO 'books' ('id', 'title', 'editorial', 'description', 'ano', 'autor', 'image') VALUES
(1, 'El Principito', 'Catapulta', 'Un misterioso principito se hace amigo de un piloto que ha sufrido un accidente en medio del desierto.', 1943, 'Antoine de Saint Exupery', '/uploads/1.png'),
(2, 'Alicia en el pais de las maravillas', 'Unaluna', '¿Quién no conoce la historia de las aventuras de Alicia en el País de las Maravillas? Esa niña que cae en un pozo persiguiendo a un conejo blanco.', 1865, 'Lewis Carroll', '/uploads/2.png'),
(3, '¿Donde esta? Leon', 'Contrapunto', '¡Es un lindo día en el zoo! ¿Dónde está el tucán? ¿Quién está feliz comiendo manzanas? ¿Quiénes están jugando a las escondidas?', 2001, 'Camila reid', '/uploads/3.png'),
(4, 'El monstruo de colores', 'Flamboyant', 'El Monstruo de Colores no sabe qué le pasa. Se ha hecho un lío con las emociones y ahora deberá aprender a poner en orden la alegría, la tristeza, la rabia, el miedo y la calma. Una historia sencilla y divertida, que introducirá a pequeños y a mayores en el fascinante lenguaje de las emociones.', 2001, 'Anna Llenas ', '/uploads/4.png');

-- --------------------------------------------------------

--
-- Table structure for table 'users'
--

CREATE TABLE 'users' (
  'id' int NOT NULL,
  'username' varchar(255) NOT NULL,
  'password' varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table 'users'
--

INSERT INTO 'users' ('id', 'username', 'password') VALUES
(1, 'admin', '$2a$08$ihKbg9LeYH56w5DBVZPqc.V85DrHtQ2h.htQMSekzb01tAksDxada'),
(2, 'cintia', '$2a$08$73ANQqLHkiW2j03AEyVL7OYBmd8sj/QmYEZd8Bor9/.4iwuKjh9CS'),
(3, 'sebastian', '$2a$08$9SAYITAoSfTYBokxbU1uFu02Srrf45e2IcGysyxmLiqvHsu1GuJwC'),
(4, 'lucas', '$2a$08$taNoiz6.k3fXk317Uu8SXOnaX6PjqZd0jdTLl2AnTExd4ILwpDrnS'),
(5, 'valeria', '$2a$08$LQSOz8/FrFcLZFSVc/44mOyM0jlVk5/zFuBJCe4dE8fyTz4hVHRmi'),
(6, 'usuario', '$2a$08$OAHEzSMw4.F7bCfTiSo9X.aMS2Nn/8BMhl9LHooFr/z.zdNllSiFa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table 'books'
--
ALTER TABLE 'books'
  ADD PRIMARY KEY ('id');

--
-- Indexes for table 'users'
--
ALTER TABLE 'users'
  ADD PRIMARY KEY ('id');

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table 'books'
--
ALTER TABLE 'books'
  MODIFY 'id' int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table 'users'
--
ALTER TABLE 'users'
  MODIFY 'id' int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


