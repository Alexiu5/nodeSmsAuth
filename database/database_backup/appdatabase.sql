-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-04-2018 a las 11:39:39
-- Versión del servidor: 10.1.31-MariaDB
-- Versión de PHP: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `appdatabase`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sms_verification`
--

CREATE TABLE `sms_verification` (
  `id_verication` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `sms_code` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_profile`
--

CREATE TABLE `type_profile` (
  `id_profile` int(2) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `type_profile`
--

INSERT INTO `type_profile` (`id_profile`, `name`) VALUES
(1, 'Admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `id_profile` int(2) DEFAULT '1',
  `state` int(1) NOT NULL DEFAULT '0' COMMENT '0 inactivo, 1 activo '
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`, `name`, `mail`, `phone_number`, `id_profile`, `state`) VALUES
(1, 'alex', '123456', 'Games', 'alex@visaje.com', '', 1, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `sms_verification`
--
ALTER TABLE `sms_verification`
  ADD PRIMARY KEY (`id_verication`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `type_profile`
--
ALTER TABLE `type_profile`
  ADD PRIMARY KEY (`id_profile`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `sms_verification`
--
ALTER TABLE `sms_verification`
  MODIFY `id_verication` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `type_profile`
--
ALTER TABLE `type_profile`
  MODIFY `id_profile` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `sms_verification`
--
ALTER TABLE `sms_verification`
  ADD CONSTRAINT `sms_verification_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
