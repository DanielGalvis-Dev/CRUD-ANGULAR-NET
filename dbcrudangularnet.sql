-- Eliminar la base de datos si ya existe y crear una nueva
DROP DATABASE IF EXISTS dbcrudangularnet;
CREATE DATABASE dbcrudangularnet CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE dbcrudangularnet;

-- Procedimiento almacenado para insertar un nuevo empleado
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_createEmpleado` (
    IN `p_Nombre` VARCHAR(50),
    IN `p_Apellido` VARCHAR(50),
    IN `p_Correo` VARCHAR(100),
    IN `p_Sueldo` INT,
    IN `p_FechaContrato` VARCHAR(10)
)
BEGIN
    -- Insertar empleado en la tabla con la fecha convertida al formato de fecha de MySQL
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
END;

-- Procedimiento almacenado para eliminar un empleado por su ID
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deleteEmpleado` (IN `p_Id` INT)
BEGIN
    -- Eliminar empleado de la tabla por su ID
    DELETE FROM empleados
    WHERE id = p_Id;
END;

-- Procedimiento almacenado para obtener los datos de un empleado por su ID
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getEmpleado` (IN `p_Id` INT)
BEGIN
    -- Seleccionar un empleado de la tabla usando el ID proporcionado
    SELECT * FROM empleados
    WHERE id = p_Id;
END;

-- Procedimiento almacenado para obtener la lista completa de empleados
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_readEmpleados` ()
BEGIN
    -- Seleccionar todos los empleados de la tabla
    SELECT * FROM empleados;
END;

-- Procedimiento almacenado para actualizar los datos de un empleado
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_updateEmpleado` (
    IN `p_Id` INT,
    IN `p_Nombre` VARCHAR(50),
    IN `p_Apellido` VARCHAR(50),
    IN `p_Correo` VARCHAR(100),
    IN `p_Sueldo` INT,
    IN `p_FechaContrato` VARCHAR(10)
)
BEGIN
    -- Actualizar los datos del empleado con la información proporcionada
    UPDATE empleados SET
        nombre = p_Nombre,
        apellido = p_Apellido,
        correo = p_Correo,
        sueldo = p_Sueldo,
        fechaContrato = STR_TO_DATE(p_FechaContrato, '%d/%m/%Y')
    WHERE id = p_Id;
END;

-- Crear la tabla empleados con las columnas necesarias
CREATE TABLE `empleados` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, -- ID único para cada empleado
  `nombre` varchar(50) NOT NULL, -- Nombre del empleado
  `apellido` varchar(50) NOT NULL, -- Apellido del empleado
  `correo` varchar(100) NOT NULL, -- Correo electrónico del empleado
  `sueldo` int(10) NOT NULL, -- Sueldo del empleado
  `fechaContrato` date DEFAULT NULL -- Fecha de contrato del empleado
)