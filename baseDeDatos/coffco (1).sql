-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 01-04-2024 a las 00:45:51
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `coffco`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivos`
--

CREATE TABLE `archivos` (
  `id_documentos` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fecha_carga` date NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `fk_id_usuarios` int NOT NULL,
  `fk_id_formatos` int NOT NULL,
  `descripcion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos`
--

CREATE TABLE `datos` (
  `id_datos` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `tipo` float NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `fk_id_formato` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `datos`
--

INSERT INTO `datos` (`id_datos`, `nombre`, `tipo`, `estado`, `fk_id_formato`) VALUES
(1, 'que dato?', 2, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle`
--

CREATE TABLE `detalle` (
  `id_detalle` int NOT NULL,
  `fk_id_formato` int NOT NULL,
  `fk_id_datos` int NOT NULL,
  `valor` float NOT NULL,
  `fk_id_servicios` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `detalle`
--

INSERT INTO `detalle` (`id_detalle`, `fk_id_formato`, `fk_id_datos`, `valor`, `fk_id_servicios`) VALUES
(11, 1, 1, 1.1, 1),
(12, 1, 1, 2.2, 1),
(13, 1, 1, 3.3, 1),
(14, 1, 1, 4, 1),
(15, 1, 1, 5, 1),
(16, 1, 1, 6, 1),
(17, 1, 1, 7, 1),
(18, 1, 1, 8, 1),
(21, 1, 1, 11, 1),
(22, 1, 1, 11, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `finca`
--

CREATE TABLE `finca` (
  `id_finca` int NOT NULL,
  `nombre_finca` varchar(50) NOT NULL,
  `fk_id_municipio` int NOT NULL,
  `fk_id_usuario` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `finca`
--

INSERT INTO `finca` (`id_finca`, `nombre_finca`, `fk_id_municipio`, `fk_id_usuario`) VALUES
(1, 'la victoria', 1, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formato`
--

CREATE TABLE `formato` (
  `id_formato` int NOT NULL,
  `version` varchar(45) NOT NULL,
  `editable` tinyint(1) NOT NULL,
  `fk_id_tipo_formato` int NOT NULL,
  `fk_id_usuarios` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `formato`
--

INSERT INTO `formato` (`id_formato`, `version`, `editable`, `fk_id_tipo_formato`, `fk_id_usuarios`) VALUES
(1, '1', 1, 1, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `muestra`
--

CREATE TABLE `muestra` (
  `id_muestra` int NOT NULL,
  `cantidad` float NOT NULL,
  `fk_id_finca` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `muestra`
--

INSERT INTO `muestra` (`id_muestra`, `cantidad`, `fk_id_finca`) VALUES
(1, 12.5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE `municipio` (
  `id_municipio` int NOT NULL,
  `nombre_municipio` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `municipio`
--

INSERT INTO `municipio` (`id_municipio`, `nombre_municipio`) VALUES
(1, 'pitalito');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id_servicios` int NOT NULL,
  `tipo_servicios` varchar(100) NOT NULL,
  `fk_id_muestra` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id_servicios`, `tipo_servicios`, `fk_id_muestra`) VALUES
(1, 'tostion', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_formato`
--

CREATE TABLE `tipo_formato` (
  `id_formato` int NOT NULL,
  `fk_id_servicios` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_formato`
--

INSERT INTO `tipo_formato` (`id_formato`, `fk_id_servicios`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL,
  `nombre_usuario` varchar(45) NOT NULL,
  `apellido_usuario` varchar(45) NOT NULL,
  `correo_electronico` varchar(45) NOT NULL,
  `telefono_usuario` varchar(15) NOT NULL,
  `rol_usuario` enum('administrador','encargado','invitado') DEFAULT NULL,
  `contraseña_usuario` varchar(60) NOT NULL,
  `numero_identificacion` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `apellido_usuario`, `correo_electronico`, `telefono_usuario`, `rol_usuario`, `contraseña_usuario`, `numero_identificacion`) VALUES
(10, 'Jonathan', 'Sanchez', 'stiven@gmail.com', '320444', 'administrador', '1234', 0),
(11, 'stiven', 'Sanchez', 'jonathan@gmail.com', '320291', 'administrador', '12345', 0),
(12, 'Cler', 'Samboni', 'cler@gmail.com', '32029341', 'administrador', '123455', 0),
(14, 'Cler', 'Samboni', 'Cler@gmail.com', '3114567768', 'invitado', '456476', 2133343);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `archivos`
--
ALTER TABLE `archivos`
  ADD PRIMARY KEY (`id_documentos`),
  ADD KEY `ingresa` (`fk_id_usuarios`),
  ADD KEY `genera` (`fk_id_formatos`);

--
-- Indices de la tabla `datos`
--
ALTER TABLE `datos`
  ADD PRIMARY KEY (`id_datos`),
  ADD KEY `valida` (`fk_id_formato`);

--
-- Indices de la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `ingresar_valor` (`fk_id_formato`),
  ADD KEY `ingresar_dato` (`fk_id_datos`),
  ADD KEY `fk_id_servicios` (`fk_id_servicios`);

--
-- Indices de la tabla `finca`
--
ALTER TABLE `finca`
  ADD PRIMARY KEY (`id_finca`),
  ADD KEY `pertenece` (`fk_id_municipio`),
  ADD KEY `recibe` (`fk_id_usuario`);

--
-- Indices de la tabla `formato`
--
ALTER TABLE `formato`
  ADD PRIMARY KEY (`id_formato`),
  ADD KEY `generar_formato` (`fk_id_usuarios`),
  ADD KEY `realiza` (`fk_id_tipo_formato`);

--
-- Indices de la tabla `muestra`
--
ALTER TABLE `muestra`
  ADD PRIMARY KEY (`id_muestra`),
  ADD KEY `recibe_muestra` (`fk_id_finca`);

--
-- Indices de la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`id_municipio`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id_servicios`),
  ADD KEY `realiza_muestra` (`fk_id_muestra`);

--
-- Indices de la tabla `tipo_formato`
--
ALTER TABLE `tipo_formato`
  ADD PRIMARY KEY (`id_formato`),
  ADD KEY `pertenece_formato` (`fk_id_servicios`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `archivos`
--
ALTER TABLE `archivos`
  MODIFY `id_documentos` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `datos`
--
ALTER TABLE `datos`
  MODIFY `id_datos` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `detalle`
--
ALTER TABLE `detalle`
  MODIFY `id_detalle` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `finca`
--
ALTER TABLE `finca`
  MODIFY `id_finca` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `formato`
--
ALTER TABLE `formato`
  MODIFY `id_formato` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `muestra`
--
ALTER TABLE `muestra`
  MODIFY `id_muestra` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `municipio`
--
ALTER TABLE `municipio`
  MODIFY `id_municipio` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id_servicios` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tipo_formato`
--
ALTER TABLE `tipo_formato`
  MODIFY `id_formato` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `archivos`
--
ALTER TABLE `archivos`
  ADD CONSTRAINT `genera` FOREIGN KEY (`fk_id_formatos`) REFERENCES `formato` (`id_formato`),
  ADD CONSTRAINT `ingresa` FOREIGN KEY (`fk_id_usuarios`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `datos`
--
ALTER TABLE `datos`
  ADD CONSTRAINT `valida` FOREIGN KEY (`fk_id_formato`) REFERENCES `formato` (`id_formato`);

--
-- Filtros para la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD CONSTRAINT `detalle_ibfk_1` FOREIGN KEY (`fk_id_servicios`) REFERENCES `servicios` (`id_servicios`),
  ADD CONSTRAINT `ingresar_dato` FOREIGN KEY (`fk_id_datos`) REFERENCES `datos` (`id_datos`),
  ADD CONSTRAINT `ingresar_valor` FOREIGN KEY (`fk_id_formato`) REFERENCES `formato` (`id_formato`);

--
-- Filtros para la tabla `finca`
--
ALTER TABLE `finca`
  ADD CONSTRAINT `pertenece` FOREIGN KEY (`fk_id_municipio`) REFERENCES `municipio` (`id_municipio`),
  ADD CONSTRAINT `recibe` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `formato`
--
ALTER TABLE `formato`
  ADD CONSTRAINT `generar_formato` FOREIGN KEY (`fk_id_usuarios`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `realiza` FOREIGN KEY (`fk_id_tipo_formato`) REFERENCES `tipo_formato` (`id_formato`);

--
-- Filtros para la tabla `muestra`
--
ALTER TABLE `muestra`
  ADD CONSTRAINT `recibe_muestra` FOREIGN KEY (`fk_id_finca`) REFERENCES `finca` (`id_finca`);

--
-- Filtros para la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD CONSTRAINT `realiza_muestra` FOREIGN KEY (`fk_id_muestra`) REFERENCES `muestra` (`id_muestra`);

--
-- Filtros para la tabla `tipo_formato`
--
ALTER TABLE `tipo_formato`
  ADD CONSTRAINT `pertenece_formato` FOREIGN KEY (`fk_id_servicios`) REFERENCES `servicios` (`id_servicios`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
