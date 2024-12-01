-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: books
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `profesores`
--

DROP TABLE IF EXISTS `profesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesores` (
  `idprofesores` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) DEFAULT NULL,
  `departamento_academico` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`idprofesores`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores`
--

LOCK TABLES `profesores` WRITE;
/*!40000 ALTER TABLE `profesores` DISABLE KEYS */;
INSERT INTO `profesores` VALUES (1,'Janet León Rodríguez','Arte'),(2,'Luz Malavé Martínez','Arte'),(3,'Roxanne Cepero','Arte'),(4,'Lina Llanos Vargas','Ciencias y Tecnología'),(5,'Nilda Caraballo','Ciencias y Tecnología'),(6,'Joel Arnaud Vélez','Ciencias y Tecnología'),(7,'Alexis Valentín Vélez','Ciencias y Tecnología'),(8,'Alvaro Lecompte Montes','Ciencias y Tecnología'),(9,'Ángela González Mederos','Ciencias y Tecnología'),(10,'Axel Vélez Caraballo','Ciencias y Tecnología'),(11,'Balbino García Bernal','Ciencias y Tecnología'),(12,'Derek Soto Rodríguez','Ciencias y Tecnología'),(13,'Edwin Montalvo García','Ciencias y Tecnología'),(14,'Juan Vélez Rodríguez','Ciencias y Tecnología'),(15,'Héctor Quintero Vilella','Ciencias y Tecnología'),(16,'Lucille Oliver Cebolleros','Ciencias y Tecnología'),(17,'Marcos Acosta Medina','Ciencias y Tecnología'),(18,'Rafael Muñoz Justiniano','Ciencias y Tecnología'),(19,'Sarah Torres Ruiz','Ciencias y Tecnología'),(20,'Yoshira Ayala','Ciencias y Tecnología'),(21,'Angie P Córdoba Rodas','Ciencias y Tecnología'),(22,'Brenda Rivera Ramírez','Ciencias y Tecnología'),(23,'Carlos Linares Medina','Ciencias y Tecnología'),(24,'Carl López Candelario','Ciencias y Tecnología'),(25,'Carlos Martínez Bonilla','Ciencias y Tecnología'),(26,'Cindy E. Vega Martínez','Ciencias y Tecnología'),(27,'Cindy Rivera Milanés','Ciencias y Tecnología'),(28,'Darvin Colón Herrera','Ciencias y Tecnología'),(29,'Diana Sánchez Rivera','Ciencias y Tecnología'),(30,'Eladio Quiñones Pellicier','Ciencias y Tecnología'),(31,'Guillermo Mejía Gómez','Ciencias y Tecnología'),(32,'Helga Y Soto Ortiz','Ciencias y Tecnología'),(33,'Hilda Irizarry Ramírez','Ciencias y Tecnología'),(34,'Jenniffer A Vélez Vega','Ciencias y Tecnología'),(35,'José L Vera Serrano','Ciencias y Tecnología'),(36,'Marian Espola Sepúlveda','Ciencias y Tecnología'),(37,'Maricelys Figueroa Ruiz','Ciencias y Tecnología'),(38,'Mercedes Rodríguez Méndez','Ciencias y Tecnología'),(39,'Misael Viruet Vigo','Ciencias y Tecnología'),(40,'Nicole M. Moreno Piñero','Ciencias y Tecnología'),(41,'Pedro Fierro Mercado','Ciencias y Tecnología'),(42,'Rhianna F. Smith Dorr','Ciencias y Tecnología'),(43,'Samuel Rosario Torres','Ciencias y Tecnología'),(44,'Sarai Nieves Bernard','Ciencias y Tecnología'),(45,'Tania Rodríguez López','Ciencias y Tecnología'),(46,'Wanda I Murphy Almodóvar','Ciencias y Tecnología'),(47,'Wilma Montalvo Rivera','Ciencias y Tecnología'),(48,'Carlos E. Irizarry Guzmán','Ciencias Empresariales y Gerenciales'),(49,'Carmen Lugo Negrón','Ciencias Empresariales y Gerenciales'),(50,'Ailín Padilla González','Ciencias Empresariales y Gerenciales'),(51,'Lilliam L. Perdomo Sánchez','Ciencias Empresariales y Gerenciales'),(52,'Laura A. Sepúlveda Padilla','Ciencias Empresariales y Gerenciales'),(53,'Lester Torres Rivera','Ciencias Empresariales y Gerenciales'),(54,'Luz L. Vega Rosado','Ciencias Empresariales y Gerenciales'),(55,'Waldemar Vélez Toro','Ciencias Empresariales y Gerenciales'),(56,'Evelyn Zapata Padilla','Ciencias Empresariales y Gerenciales'),(57,'Dra. Caroline Ayala Martínez','Ciencias Empresariales y Gerenciales'),(58,'Prof. Carlos J. Camacho Montalvo','Ciencias Empresariales y Gerenciales'),(59,'Dr. Lloyd G. Camacho Valle','Ciencias Empresariales y Gerenciales'),(60,'Profa. Ana J. García Mercado','Ciencias Empresariales y Gerenciales'),(61,'Lcda. Frances M. Devaris Martínez','Ciencias Empresariales y Gerenciales'),(62,'Dra. Celia M. González Collado','Ciencias Empresariales y Gerenciales'),(63,'Dr. Andrés Gutiérrez Desa','Ciencias Empresariales y Gerenciales'),(64,'Lecompte Montes','Ciencias Empresariales y Gerenciales'),(65,'Dr. Carlos M. Martínez Bonilla','Ciencias Empresariales y Gerenciales'),(66,'Prof. Christian Martínez Morales','Ciencias Empresariales y Gerenciales'),(67,'Profa. Milca V. Martínez Vázquez','Ciencias Empresariales y Gerenciales'),(68,'Profa. Madeline Matías Méndez','Ciencias Empresariales y Gerenciales'),(69,'Dr. José G. Montanez Orengo','Ciencias Empresariales y Gerenciales'),(70,'Profa. Cristina Montañez Padilla','Ciencias Empresariales y Gerenciales'),(71,'Profa. Wanda I. Murphy, DMN','Ciencias Empresariales y Gerenciales'),(72,'Dra. Saraí Nieves Bernard','Ciencias Empresariales y Gerenciales'),(73,'Profa. Mildred Ortiz Justiniano','Ciencias Empresariales y Gerenciales'),(74,'Dra. Zulma Quiñones Howell','Ciencias Empresariales y Gerenciales'),(75,'Profa. Gladys Rivera Martínez','Ciencias Empresariales y Gerenciales'),(76,'Dr. Eliezer Romeu Polanco','Ciencias Empresariales y Gerenciales'),(77,'Prof. Samuel Rosario Torres','Ciencias Empresariales y Gerenciales'),(78,'Dr. Juan G. Vélez Rodríguez','Ciencias Empresariales y Gerenciales'),(79,'MARY L. MARTÍNEZ ALDEBOL','Ciencias Sociales, Educación y Humanidades'),(80,'SANDRA RODRÍGUEZ','Ciencias Sociales, Educación y Humanidades'),(81,'ZAYRA GUASP','Ciencias Sociales, Educación y Humanidades'),(82,'OSMARY OLIVENCIA SÁNCHEZ','Ciencias Sociales, Educación y Humanidades'),(83,'WALTER RODRIGUEZ','Ciencias Sociales, Educación y Humanidades'),(84,'MARITZA VÉLEZ','Ciencias Sociales, Educación y Humanidades'),(85,'Dalizbeth Ortiz','Ciencias Sociales, Educación y Humanidades'),(86,'JULMARIE FELIBERTY','Ciencias Sociales, Educación y Humanidades'),(87,'Elba Irizarry','Ciencias Sociales, Educación y Humanidades'),(88,'MARY L. MARTÍNEZ','Ciencias Sociales, Educación y Humanidades'),(89,'MARI OLGA VALENTÍN','Ciencias Sociales, Educación y Humanidades'),(90,'KENNETH DILORENZO','Ciencias Sociales, Educación y Humanidades'),(91,'GRISSELLE ACOSTA','Ciencias Sociales, Educación y Humanidades'),(92,'ROSARIO MENDEZ','Ciencias Sociales, Educación y Humanidades'),(93,'CAROL MOE','Ciencias Sociales, Educación y Humanidades'),(94,'JOSÉ R. SELLAS','Ciencias Sociales, Educación y Humanidades'),(95,'GRACIELA TESÁN','Ciencias Sociales, Educación y Humanidades'),(96,'HÉCTOR TORRES MALAVÉ','Ciencias Sociales, Educación y Humanidades'),(97,'DIANA NAZARIO','Ciencias Sociales, Educación y Humanidades'),(98,'ILIA GUTIERREZ','Ciencias Sociales, Educación y Humanidades'),(99,'OSVALDO HERNANDEZ','Ciencias Sociales, Educación y Humanidades'),(100,'Ingrid Centeno Martell, Ed.D.','Música'),(101,'Luis Rosado Tollinchi','Música'),(102,'Nilda Betancourt Casillas','Música'),(103,'Daisy Colón Ramos','Música'),(104,'Jonathan A. Ferrer Troche','Música'),(105,'Samuel Rosado Nazario','Música'),(106,'Jedibí Maldonado Hernández','Música'),(107,'Héctor Maldonado Feliciano','Música'),(108,'Jonathan Marcial Ríos','Música'),(109,'Andrés Mojica Martínez','Música'),(110,'Gary Morales Rodríguez','Música'),(111,'Oscar Morales Sánchez','Música'),(112,'Madja Moreno Cepero','Música'),(113,'Michael Rivera','Música'),(114,'Brunilda Soto Gutierrez','Música'),(115,'Andrés Varcálcer Enríquez','Música'),(116,'Dr. Héctor Mercado','Escuela de Enfermería y Ciencias de la Salud'),(117,'Prof. Edna Santiago','Escuela de Enfermería y Ciencias de la Salud'),(118,'Prof. Denise Carbonell','Escuela de Enfermería y Ciencias de la Salud'),(119,'Dra. Elga Pérez','Escuela de Enfermería y Ciencias de la Salud'),(120,'Prof. Teresa Irizarry','Escuela de Enfermería y Ciencias de la Salud'),(121,'Prof. Anna Maldonado','Escuela de Enfermería y Ciencias de la Salud'),(122,'Prof. Rosa Garcés','Escuela de Enfermería y Ciencias de la Salud'),(123,'Prof. Ingrid Cruz','Escuela de Enfermería y Ciencias de la Salud'),(124,'Prof. Gloria I. Orta','Escuela de Enfermería y Ciencias de la Salud'),(125,'Dr. José Garcés','Escuela de Enfermería y Ciencias de la Salud'),(126,'Dr. Carlos E. Irizarry Guzmán','EEGI'),(127,'Sra. Sandra Ayala','EEGI'),(128,'Rafael Sánchez','EEGI');
/*!40000 ALTER TABLE `profesores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recomendaciones`
--

DROP TABLE IF EXISTS `recomendaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recomendaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `autor` varchar(255) NOT NULL,
  `titulo` text NOT NULL,
  `id_profesor` int NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_profesor` (`id_profesor`),
  CONSTRAINT `recomendaciones_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `profesores` (`idprofesores`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recomendaciones`
--

LOCK TABLES `recomendaciones` WRITE;
/*!40000 ALTER TABLE `recomendaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `recomendaciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-01 11:32:19
