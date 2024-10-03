-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 03-10-2024 a las 01:34:50
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

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
-- Estructura de tabla para la tabla `ambiente`
--

CREATE TABLE `ambiente` (
  `idAmbiente` int NOT NULL,
  `Nombre_ambiente` varchar(45) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `ambiente`
--

INSERT INTO `ambiente` (`idAmbiente`, `Nombre_ambiente`, `estado`) VALUES
(1, 'Laboratorio de Tostión', 'activo'),
(2, 'Laboratorio de Análisis Sensorial', 'activo'),
(3, 'Área de Trilla', 'activo'),
(4, 'Sala de Molienda', 'activo'),
(5, 'Área de Almacenamiento', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle`
--

CREATE TABLE `detalle` (
  `iddetalle` int NOT NULL,
  `detalle` varchar(45) DEFAULT NULL,
  `versiones_idVersion` int NOT NULL,
  `variables_idvariable` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `detalle`
--

INSERT INTO `detalle` (`iddetalle`, `detalle`, `versiones_idVersion`, `variables_idvariable`) VALUES
(6, 'Detalle asociado', 10, 1),
(7, 'Detalles....', 10, 2),
(8, 'Detalle asociado', 11, 1),
(9, 'Detalle asociado', 11, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos`
--

CREATE TABLE `documentos` (
  `iddocumentos` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `fecha_carga` date DEFAULT NULL,
  `codigo_documentos` varchar(100) DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `Fecha_Emision` date DEFAULT NULL,
  `estado` enum('activo','inactivo') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tiposervicio_idtiposervicio` int DEFAULT NULL,
  `tipoDocumento_idtipoDocumento` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `documentos`
--

INSERT INTO `documentos` (`iddocumentos`, `nombre`, `fecha_carga`, `codigo_documentos`, `descripcion`, `Fecha_Emision`, `estado`, `tiposervicio_idtiposervicio`, `tipoDocumento_idtipoDocumento`) VALUES
(12, 'Documento de Prueba', '2024-08-27', 'DOC001', 'Este es un documento de prueba', '2024-08-25', 'activo', NULL, 2),
(13, 'Documento de Prueba', '2024-08-27', 'DOC001', 'Este es un documento de prueba', '2024-08-25', 'inactivo', NULL, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `finca`
--

CREATE TABLE `finca` (
  `idfinca` int NOT NULL,
  `nombre_finca` varchar(50) DEFAULT NULL,
  `municipio_idmunicipio` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `finca`
--

INSERT INTO `finca` (`idfinca`, `nombre_finca`, `municipio_idmunicipio`) VALUES
(5, 'vellavista', 1),
(6, 'vellavista', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logos`
--

CREATE TABLE `logos` (
  `idlogos` int NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `ruta` varchar(50) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `logos`
--

INSERT INTO `logos` (`idlogos`, `nombre`, `ruta`, `estado`) VALUES
(1, 'Sena', 'Documento..xtx..', 'activo'),
(2, 'Sena', 'Documento..xtx..', 'activo'),
(3, 'Escudo', 'Document...', 'activo'),
(4, 'Escudo', 'Document...', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logos_has_documentos`
--

CREATE TABLE `logos_has_documentos` (
  `logos_idlogos` int NOT NULL,
  `documentos_iddocumentos` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `logos_has_documentos`
--

INSERT INTO `logos_has_documentos` (`logos_idlogos`, `documentos_iddocumentos`) VALUES
(1, 12),
(2, 12),
(1, 13),
(2, 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `muestra`
--

CREATE TABLE `muestra` (
  `idmuestra` int NOT NULL,
  `cantidad_entrada` float DEFAULT NULL,
  `finca_idfinca` int NOT NULL,
  `fecha_muestra` date DEFAULT NULL,
  `codigo_muestra` varchar(45) DEFAULT NULL,
  `usuarios_idusuarios` int NOT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `muestra`
--

INSERT INTO `muestra` (`idmuestra`, `cantidad_entrada`, `finca_idfinca`, `fecha_muestra`, `codigo_muestra`, `usuarios_idusuarios`, `imagen`) VALUES
(2, 22.3, 5, '2024-09-05', 'MUESTRA-20240905-1', 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE `municipio` (
  `idmunicipio` int NOT NULL,
  `nombre_municipio` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `municipio`
--

INSERT INTO `municipio` (`idmunicipio`, `nombre_municipio`) VALUES
(1, 'Huila'),
(2, 'Huila');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `observaciones`
--

CREATE TABLE `observaciones` (
  `idobservaciones` int NOT NULL,
  `justificacion` text NOT NULL,
  `fecha` date NOT NULL,
  `servicio_idservicios` int NOT NULL,
  `usuarios_idusuarios` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precio`
--

CREATE TABLE `precio` (
  `idprecio` int NOT NULL,
  `estado_precio` enum('activo','inactivo') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `presentacion` varchar(45) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `tiposervicio_idtiposervicio` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `precio`
--

INSERT INTO `precio` (`idprecio`, `estado_precio`, `presentacion`, `precio`, `tiposervicio_idtiposervicio`) VALUES
(1, 'activo', 'kilogramo', 11000, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idcargos` int NOT NULL,
  `rol` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idcargos`, `rol`) VALUES
(1, 'administrador'),
(2, 'encargado'),
(3, 'cliente'),
(4, 'operario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `idservicios` int NOT NULL,
  `Ambiente_idAmbiente` int NOT NULL,
  `muestra_idmuestra` int NOT NULL,
  `Fecha` date DEFAULT NULL,
  `tiposervicio_idtiposervicio` int NOT NULL,
  `usuarios_idusuarios` int NOT NULL,
  `estado` enum('en proceso',' completado','pendiente') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `cantidad_salida` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`idservicios`, `Ambiente_idAmbiente`, `muestra_idmuestra`, `Fecha`, `tiposervicio_idtiposervicio`, `usuarios_idusuarios`, `estado`, `cantidad_salida`) VALUES
(2, 2, 1, '2024-08-27', 3, 1, 'pendiente', NULL),
(8, 3, 2, '2024-09-09', 2, 1, 'pendiente', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipodocumento`
--

CREATE TABLE `tipodocumento` (
  `idtipoDocumento` int NOT NULL,
  `nombreDocumento` varchar(45) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipodocumento`
--

INSERT INTO `tipodocumento` (`idtipoDocumento`, `nombreDocumento`, `estado`) VALUES
(1, 'Procesos Estratégicos', 'activo'),
(2, 'Procesos Misionales', 'activo'),
(3, 'Procesos de Soporte', 'activo'),
(4, 'Procesos de Evaluación', 'activo'),
(5, 'Servicios Tecnológicos', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposervicio`
--

CREATE TABLE `tiposervicio` (
  `idtiposervicio` int NOT NULL,
  `nombreServicio` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tiposervicio`
--

INSERT INTO `tiposervicio` (`idtiposervicio`, `nombreServicio`) VALUES
(1, 'tostion'),
(2, 'trilla'),
(3, 'analisis fisico '),
(4, 'analisis sensorial'),
(5, 'alquiler de laboratorio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuarios` int NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `correo_electronico` varchar(45) DEFAULT NULL,
  `contraseña` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tipo_documento` enum('cc','ti','nit','pasaporte') DEFAULT NULL,
  `numero_documento` int DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT NULL,
  `rol_idcargos` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusuarios`, `nombre`, `apellidos`, `correo_electronico`, `contraseña`, `tipo_documento`, `numero_documento`, `estado`, `rol_idcargos`) VALUES
(1, 'victor manuel', 'losada', 'victorlosada2211@gmail.com', '$2b$10$0n17VidmYL/duiOXlYWWnOODAdyvbP.lsqefWVu4y4GVikgxiK59e', 'cc', 1079534803, 'activo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valor`
--

CREATE TABLE `valor` (
  `idvalor` int NOT NULL,
  `valor` varchar(45) DEFAULT NULL,
  `detalle_iddetalle` int NOT NULL,
  `servicio_idservicios` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `valor`
--

INSERT INTO `valor` (`idvalor`, `valor`, `detalle_iddetalle`, `servicio_idservicios`) VALUES
(2, 'valores..', 6, 2),
(3, '...valor', 7, 8),
(4, 'Valor 1', 8, 2),
(5, 'Valor 2', 9, 2),
(7, 'Bourbon', 6, 8),
(8, 'Medio', 7, 8),
(9, '1500', 8, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variables`
--

CREATE TABLE `variables` (
  `idvariable` int NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT NULL,
  `tipoDato` enum('text','number','date') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `variables`
--

INSERT INTO `variables` (`idvariable`, `nombre`, `estado`, `tipoDato`) VALUES
(1, 'Variedad', 'activo', 'text'),
(2, 'Altura(msnm)', 'activo', 'number'),
(3, 'Nivel de tueste', 'activo', 'number'),
(4, 'Molienda', 'activo', 'text'),
(5, 'Observaciones', 'activo', 'text');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `versiones`
--

CREATE TABLE `versiones` (
  `idVersion` int NOT NULL,
  `version` varchar(45) DEFAULT NULL,
  `documentos_iddocumentos` int NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT NULL,
  `nombre_documento` varchar(45) DEFAULT NULL,
  `fecha_version` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `versiones`
--

INSERT INTO `versiones` (`idVersion`, `version`, `documentos_iddocumentos`, `estado`, `nombre_documento`, `fecha_version`) VALUES
(10, 'v1.0', 12, 'activo', 'Documento de Prueba v1.0', '2024-08-27 00:00:00'),
(11, 'v1.0', 13, 'activo', 'Documento de Prueba v1.0', '2024-08-27 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `version_variable`
--

CREATE TABLE `version_variable` (
  `id` int NOT NULL,
  `idversion` int DEFAULT NULL,
  `idvariable` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ambiente`
--
ALTER TABLE `ambiente`
  ADD PRIMARY KEY (`idAmbiente`);

--
-- Indices de la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD PRIMARY KEY (`iddetalle`),
  ADD KEY `fk_detalle_versiones1_idx` (`versiones_idVersion`),
  ADD KEY `fk_detalle_variables1_idx` (`variables_idvariable`);

--
-- Indices de la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`iddocumentos`),
  ADD KEY `fk_documentos_tiposervicio1_idx` (`tiposervicio_idtiposervicio`),
  ADD KEY `fk_documentos_tipoDocumento1_idx` (`tipoDocumento_idtipoDocumento`);

--
-- Indices de la tabla `finca`
--
ALTER TABLE `finca`
  ADD PRIMARY KEY (`idfinca`),
  ADD KEY `fk_finca_municipio1_idx` (`municipio_idmunicipio`);

--
-- Indices de la tabla `logos`
--
ALTER TABLE `logos`
  ADD PRIMARY KEY (`idlogos`);

--
-- Indices de la tabla `logos_has_documentos`
--
ALTER TABLE `logos_has_documentos`
  ADD PRIMARY KEY (`logos_idlogos`,`documentos_iddocumentos`),
  ADD KEY `fk_logos_has_documentos_documentos1_idx` (`documentos_iddocumentos`),
  ADD KEY `fk_logos_has_documentos_logos1_idx` (`logos_idlogos`);

--
-- Indices de la tabla `muestra`
--
ALTER TABLE `muestra`
  ADD PRIMARY KEY (`idmuestra`),
  ADD KEY `fk_muestra_finca1_idx` (`finca_idfinca`),
  ADD KEY `fk_muestra_usuarios1_idx` (`usuarios_idusuarios`);

--
-- Indices de la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`idmunicipio`);

--
-- Indices de la tabla `observaciones`
--
ALTER TABLE `observaciones`
  ADD PRIMARY KEY (`idobservaciones`),
  ADD KEY `servicio_idservicios` (`servicio_idservicios`),
  ADD KEY `usuarios_idusuarios` (`usuarios_idusuarios`);

--
-- Indices de la tabla `precio`
--
ALTER TABLE `precio`
  ADD PRIMARY KEY (`idprecio`),
  ADD KEY `fk_precio_tiposervicio1_idx` (`tiposervicio_idtiposervicio`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idcargos`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`idservicios`),
  ADD KEY `fk_servicio_Ambiente1_idx` (`Ambiente_idAmbiente`),
  ADD KEY `fk_servicio_muestra1_idx` (`muestra_idmuestra`),
  ADD KEY `fk_servicio_tiposervicio1_idx` (`tiposervicio_idtiposervicio`),
  ADD KEY `fk_servicio_usuarios1_idx` (`usuarios_idusuarios`);

--
-- Indices de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  ADD PRIMARY KEY (`idtipoDocumento`);

--
-- Indices de la tabla `tiposervicio`
--
ALTER TABLE `tiposervicio`
  ADD PRIMARY KEY (`idtiposervicio`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuarios`),
  ADD KEY `fk_usuarios_rol1_idx` (`rol_idcargos`);

--
-- Indices de la tabla `valor`
--
ALTER TABLE `valor`
  ADD PRIMARY KEY (`idvalor`),
  ADD KEY `fk_valor_detalle1_idx` (`detalle_iddetalle`),
  ADD KEY `fk_valor_servicio1_idx` (`servicio_idservicios`);

--
-- Indices de la tabla `variables`
--
ALTER TABLE `variables`
  ADD PRIMARY KEY (`idvariable`);

--
-- Indices de la tabla `versiones`
--
ALTER TABLE `versiones`
  ADD PRIMARY KEY (`idVersion`),
  ADD KEY `fk_versiones_documentos1_idx` (`documentos_iddocumentos`);

--
-- Indices de la tabla `version_variable`
--
ALTER TABLE `version_variable`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idversion` (`idversion`),
  ADD KEY `idvariable` (`idvariable`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ambiente`
--
ALTER TABLE `ambiente`
  MODIFY `idAmbiente` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `detalle`
--
ALTER TABLE `detalle`
  MODIFY `iddetalle` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `documentos`
--
ALTER TABLE `documentos`
  MODIFY `iddocumentos` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `finca`
--
ALTER TABLE `finca`
  MODIFY `idfinca` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `logos`
--
ALTER TABLE `logos`
  MODIFY `idlogos` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `muestra`
--
ALTER TABLE `muestra`
  MODIFY `idmuestra` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `municipio`
--
ALTER TABLE `municipio`
  MODIFY `idmunicipio` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `observaciones`
--
ALTER TABLE `observaciones`
  MODIFY `idobservaciones` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `precio`
--
ALTER TABLE `precio`
  MODIFY `idprecio` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idcargos` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `idservicios` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  MODIFY `idtipoDocumento` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tiposervicio`
--
ALTER TABLE `tiposervicio`
  MODIFY `idtiposervicio` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuarios` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `valor`
--
ALTER TABLE `valor`
  MODIFY `idvalor` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `variables`
--
ALTER TABLE `variables`
  MODIFY `idvariable` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `versiones`
--
ALTER TABLE `versiones`
  MODIFY `idVersion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `version_variable`
--
ALTER TABLE `version_variable`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD CONSTRAINT `detalle_ibfk_1` FOREIGN KEY (`versiones_idVersion`) REFERENCES `versiones` (`idVersion`),
  ADD CONSTRAINT `detalle_ibfk_2` FOREIGN KEY (`variables_idvariable`) REFERENCES `variables` (`idvariable`);

--
-- Filtros para la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD CONSTRAINT `documentos_ibfk_1` FOREIGN KEY (`tipoDocumento_idtipoDocumento`) REFERENCES `tipodocumento` (`idtipoDocumento`),
  ADD CONSTRAINT `documentos_ibfk_2` FOREIGN KEY (`tiposervicio_idtiposervicio`) REFERENCES `tiposervicio` (`idtiposervicio`);

--
-- Filtros para la tabla `finca`
--
ALTER TABLE `finca`
  ADD CONSTRAINT `finca_ibfk_1` FOREIGN KEY (`municipio_idmunicipio`) REFERENCES `municipio` (`idmunicipio`);

--
-- Filtros para la tabla `logos_has_documentos`
--
ALTER TABLE `logos_has_documentos`
  ADD CONSTRAINT `logos_has_documentos_ibfk_1` FOREIGN KEY (`documentos_iddocumentos`) REFERENCES `documentos` (`iddocumentos`),
  ADD CONSTRAINT `logos_has_documentos_ibfk_2` FOREIGN KEY (`logos_idlogos`) REFERENCES `logos` (`idlogos`);

--
-- Filtros para la tabla `muestra`
--
ALTER TABLE `muestra`
  ADD CONSTRAINT `muestra_ibfk_1` FOREIGN KEY (`usuarios_idusuarios`) REFERENCES `usuarios` (`idusuarios`),
  ADD CONSTRAINT `muestra_ibfk_2` FOREIGN KEY (`finca_idfinca`) REFERENCES `finca` (`idfinca`);

--
-- Filtros para la tabla `observaciones`
--
ALTER TABLE `observaciones`
  ADD CONSTRAINT `observaciones_ibfk_1` FOREIGN KEY (`servicio_idservicios`) REFERENCES `servicio` (`idservicios`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `observaciones_ibfk_2` FOREIGN KEY (`usuarios_idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `precio`
--
ALTER TABLE `precio`
  ADD CONSTRAINT `precio_ibfk_1` FOREIGN KEY (`tiposervicio_idtiposervicio`) REFERENCES `tiposervicio` (`idtiposervicio`);

--
-- Filtros para la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD CONSTRAINT `servicio_ibfk_1` FOREIGN KEY (`tiposervicio_idtiposervicio`) REFERENCES `tiposervicio` (`idtiposervicio`),
  ADD CONSTRAINT `servicio_ibfk_2` FOREIGN KEY (`usuarios_idusuarios`) REFERENCES `usuarios` (`idusuarios`),
  ADD CONSTRAINT `servicio_ibfk_3` FOREIGN KEY (`Ambiente_idAmbiente`) REFERENCES `ambiente` (`idAmbiente`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_idcargos`) REFERENCES `rol` (`idcargos`);

--
-- Filtros para la tabla `valor`
--
ALTER TABLE `valor`
  ADD CONSTRAINT `valor_ibfk_1` FOREIGN KEY (`detalle_iddetalle`) REFERENCES `detalle` (`iddetalle`),
  ADD CONSTRAINT `valor_ibfk_2` FOREIGN KEY (`servicio_idservicios`) REFERENCES `servicio` (`idservicios`);

--
-- Filtros para la tabla `versiones`
--
ALTER TABLE `versiones`
  ADD CONSTRAINT `versiones_ibfk_1` FOREIGN KEY (`documentos_iddocumentos`) REFERENCES `documentos` (`iddocumentos`);

--
-- Filtros para la tabla `version_variable`
--
ALTER TABLE `version_variable`
  ADD CONSTRAINT `version_variable_ibfk_1` FOREIGN KEY (`idversion`) REFERENCES `versiones` (`idVersion`),
  ADD CONSTRAINT `version_variable_ibfk_2` FOREIGN KEY (`idvariable`) REFERENCES `variables` (`idvariable`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
