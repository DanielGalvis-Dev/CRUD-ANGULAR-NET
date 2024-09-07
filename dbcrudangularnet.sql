-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-09-2024 a las 15:40:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbcrudangularnet`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_createEmpleado` (IN `p_Nombre` VARCHAR(50), IN `p_Apellido` VARCHAR(50), IN `p_Correo` VARCHAR(100), IN `p_Sueldo` INT, IN `p_FechaContrato` VARCHAR(10))   BEGIN
    INSERT INTO empleados (
        nombre,
        apellido,
        correo,
        sueldo,
        fechaContrato
    )
    VALUES (
        p_Nombre,
        p_Apellido,
        p_Correo,
        p_Sueldo,
        STR_TO_DATE(p_FechaContrato, '%d/%m/%Y')
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deleteEmpleado` (IN `p_Id` INT)   BEGIN
    DELETE FROM empleados
    WHERE id = p_Id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getEmpleado` (IN `p_Id` INT)   BEGIN
    SELECT * FROM empleados
    WHERE id = p_Id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_readEmpleados` ()   BEGIN
    SELECT * FROM empleados;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_updateEmpleado` (IN `p_Id` INT, IN `p_Nombre` VARCHAR(50), IN `p_Apellido` VARCHAR(50), IN `p_Correo` VARCHAR(100), IN `p_Sueldo` INT, IN `p_FechaContrato` VARCHAR(10))   BEGIN
    UPDATE empleados SET
        nombre = p_Nombre,
        apellido = p_Apellido,
        correo = p_Correo,
        sueldo = p_Sueldo,
        fechaContrato = STR_TO_DATE(p_FechaContrato, '%d/%m/%Y')
    WHERE id = p_Id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `sueldo` int(10) NOT NULL,
  `fechaContrato` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
