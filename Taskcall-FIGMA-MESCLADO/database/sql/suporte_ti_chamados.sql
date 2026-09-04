-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: suporte_ti
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `chamados`
--

DROP TABLE IF EXISTS `chamados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chamados` (
  `cod_chamado` int NOT NULL,
  `descricao` varchar(150) NOT NULL,
  `categoria` varchar(15) NOT NULL,
  `status` varchar(15) NOT NULL,
  `data` datetime NOT NULL,
  `id_usuario` int NOT NULL,
  `num_equipamento` int NOT NULL,
  PRIMARY KEY (`cod_chamado`),
  KEY `idx_chamados_usuario` (`id_usuario`),
  KEY `idx_chamados_equipamento` (`num_equipamento`),
  CONSTRAINT `fk_chamados_equipamento` FOREIGN KEY (`num_equipamento`) REFERENCES `equipamentos` (`num_equipamentos`),
  CONSTRAINT `fk_chamados_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chamados`
--

LOCK TABLES `chamados` WRITE;
/*!40000 ALTER TABLE `chamados` DISABLE KEYS */;
INSERT INTO `chamados` VALUES (101,'Computador não liga após queda de energia','Hardware','Aberto','2026-08-10 09:30:00',3,1),(102,'Lentidão ao abrir o sistema interno','Software','Em Andamento','2026-08-10 11:15:00',4,2),(103,'Tela azul recorrente durante uso','Hardware','Pendente','2026-08-11 08:00:00',3,3),(104,'Solicitação de instalação de software de design','Software','Concluído','2026-08-11 14:20:00',4,4),(105,'Projetor com imagem piscando constantemente','Hardware','Aberto','2026-08-18 10:15:00',3,5),(106,'Ponto de rede sem conexão de internet','Rede','Aberto','2026-08-18 10:30:00',4,6),(107,'Computador travando na inicialização do SO','Hardware','Em Andamento','2026-08-18 11:00:00',3,7),(108,'Impressora apresentando atolamento de papel','Hardware','Pendente','2026-08-18 11:45:00',4,8);
/*!40000 ALTER TABLE `chamados` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-25 14:59:29
