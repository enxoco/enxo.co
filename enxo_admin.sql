-- MySQL dump 10.13  Distrib 8.0.19, for Linux (x86_64)
--
-- Host: localhost    Database: enxo_admin
-- ------------------------------------------------------
-- Server version	8.0.19-0ubuntu0.19.10.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adonis_schema`
--

DROP TABLE IF EXISTS `adonis_schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adonis_schema` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adonis_schema`
--

LOCK TABLES `adonis_schema` WRITE;
/*!40000 ALTER TABLE `adonis_schema` DISABLE KEYS */;
INSERT INTO `adonis_schema` VALUES (1,'1503248427885_user',1,'2018-02-10 15:24:46'),(2,'1503873023555_users_profile_schema',1,'2018-02-10 15:24:46'),(3,'1503873498593_password_resets_schema',1,'2018-02-10 15:24:46'),(4,'1516728622895_devices_schema',1,'2018-02-10 15:24:46'),(5,'1517071638658_device_user_schema',1,'2018-02-10 15:24:46'),(6,'1517071653021_report_user_schema',1,'2018-02-10 15:24:46'),(7,'1517073822060_partners_schema',1,'2018-02-10 15:24:46'),(8,'1518798427356_feedback_schema',2,'2018-02-16 16:43:46');
/*!40000 ALTER TABLE `adonis_schema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_users`
--

DROP TABLE IF EXISTS `device_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device_users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_users`
--

LOCK TABLES `device_users` WRITE;
/*!40000 ALTER TABLE `device_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `device_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `id` varchar(50) NOT NULL,
  `serial_number` varchar(50) NOT NULL,
  `user_id` int DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `device_type` varchar(255) DEFAULT NULL,
  `port` varchar(5) DEFAULT NULL,
  `sid` int DEFAULT NULL,
  UNIQUE KEY `devices_id_unique` (`id`),
  UNIQUE KEY `devices_serial_number_unique` (`serial_number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (NULL,NULL,'1','1',1,NULL,NULL,'6688',1),(NULL,NULL,'12','12',139,NULL,'Android','6638',1),(NULL,NULL,'1246512534','1246512534',51,NULL,'HP EliteBook 8470p','6638',1),(NULL,NULL,'2','2',1,NULL,NULL,'6688',1),(NULL,NULL,'2166136261','2166136261',11,NULL,'MacBookPro15,1','6610',1),(NULL,NULL,'320487051907','320487051907',201,NULL,'Android Phone',NULL,NULL),(NULL,NULL,'3244896220','3244896220',234,NULL,'MacBook','6687',1),(NULL,NULL,'329472328','329472328',140,NULL,'MacBook Air','6661',1),(NULL,NULL,'3604898390','3604898390',223,NULL,'','6687',1),(NULL,NULL,'3915727659837928302','3915727659837928302',52,NULL,'iPhone','6655',1),(NULL,NULL,'4199549671','4199549671',174,NULL,'MacBook Pro','6640',1),('2018-01-19 07:47:30','2018-01-19 07:47:39','657525545596211418','C6KSG7A8HG7M',47,'2qNpnMP6ZXJkKPP7e3','iPhone 7',NULL,1),(NULL,NULL,'657525545596217977','C6KQG402GRY9',156,NULL,'iPhone 6s',NULL,1),(NULL,NULL,'657525545596222314','DNPPGZJGG5MG',20,NULL,'iPhone',NULL,1),('2018-02-25 18:25:05','2018-02-25 18:25:05','657525545596222418','C02TD59GHF1R',23,NULL,'MacBook Pro',NULL,1),(NULL,NULL,'657525545596224276','C02P20QLG3QP',28,NULL,'MacBook',NULL,1),(NULL,NULL,'657525545596226890','657525545596226890',22,NULL,'MacBook Pro',NULL,NULL),(NULL,NULL,'657525545596723376','C02HWBATDRV7',42,NULL,'MacBook',NULL,1),(NULL,NULL,'657525545596726792','F4GVMHL6JC6K',22,NULL,'iPhone 8',NULL,1),(NULL,NULL,'657525545596735818','F2MT31DKHG03',3,NULL,'iPhone',NULL,1),(NULL,NULL,'657525545596738225','C6KSVYN8HG71',60,NULL,'iPhone',NULL,1),(NULL,NULL,'657525545596738829','DNPWN1JJJCL9',28,NULL,'iPhone',NULL,NULL),(NULL,NULL,'657525545596739389','DMQJW4XAF18W',61,NULL,'iPad',NULL,1),(NULL,NULL,'657525545596739510','F2MQQASEGRWV',61,NULL,'iPhone',NULL,1),(NULL,NULL,'657525545596739954','C7JQC356GRXX',63,NULL,'iPhone',NULL,1),(NULL,NULL,'657525545596741172','FFMWDB5KHYFK',71,NULL,'iPhone 6',NULL,1),(NULL,NULL,'657525545596741581','FFWVJ12KJC6C',79,NULL,'iPhone 8',NULL,1),(NULL,NULL,'657525545596742881','F78PFTDSG5MC',81,NULL,'iPhone 6',NULL,1),(NULL,NULL,'657525545596745010','FD7W914QJCLQ',34,NULL,'iPhone 8 Plus',NULL,1),(NULL,NULL,'657525545596746338','DX3WMH98JCM2',23,NULL,'iPhone',NULL,1),(NULL,NULL,'657525545596746496','F9CRF1M7G5QJ',86,NULL,'iPhone 6',NULL,1),(NULL,NULL,'657525545596746542','C38M2T53FF9R',87,NULL,'iPhone 5s',NULL,1),(NULL,NULL,'657525545596747394','DNPQFSV7GRXX',85,NULL,'iPhone 6s',NULL,1),(NULL,NULL,'657525545596749005','FK2VX45AJCLF',137,NULL,'iPhone X',NULL,1),(NULL,NULL,'657525545596749009','DLXSP7KFGHKJ',97,NULL,'iPad',NULL,NULL),(NULL,NULL,'657525545596749010','DMPWW285HPDV',90,NULL,'iPad',NULL,1),(NULL,NULL,'657525545596749014','FD2V92NSJCLY',94,NULL,'iPhone',NULL,1),(NULL,NULL,'657525545596749016','C6KTP0RHHG6W',97,NULL,'iPhone',NULL,1),(NULL,NULL,'657525545596749836','DMPX1HRRJF8J',106,NULL,'iPad',NULL,1),(NULL,NULL,'657525545596754085','FCJT81F1HFLY',213,NULL,'iPhone',NULL,1),(NULL,NULL,'657525545596754087','DX3WX1E8HG6W',77,NULL,'iPhone',NULL,NULL),(NULL,NULL,'657525545596754552','C02WD0LNHTDF',63,NULL,'MacBook',NULL,1),(NULL,NULL,'657525545596754628','G0NXKE48KPFT',11,NULL,'iPhone X',NULL,NULL),(NULL,NULL,'657525545596757634','FFMX5WJ3JC6C',50,NULL,'iPhone',NULL,NULL),(NULL,NULL,'657525545596759495','C8PX2HBRJWF5',139,NULL,'iPhone',NULL,NULL),(NULL,NULL,'657525545596760384','F2LWFVBGJWLL',30,NULL,'iPhone 8 Plus',NULL,NULL),(NULL,NULL,'657525545596760626','DMQWFHVUJF8M',51,NULL,'iPad',NULL,NULL),(NULL,NULL,'657525545596761351','DLXXG3URHND6',51,NULL,'iPad',NULL,NULL),(NULL,NULL,'657525545596761352','DMPWFTDSJF8M',51,NULL,'iPad',NULL,NULL),(NULL,NULL,'657525545596762665','C02X1A9ZJHCD',137,NULL,'MacBook',NULL,NULL),(NULL,NULL,'657525545596762854','DQGRG059GRWV',151,NULL,'iPhone',NULL,NULL),(NULL,NULL,'657525545596762874','FK1XJ1GLKPHG',146,NULL,'iPhone',NULL,NULL),(NULL,NULL,'657525545596770347','657525545596770347',185,NULL,'iPhone 7',NULL,NULL),(NULL,NULL,'657525545596772955','657525545596772955',191,NULL,'iPhone',NULL,NULL),(NULL,NULL,'657525545596772985','657525545596772985',192,NULL,'iPhone',NULL,NULL),(NULL,NULL,'657525545596778694','657525545596778694',216,NULL,'iPhone',NULL,NULL),(NULL,NULL,'657525545596779647','657525545596779647',200,NULL,'iPhone',NULL,NULL),(NULL,NULL,'657525545596780357','657525545596780357',222,NULL,'iPhone',NULL,NULL),(NULL,NULL,'657525545596780990','657525545596780990',90,NULL,'iPhone',NULL,NULL),(NULL,NULL,'657525545596783591','F4GX3WPZJC6C',234,NULL,'iPhone 8',NULL,NULL),(NULL,NULL,'818897172','818897172',90,NULL,'','6689',1),(NULL,NULL,'973279683378823765','973279683378823765',50,NULL,'MacBook',NULL,1),(NULL,NULL,'FA81T1A01166','FA81T1A01166',181,NULL,'Android','6656',1),(NULL,NULL,'Optional(\"3915727659837928302\")','Optional(\"3915727659837928302\")',1,NULL,'iPhone','6659',1),(NULL,NULL,'p7sif3j7j2','p7sif3j7j2',217,NULL,'iPhone 6',NULL,NULL);
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,NULL,NULL,'Pamela Cribbs','pcribbs1@gmail.com','Do you offer consultations? I want to make sure I have the best set up for my 14 year old.  I need help with filtering and monitoring of android phone, ipad and ps4. I also want to set time limits so they only work at certain times and have time limits. I\'m also open to any ideas that would help. We\'re a little overwhelmed, trying to figure out software to use and how to logistically do all of this.   Pcribbs1@gmail.com. Thank you, Pamela Cribbs'),(2,NULL,NULL,'Pamela Cribbs','pcribbs1@gmail.com','Do you offer consultations? I want to make sure I have the best set up for my 14 year old.  I need help with filtering and monitoring of android phone, ipad and ps4. I also want to set time limits so they only work at certain times and have time limits. I\'m also open to any ideas that would help. We\'re a little overwhelmed, trying to figure out software to use and how to logistically do all of this.   Pcribbs1@gmail.com. Thank you, Pamela Cribbs'),(3,NULL,NULL,'Pamela Cribbs','pcribbs1@gmail.com','Do you offer consultations? I want to make sure I have the best set up for my 14 year old.  I need help with filtering and monitoring of android phone, ipad and ps4. I also want to set time limits so they only work at certain times and have time limits. I\'m also open to any ideas that would help. We\'re a little overwhelmed, trying to figure out software to use and how to logistically do all of this.   Pcribbs1@gmail.com. Thank you, Pamela Cribbs'),(4,NULL,NULL,'Pamela Cribbs','pcribbs1@gmail.com','Do you offer consultations? I want to make sure I have the best set up for my 14 year old.  I need help with filtering and monitoring of android phone, ipad and ps4. I also want to set time limits so they only work at certain times and have time limits. I\'m also open to any ideas that would help. We\'re a little overwhelmed, trying to figure out software to use and how to logistically do all of this.   Pcribbs1@gmail.com. Thank you, Pamela Cribbs'),(5,NULL,NULL,'Pamela Cribbs','pcribbs1@gmail.com','Do you offer consultations? I want to make sure I have the best set up for my 14 year old.  I need help with filtering and monitoring of android phone, ipad and ps4. I also want to set time limits so they only work at certain times and have time limits. I\'m also open to any ideas that would help. We\'re a little overwhelmed, trying to figure out software to use and how to logistically do all of this.   Pcribbs1@gmail.com. Thank you, Pamela Cribbs'),(6,NULL,NULL,'Pamela Cribbs','pcribbs1@gmail.com','Do you offer consultations? I want to make sure I have the best set up for my 14 year old.  I need help with filtering and monitoring of android phone, ipad and ps4. I also want to set time limits so they only work at certain times and have time limits. I\'m also open to any ideas that would help. We\'re a little overwhelmed, trying to figure out software to use and how to logistically do all of this.   Pcribbs1@gmail.com. Thank you, Pamela Cribbs'),(7,NULL,NULL,'Pamela Cribbs','pcribbs1@gmail.com','Do you offer consultations? I want to make sure I have the best set up for my 14 year old.  I need help with filtering and monitoring of android phone, ipad and ps4. I also want to set time limits so they only work at certain times and have time limits. I\'m also open to any ideas that would help. We\'re a little overwhelmed, trying to figure out software to use and how to logistically do all of this.   Pcribbs1@gmail.com. Thank you, Pamela Cribbs'),(8,NULL,NULL,'Pamela Cribbs','pcribbs1@gmail.com','Do you offer consultations? I want to make sure I have the best set up for my 14 year old.  I need help with filtering and monitoring of android phone, ipad and ps4. I also want to set time limits so they only work at certain times and have time limits. I\'m also open to any ideas that would help. We\'re a little overwhelmed, trying to figure out software to use and how to logistically do all of this.   Pcribbs1@gmail.com. Thank you, Pamela Cribbs'),(9,NULL,NULL,'Pamela','pcribbs1@gmail.com','Do you offer consultations? I want to make sure I have the best set up for my 14 year old.  I need help with filtering and monitoring of android phone, ipad and ps4. I also want to set time limits so they only work at certain times and have time limits. I\'m also open to any ideas that would help. We\'re a little overwhelmed, trying to figure out software to use and how to logistically do all of this.   Pcribbs1@gmail.com. Thank you, Pamela Cribbs'),(10,NULL,NULL,'Pamela','pcribbs1@gmail.com','Do you offer consultations? I want to make sure I have the best set up for my 14 year old.  I need help with filtering and monitoring of android phone, ipad and ps4. I also want to set time limits so they only work at certain times and have time limits. I\'m also open to any ideas that would help. We\'re a little overwhelmed, trying to figure out software to use and how to logistically do all of this.   Pcribbs1@gmail.com. Thank you, Pamela Cribbs');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partner_requests`
--

DROP TABLE IF EXISTS `partner_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partner_requests` (
  `requester_id` int DEFAULT NULL,
  `requestee_id` int DEFAULT NULL,
  `requestee_email` varchar(255) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `modified_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner_requests`
--

LOCK TABLES `partner_requests` WRITE;
/*!40000 ALTER TABLE `partner_requests` DISABLE KEYS */;
INSERT INTO `partner_requests` VALUES (143,0,'wheatdc35','2018-10-24 17:24:09',NULL,'2018-10-24 17:24:09'),(159,0,'ENXO@woodlandpark.org','2018-12-18 09:13:51',NULL,'2018-12-18 09:13:51'),(163,160,'enxo@woodlandpark.org','2018-12-18 11:09:24',NULL,'2018-12-18 11:09:24'),(164,160,'enxo@woodlandpark.org','2018-12-18 11:19:41',NULL,'2018-12-18 11:19:41'),(165,160,'enxo@woodlandpark.org','2018-12-18 11:20:48',NULL,'2018-12-18 11:20:48'),(166,160,'enxo@woodlandpark.org','2018-12-18 11:22:02',NULL,'2018-12-18 11:22:02'),(167,160,'enxo@woodlandpark.org','2018-12-18 11:23:34',NULL,'2018-12-18 11:23:34'),(168,160,'enxo@woodlandpark.org','2018-12-18 11:28:57',NULL,'2018-12-18 11:28:57'),(177,0,'B.J. Church','2019-01-23 16:29:09',NULL,'2019-01-23 16:29:09'),(177,76,'hunter@calvarychatt.com','2019-01-23 16:30:03',NULL,'2019-01-23 16:30:03'),(178,76,'hunter@calvarychatt.com','2019-01-25 09:25:36',NULL,'2019-01-25 09:25:36'),(184,76,'hunter@calvarychatt.com','2019-03-01 22:06:49',NULL,'2019-03-01 22:06:49'),(20,0,'mailto:A.jordanthompson@icloud.com','2019-04-25 12:41:49',NULL,'2019-04-25 12:41:49'),(201,0,'gregschuchard@icolud.com','2019-05-12 19:21:50',NULL,'2019-05-12 19:21:50'),(162,160,'enxo@woodlandpark.org','2019-05-20 15:15:07',NULL,'2019-05-20 15:15:07'),(222,76,'hunter@calvarychatt.com','2019-08-09 09:21:59',NULL,'2019-08-09 09:21:59'),(150,0,'mailto:todd.schremp@gmail.com','2019-10-09 16:37:55',NULL,'2019-10-09 16:37:55'),(150,0,'todd.schremp@gmail.com','2019-10-09 16:38:21',NULL,'2019-10-09 16:38:21'),(150,0,'todd.schremp@gmail.com','2019-10-09 21:42:29',NULL,'2019-10-09 21:42:29');
/*!40000 ALTER TABLE `partner_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partners`
--

DROP TABLE IF EXISTS `partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partners` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `managed_user_id` int DEFAULT NULL,
  `restrictions` int DEFAULT '0',
  `reports` int DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partners`
--

LOCK TABLES `partners` WRITE;
/*!40000 ALTER TABLE `partners` DISABLE KEYS */;
INSERT INTO `partners` VALUES (5,3,1,0,1,'2018-02-10 14:24:30','2018-02-10 14:24:30'),(6,7,1,0,1,NULL,NULL),(7,7,11,0,1,'2018-02-16 09:51:57','2018-02-16 09:51:57'),(8,23,22,0,1,'2018-02-22 11:23:57','2018-02-22 11:23:57'),(9,22,23,0,1,'2018-02-22 11:33:56','2018-02-22 11:33:56'),(10,22,26,0,1,'2018-02-23 14:53:23','2018-02-23 14:53:23'),(11,26,22,0,1,NULL,NULL),(12,26,23,0,1,NULL,NULL),(13,33,32,0,1,'2018-03-07 11:35:28','2018-03-07 11:35:28'),(14,26,34,0,1,NULL,NULL),(15,35,23,0,1,NULL,NULL),(16,38,37,0,1,NULL,NULL),(17,40,32,0,1,NULL,NULL),(18,48,47,0,1,'2018-04-09 15:59:31','2018-04-09 15:59:31'),(21,56,53,0,1,NULL,NULL),(22,62,61,0,1,'2018-06-21 00:52:36','2018-06-21 00:52:36'),(23,76,71,0,1,NULL,NULL),(24,76,73,0,1,NULL,NULL),(27,76,77,0,1,NULL,NULL),(28,76,78,0,1,NULL,NULL),(29,3,79,0,1,NULL,NULL),(31,76,81,0,1,NULL,NULL),(32,76,83,0,1,NULL,NULL),(33,76,84,0,1,NULL,NULL),(34,88,87,0,1,NULL,NULL),(36,88,100,0,1,'2018-08-19 12:03:01','2018-08-19 12:03:01'),(38,103,106,0,1,NULL,NULL),(39,109,108,0,1,NULL,NULL),(40,96,137,0,1,'2018-10-15 11:41:17','2018-10-15 11:41:17'),(41,138,1,0,1,'2018-10-17 08:19:57','2018-10-17 08:19:57'),(42,138,7,0,1,'2018-10-17 08:55:02','2018-10-17 08:55:02'),(51,7,1,0,1,'2018-10-30 19:38:57','2018-10-30 19:38:57'),(55,88,50,0,1,NULL,NULL),(56,34,56,0,1,'2018-12-04 11:02:26','2018-12-04 11:02:26'),(59,160,152,0,1,'2018-12-18 09:16:25','2018-12-18 09:16:25'),(60,160,161,0,1,'2018-12-18 11:02:15','2018-12-18 11:02:15'),(61,160,162,0,1,'2018-12-18 11:11:09','2018-12-18 11:11:09'),(62,160,169,0,1,'2018-12-18 14:04:28','2018-12-18 14:04:28'),(66,76,85,0,1,NULL,NULL),(69,173,20,0,1,'2019-01-08 07:44:44','2019-01-08 07:44:44'),(70,175,174,0,1,'2019-01-08 16:49:53','2019-01-08 16:49:53'),(72,76,176,0,1,'2019-01-22 21:27:44','2019-01-22 21:27:44'),(75,76,176,0,1,NULL,NULL),(77,179,23,0,1,'2019-02-02 11:14:24','2019-02-02 11:14:24'),(78,34,23,0,1,'2019-02-15 10:39:09','2019-02-15 10:39:09'),(79,182,53,0,1,'2019-02-20 12:16:36','2019-02-20 12:16:36'),(80,76,185,0,1,NULL,NULL),(81,76,186,0,1,NULL,NULL),(82,76,178,0,1,NULL,NULL),(83,188,187,0,1,'2019-03-30 20:40:10','2019-03-30 20:40:10'),(84,76,189,0,1,'2019-04-07 14:10:15','2019-04-07 14:10:15'),(85,195,20,0,1,'2019-04-25 14:42:05','2019-04-25 14:42:05'),(86,196,20,0,1,'2019-04-26 05:42:28','2019-04-26 05:42:28'),(87,202,201,0,1,'2019-05-12 19:31:15','2019-05-12 19:31:15'),(88,200,82,0,1,NULL,NULL),(89,76,201,0,1,NULL,NULL),(92,76,204,0,1,'2019-05-17 10:55:16','2019-05-17 10:55:16'),(93,76,191,0,1,NULL,NULL),(94,76,192,0,1,NULL,NULL),(95,201,201,0,1,'2019-06-01 23:39:57','2019-06-01 23:39:57'),(96,201,201,0,1,'2019-06-01 23:41:45','2019-06-01 23:41:45'),(97,201,201,0,1,'2019-06-01 23:42:20','2019-06-01 23:42:20'),(98,201,201,0,1,'2019-06-01 23:43:23','2019-06-01 23:43:23'),(99,201,201,0,1,'2019-06-01 23:46:34','2019-06-01 23:46:34'),(100,76,213,0,1,NULL,NULL),(101,76,30,0,1,NULL,NULL),(102,76,216,0,1,NULL,NULL),(103,200,82,0,1,NULL,NULL),(104,82,200,0,1,NULL,NULL),(105,76,222,0,1,NULL,NULL),(106,76,227,0,1,NULL,NULL),(107,76,224,0,1,NULL,NULL),(108,26,228,0,1,'2019-09-18 21:34:06','2019-09-18 21:34:06'),(109,88,150,0,1,'2019-10-09 16:42:23','2019-10-09 16:42:23'),(110,88,150,0,1,'2019-10-10 15:15:42','2019-10-10 15:15:42'),(111,88,150,0,1,'2019-10-10 15:17:12','2019-10-10 15:17:12'),(112,235,234,0,1,'2019-10-23 16:08:49','2019-10-23 16:08:49'),(113,26,228,0,1,'2019-10-25 09:16:16','2019-10-25 09:16:16'),(114,234,235,0,1,'2019-11-01 05:48:56','2019-11-01 05:48:56'),(115,236,236,0,1,'2020-01-12 16:26:40','2020-01-12 16:26:40');
/*!40000 ALTER TABLE `partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `requester_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
INSERT INTO `password_resets` VALUES ('kvjewels4u@live.com','ISotLdHojgL9s1AEjMjcrWqG','2018-10-10 15:01:45',108,NULL),('chrisantosj15@gmail.com','eAJ4dh2PfOxo2FdHhKwDc0Ct','2018-10-26 21:34:44',NULL,NULL),('mkcnrd@gmail.com','rrngcY2QKzFKHeNQmSaaZwb1','2018-10-31 16:44:21',NULL,NULL);
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_users`
--

DROP TABLE IF EXISTS `report_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `device_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_users`
--

LOCK TABLES `report_users` WRITE;
/*!40000 ALTER TABLE `report_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `report_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(72) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `stripe_id` varchar(120) DEFAULT NULL,
  `created` int DEFAULT NULL,
  `user_type` varchar(20) DEFAULT NULL,
  `plan` varchar(20) DEFAULT NULL,
  `receives_email` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=239 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'mike@enxo.co','$2a$10$Hbga6Jd05MbMGvW28qjSJeT63OwL/PsvsepSGN2ieVbh/FiiST9sG','Mike Conrad','Murph','http://res.cloudinary.com/themurphs/image/upload/v1531002186/oeyu6hlr8aylimbwn4gd.png','M','','','2018-02-10 11:47:43','2019-03-29 14:45:41',NULL,1,'subscriber','monthly',1),(3,'josh@oopsrepair.com','$2a$10$sHq46IIZd2Kqy5XMmxrEX.9HMO3WHfuAp0XLX5PGWk1ghZX34C6sG','Josh Hrinik','Oops Repair',NULL,'M','Chattanooga, TN','https://oopsrepair.com','2018-02-10 14:24:30','2018-03-31 13:42:07','cus_CazkQgwXtqaIaO',1,'subscriber','yearly',1),(4,'jennamillsaps@gmail.com','$2a$10$PPVQQm7plZIM87n24cNlLuGyJDP9JVr2aUlZokZur8RkSZ8KR9UBm','Jenna Conrad',NULL,NULL,NULL,NULL,NULL,'2018-02-12 18:03:18','2018-02-12 18:03:18',NULL,1,'viewer',NULL,1),(7,'mkcnrd@gmail.com','$2a$10$vsK2S2chzVpKhQkK2ezGq.Y4hATGUTZNzBa/XmQyqq9umiP3qUf8q','Mike Jones',NULL,NULL,NULL,NULL,NULL,'2018-02-15 11:49:58','2018-02-15 11:49:58','cus_CJqrrDvn6E1zEf',1,'subscriber','monthly',1),(11,'santosm516@gmail.com','$2a$10$i/6x.ZnJgWovejfzdVvKm.9Y92tHwd8tBwtfmqQxrFcosIIjIrIlS','Jordan Santos',NULL,NULL,NULL,NULL,NULL,'2018-02-16 09:50:21','2018-02-16 09:50:21','cus_CKsdWUx30hyOXg',1,'subscriber','yearly',1),(20,'hbogema@gmail.com','$2a$10$Lj.reHfE5q1rzHghOwezc.tTp4f7Z1eHV.UYrC1VqWb3n00Ztbtom','Harrison','',NULL,NULL,NULL,NULL,'2018-02-21 17:25:12','2019-01-02 15:40:04','cus_CMpgqZf301Rg4i',1,'subscriber','monthly',1),(22,'jeff@thechapelcleveland.com','$2a$10$HFvY394eJZXG96C80jvLp.GyxZMB0rDiw.Ife.w3k5Ua7gpFwf82a','Jeff Richardson',NULL,NULL,NULL,NULL,NULL,'2018-02-22 11:22:50','2018-02-22 11:22:50','cus_CN74dg3iMUTQo4',1,'subscriber','yearly',1),(23,'sam@thechapelcleveland.com','$2a$10$4ytTys6jquIx/9XIYSFP1eY5xf70UbqI8FyRmoAk752jaVC3dKYWK','Sam Cruz',NULL,NULL,NULL,NULL,NULL,'2018-02-22 11:23:57','2018-08-03 10:02:25',NULL,1,'subscriber','yearly',1),(26,'ritchie@thechapelcleveland.com','$2a$10$8b1f3NlB7FnBQsdqXXBlFOw1D84GPvEokO7BXJSz9GLvi0xw4t.7W','Ritchie Johnson','',NULL,'M','','','2018-02-23 14:15:09','2018-02-23 14:17:38','cus_CNX4FSmfSxzeKS',1,'subscriber','yearly',1),(28,'Brandonland@epbfi.com','$2a$10$vbN9T5TZhbMjyXwTuJeZreUPacDGiqK.y.pOzcXpjmMZadIb/zK32','Brandon Land','Brandon Land',NULL,'M','Chattanooga, TN','','2018-03-03 12:35:46','2018-03-03 12:41:33','cus_CQVHGtCfkBgKo9',1,'subscriber','yearly',1),(30,'danielnorton0295@yahoo.com','$2a$10$yYlAK1jKQ03CMbniWfeBqetxQo8mrzHbst8sm1/yvHvDpF7lWKs.e','Daniel Norton','Dtnorton',NULL,'M','Chattanooga, Tennessee ','','2018-03-06 11:26:07','2018-03-06 11:39:29','cus_CRbpQirDkOrojI',1,'subscriber','monthly',1),(32,'jess.freistat@gmail.com','$2a$10$lnhPSeg4YIpWl4Vd0v5TLOonR4Px9sBmT8xe3BPocRaD8zeE97Udm','Jessica freistat',NULL,NULL,NULL,NULL,NULL,'2018-03-07 11:19:02','2018-03-07 11:19:02','cus_CRywpahQCCNdUy',1,'subscriber','monthly',1),(33,'almsullivan@aol.com','$2a$10$ZZ5wI1r.ddC77/MpamxKBOe5rXXxjj2WbY62uPmo5Ml8Z5CZ8CBh2','lexi sullivan',NULL,NULL,NULL,NULL,NULL,'2018-03-07 11:35:28','2018-03-07 11:35:28','cus_CRzPxejb0USnCr',1,'viewer',NULL,1),(34,'andrew@thechapelcleveland.com','$2a$10$IXUqy34nfVBvSWT.mE7ukuM5G7/I0KM8GN.gYU5K2Gsy0U/9vdyyu','Andrew Barber',NULL,NULL,NULL,NULL,NULL,'2018-03-08 10:10:54','2018-03-08 10:10:54','cus_CSL46TmGLB530H',1,'subscriber','yearly',1),(35,'tim@calvarychatt.com','$2a$10$iiBvJKBeNL6gywT5Hq2EOODKHc5epkUUzpz8pHlP92dC/IqUBMpoO','Tim Millsaps',NULL,NULL,NULL,NULL,NULL,'2018-03-09 12:15:47','2018-09-13 12:40:50','cus_CSkJan7fwt0bFp',1,'viewer',NULL,1),(37,'jdbelloberg@gmail.com','$2a$10$0Ht1Ach5IfFf81oklFWtduQZUvhN3PYxUpDocvjMrZqBkKZx26Uwq','Justin Bell',NULL,NULL,NULL,NULL,NULL,'2018-03-16 17:03:36','2018-03-16 17:03:36','cus_CVQZRXIgGpUw03',1,'subscriber','monthly',1),(38,'GrantStafford511@gmail.com','$2a$10$hAAEJ50.HlnaqzZquQa9G.eklpP8TqTDFoub3oI/CJcXvg6nooQfK','Grant Alan Stafford',NULL,NULL,NULL,NULL,NULL,'2018-03-19 22:25:14','2018-03-19 22:25:14','cus_CWdQs1ToFekfrW',1,'viewer',NULL,1),(40,'peggy@calvarychatt.com','$2a$10$jLZinSpBlDNV09NuvuSoFeB2EVUqaBGSZcyA7KCfKO0qruobsUjO.','Peggy Bruning',NULL,NULL,NULL,NULL,NULL,'2018-03-24 15:51:39','2018-03-24 15:51:39','cus_CYPDNlzrM92xoe',1,'viewer',NULL,1),(42,'jmadewell@epbfi.com','$2a$10$V0iEZ78qRzCqqRe.oxrsqu0dKl9V4gC0IxHrO4Ic/fwVcg7CTbQWi','John Madewell','',NULL,'M','Chattanooga','','2018-03-28 23:11:32','2018-03-28 23:21:42','cus_Ca1DaN1sTxIq9o',1,'subscriber','yearly',1),(44,'zreynolds@calvarychatt.com','$2a$10$GbeXHVbnyvU90uxy85eT2.QK.6ENVXozN5KhR6a3toRZlPCkrMPPe','Zachary Reynolds',NULL,NULL,NULL,NULL,NULL,'2018-04-03 16:37:43','2018-04-03 16:37:43','cus_CcADgLZianNaXY',1,'subscriber','monthly',1),(46,'natalie_hawn@collierbuild.com','$2a$10$f2/6l72sesTAeI4qe2OqUe/Z5ejRkKKSNCvYELRe89Xa3vuHzsQkK','Natalie Hawn',NULL,NULL,NULL,NULL,NULL,'2018-04-03 21:10:51','2018-04-03 21:10:51','cus_CcEc6wvjzCbGKQ',1,'subscriber','monthly',1),(47,'cameroncoker@gmail.com','$2a$10$r6x/Bts42gNhKEdv5pnH2O5sq4oSC88WBThtCUjshLvvzlMZO6ETe','Cameron Coker',NULL,NULL,NULL,NULL,NULL,'2018-04-09 15:14:26','2018-04-09 15:14:26','cus_CeOEP57cpxCkYV',1,'subscriber','yearly',1),(48,'hillarytcoker@gmail.com','$2a$10$SPuHYT3DKkWS6IlUV33eSOfn8jMyNa1oCsaHhlwfmsRj/iUFWojIe','Hillary Coker',NULL,NULL,NULL,NULL,NULL,'2018-04-09 15:59:31','2019-01-14 14:25:32',NULL,1,'viewer',NULL,1),(50,'cschmidt.cornerstone@gmail.com','$2a$10$DYjLMoFaXl9VbWoNdQg.6ucnw8D4e7T28zavQiho5bW2n4avOdf3O','Chris Schmidt',NULL,NULL,NULL,NULL,NULL,'2018-04-19 07:15:00','2018-04-19 07:15:00','cus_Ci0ktwlsO3L4N4',1,'subscriber','monthly',1),(51,'joshua.elrod@gmail.com','$2a$10$rnD8gE0k0POKS5Ei.7JOKutq0JikOgEhLxbtT4gVOw88CNdw2/71y','Josh Elrod','',NULL,NULL,NULL,NULL,NULL,'2019-01-07 10:29:10','cus_CjkMBuzbBGoPqV',1,'subscriber','monthly',1),(52,'mr.todddsmith@gmail.com','$2a$10$8ufbSSWtn2cNAuo/o9GQeuYK65DiLiwOWBWIN/3BWzQ60CX7SfSlW','Todd Smith',NULL,NULL,NULL,NULL,NULL,'2018-05-14 09:48:30','2018-05-14 09:48:30','cus_CrPs3BLdBniHoj',1,'subscriber','monthly',1),(53,'jordanthompson1020@gmail.com','$2a$10$Hj4HtxkTwK/39ZUA55J6reHr5idBkWeznvXsN/B9m16d7vny1tal2','Jordan Thompson','Jordan.Thompson',NULL,'male',NULL,NULL,NULL,'2018-07-18 13:54:55','cus_CpyWgi9kjWaF2x',1,'subscriber','monthly',1),(54,'CmurrahCC@icloud.com','$2a$10$M9lyLaU9f7D8ySZMofyMfOPm0066wBPTVVUGtpku573BtHCq8pfnu','Carlos Murrah',NULL,NULL,NULL,NULL,NULL,NULL,'2018-07-13 19:09:13','cus_ClEogePAQYcpTK',1,'subscriber','monthly',1),(55,'savedtoserve1074@gmail.com',NULL,'Angela Schmidt',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'viewer',NULL,1),(56,'joeandkriscox@gmail.com','$2a$10$gWcW6EW6D59MFrhDH8pG5.IWXyM90i7kVXFZuY2m./t5OfwVayMw2','Joe Cox','joeandkriscox',NULL,NULL,NULL,NULL,'2018-05-18 09:12:55','2019-03-24 23:49:39','cus_CsuC62zSZ9v8Vm',1,'subscriber',NULL,1),(58,'gambit.akins@gmail.com','$2a$10$y3EPxpAMcso7fmoONK5UfuNM92SLzp0crm6F0LbHX09nY.qUqzC0C','Jack Akins',NULL,NULL,NULL,NULL,NULL,'2018-06-10 03:52:34','2018-06-10 03:52:34','cus_D1NM2cluUry7oT',1,'subscriber','monthly',1),(63,'zacharytatesmith@gmail.com','$2a$10$1E0yHy9PJWY1.Nvry92e2eqpUpnei5zfjKjD8NKyJPtdcwZlp.W3e','Zach Smith','',NULL,'M',NULL,NULL,'2018-06-24 01:53:00','2018-06-24 15:41:10','cus_D6aav5XsfdBx4o',1,'subscriber','monthly',1),(71,'gregschuchard08@gmail.com','$2a$10$DWVqWZ2TxaYeqEKcKyw0XOEQIov7eg5/XuLrt4fY/tjEVS3oCmKnu','Greg Schuchard ',NULL,NULL,NULL,NULL,NULL,'2018-06-29 17:34:05','2018-06-29 17:34:05','cus_D8htuPNRB2gzIm',1,'subscriber',NULL,1),(72,'carltonwoodlin@gmail.com',NULL,'Carlton Woodlin',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'subscriber','monthly',1),(73,'pat.ken714@gmail.com',NULL,'Pat',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'subscriber','monthly',1),(76,'hunter@calvarychatt.com','$2a$10$M2x2Lzm0AzxMhIIGfBa9IOs2lAvgZpZBWIQjA30SSHfJUQQJY.Iv.','Hunter Thomas',NULL,NULL,'male',NULL,NULL,'2018-07-12 18:08:48','2018-07-22 17:15:30','cus_DDaOQ5M6pGjM2r',1,'subscriber','monthly',0),(77,'',NULL,'Nate Holland',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'subscriber','monthly',1),(78,'',NULL,'Erik Kinter',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'subscriber','monthly',1),(79,'bostonhrinik@gmail.com',NULL,'Boston Hrinik',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'subscriber','monthly',1),(80,'caleb.zidan@covenant.edu','$2a$10$yaCsnMbuLFJoormYHb95pefXHIp.rhyoyPQRGKvppF45G/jNCk2Qq','Caleb Zidan','',NULL,'male',NULL,NULL,'2018-07-13 18:24:51','2018-10-10 11:18:42','cus_DDxsqSLt0U8sxZ',1,'subscriber','monthly',1),(82,'seanjamesblack@yahoo.com','$2a$10$VueAFan2/ZAI3X7TZHKrg.qMr3CRciujWgDkA25Pzhu.3lQf/SQEi','Sean Blackburn ',NULL,NULL,'male',NULL,NULL,'2018-07-21 15:16:07','2018-07-21 15:16:07','cus_DGyVtmJYdsuLqZ',1,'subscriber','monthly',1),(83,'Trev.Reed@icloud.com','$2a$10$T1ClZOYB4lLFYIZwppb5nex12zhRgdcpIBTYGEfkK/DBe.OVFwm5C','Trevor Reed',NULL,NULL,'male',NULL,NULL,'2018-07-28 18:56:25','2018-11-28 12:13:57','cus_DJee0jLCp4uhpM',1,'subscriber','monthly',1),(84,'mattcanady82@gmail.com','$2a$10$2djHkPZPfYlopy/lRk/eXuJKJVq5cmnOLnL/OItIendDlqIRG/SIq','Matthew ',NULL,NULL,'male',NULL,NULL,'2018-07-28 19:01:37','2018-07-28 19:01:37','cus_DJejLxqOnUJ34p',1,'subscriber','monthly',1),(85,'chrisantosj15@gmail.com','$2a$10$OqL2P4JQn4MyGGLkOYceDOzlev1cXd6EL9NXNJinLIY6gkm6MEyH6','Chris Santos',NULL,NULL,'male',NULL,NULL,'2018-08-02 15:23:50','2018-08-10 11:25:47','cus_DLTLVI8X3wJ4Kq',1,'subscriber','monthly',NULL),(86,'Hectorramirez77@icloud.com','$2a$10$hLJdMIdYONVJcuX1U7wUD.fno0PIxAawRm6Uye582kN793Bw5hegS','Héctor Ramirez',NULL,NULL,NULL,NULL,NULL,'2018-08-04 15:33:24','2018-08-04 15:33:24','cus_DMDxDqlewC71g9',1,'subscriber','monthly',NULL),(87,'stephen_bulkley@hotmail.com','$2a$10$GzGmsuPOglm7rndprI.kX.y7rLw49l54xRi/e5mwCbubQQDw62C9C','Steve Bulkley ',NULL,NULL,'male',NULL,NULL,'2018-08-05 10:33:04','2018-08-05 10:33:04','cus_DMWK7c2rM46E0E',1,'subscriber','monthly',NULL),(88,'jay@calvarychatt.com','$2a$10$Qt2vxvqOW8ngTE38DQkdU.fWsc92K45hHTUoUAc0mNH94ygM01KTa','Jay Everett',NULL,NULL,NULL,NULL,NULL,NULL,'2019-10-10 15:16:50',NULL,NULL,'viewer',NULL,NULL),(89,'cfoshee80@gmail.com','$2a$10$irrFRIHkY5ed.iJznUlzFua0vPplfj5EW5wmOvHH0A14olt5S0hDa','CHARLES E FOSHEE III',NULL,NULL,NULL,NULL,NULL,'2018-08-12 17:23:13','2018-08-12 17:23:13','',1,'viewer',NULL,NULL),(90,'pt@lovechurch.org','$2a$10$LcNttrldImslw9fvzV4yCOX/OD3xhuZOLIsQtcKz.NcWLbwuOH1T6','Todd Doxzon',NULL,NULL,'male',NULL,NULL,'2018-08-16 12:39:48','2018-08-16 12:39:48','cus_DQfrpa6HHeCT00',1,'subscriber','monthly',NULL),(91,'oc@lovechurch.org','$2a$10$YlpLr0a4EI2JcEDaJnZtEOjAlE5sfxYMuJ4pKIDjlSjcoz/LwJig2','Mike O\'Connell',NULL,NULL,'male',NULL,NULL,'2018-08-16 12:39:55','2018-08-16 12:39:55','cus_DQfreYcFTym39h',1,'subscriber','monthly',NULL),(92,'mandy@lovechurch.org','$2a$10$ht6eQaHYa5QAlgVQr/loveCE3s1eWPmxPRVE2OJvi0rXoSKpNnwt6','Mandy Petro',NULL,NULL,'female',NULL,NULL,'2018-08-16 12:39:56','2018-08-16 12:39:56','cus_DQfrZVqZiNoWD9',1,'subscriber','monthly',NULL),(93,'Laura@lovechurch.org','$2a$10$Ec8yBP.sr/NoP5ypOOIPmedXgdsncfw97AyCAk3ORT0BAN3oVwmzO','Laura Pickett',NULL,NULL,'female',NULL,NULL,'2018-08-16 12:40:00','2018-08-16 12:40:00','cus_DQfr8PJXQdqr9l',1,'subscriber','monthly',NULL),(94,'Sam@lovechurch.org','$2a$10$6NeC/mNANdBC8hXY66J2suBnKzK9pgG4sahEEf5E53ZD8dq0tk0iG','Sam Frei',NULL,NULL,'male',NULL,NULL,'2018-08-16 12:40:03','2018-08-16 12:40:03','cus_DQfrEnFdgNIQGb',1,'subscriber','monthly',NULL),(95,'Kelli@lovechurch.org','$2a$10$sXLJ9lsznmXOOOpUbvPMq.EqSaT7h.BdG01JluJz6DCjuUoggRHwe','Kelli Knox',NULL,NULL,'female',NULL,NULL,'2018-08-16 12:40:14','2018-08-16 12:40:14','cus_DQfrVmLIXJvCfj',1,'subscriber','monthly',NULL),(96,'kappes@lovechurch.org','$2a$10$EhKwQstgXYsMYH0RX6lP9OGZLxqw.OdynOpfatltFanbVpTkJoI6u','Kappes Chatfield',NULL,NULL,'male',NULL,NULL,'2018-08-16 12:40:38','2018-08-16 12:40:38','cus_DQfsSVJ6wAHjaT',1,'subscriber','monthly',NULL),(97,'jim@lovechurch.org','$2a$10$lqONkj.DkxwSrZnHAxXj..m4mbXW4mv/mNJxrGbhslaKTZ2z4YI5G','Jim Slosson',NULL,NULL,NULL,NULL,NULL,'2018-08-16 12:41:33','2018-08-16 12:41:33','cus_DQftmNvq5uHsbs',1,'subscriber','monthly',NULL),(98,'denise@lovechurch.org','$2a$10$NXOFbe6Ug8zESv4k.Z784OSZFwa2JVOBEX5mWjuNmpWUoAENarAhS','Denise Doxzon',NULL,NULL,'female',NULL,NULL,'2018-08-16 12:42:10','2018-08-16 12:42:10','cus_DQftN3bU90KDtQ',1,'subscriber','monthly',NULL),(100,'bfiddler14@gmail.com','$2a$10$lLkj.izIb0hvXWurjVtfFehaRI9Xmhhnl52IQ/HcNrO0x71Hrl8ZK','Brent Fiddler',NULL,NULL,'male',NULL,NULL,'2018-08-19 11:55:47','2018-08-19 11:55:47','cus_DRmpXHWZeAmFNt',1,'subscriber','monthly',NULL),(101,'austin@lovechurch.org','$2a$10$4w7/saSFECJWfN5CXf7p.OzAQ2I7zHzxgtYQP8.vNArOlRlzQhQWG','Austin Brayton',NULL,NULL,'male',NULL,NULL,'2018-08-22 11:10:05','2018-08-22 11:10:05','cus_DStlwOlQKm3kCa',1,'subscriber','monthly',NULL),(102,'heltonwes@gmail.com','$2a$10$Da1W70ibBBwcswbdz8joz.glo/pMrXmXiwtygAMUuv6xDbfByWMWe','Wes Helton',NULL,NULL,'male',NULL,NULL,'2018-08-22 13:31:33','2018-08-22 13:31:33','cus_DSw3Doqh7yZdlB',1,'subscriber','monthly',NULL),(103,'hannah@calvarychatt.com','$2a$10$X/rrsb2Q.nuxR0Paw1bpc.dolYKQjiDU1XH4gFhSomThLoOiOduLG','Hannah Aker',NULL,NULL,'female',NULL,NULL,'2018-08-23 14:49:18','2018-09-04 10:07:05','cus_DTKWv7RNBSE3VT',1,'subscriber','monthly',NULL),(104,'marioncampbell@epbfi.com','$2a$10$N6PJgU/klgzrjZb.uMya1eI/HfKy34787YBPvDwEmESZDI77PPieu','Marion G. Campbell',NULL,NULL,'female',NULL,NULL,'2018-08-27 17:23:37','2018-08-27 17:23:37','cus_DUrvu3TcmK99SS',1,'viewer',NULL,NULL),(105,'davidjordanmoore@gmail.com','$2a$10$VfQeGDa.XJYSa3wh.Vn2e.HSNvBgCp6vwG6Ioenn6XQ9faJNLzkrO','David moore',NULL,NULL,'male',NULL,NULL,'2018-08-30 18:23:32','2018-08-30 18:23:32','cus_DW0ZA10XgvPnVH',1,'subscriber','monthly',NULL),(106,'tillyaker',NULL,'Tilly Aker',NULL,NULL,'F',NULL,NULL,NULL,NULL,NULL,NULL,'subscriber',NULL,NULL),(107,'perfectimagepools@gmail.com','$2a$10$3olVzophmWYe6iKA372gsO0e54hOiFY6GpPlU8ZmtZGwxK0Ue8wYa','Sean Gough',NULL,NULL,NULL,NULL,NULL,'2018-09-09 17:55:21','2019-07-17 09:02:05','cus_DZkN1YbPvZxzs1',1,'subscriber','monthly',NULL),(108,'vandykenm@aol.com','$2a$10$m/clglYfOUFgxCqPMflWBe1tqQI/N3jRKKrowqtuiN8ZnvYFd3hDC','Michael VanDyken',NULL,NULL,'male',NULL,NULL,'2018-09-21 11:13:23','2018-09-21 11:13:23','cus_De8b09E6xO6bvw',1,'subscriber','yearly',NULL),(109,'larrymartin.com@gmail.com','$2a$10$nlUQ5gIdfGhQotCOZO5xuuGFXtdEt4JkIJ0B02fwX/IwMMl7L//tW','Larry martin',NULL,NULL,NULL,NULL,NULL,'2018-09-22 10:40:47','2018-09-22 10:40:47','',1,'viewer',NULL,NULL),(110,'bryanfaucette@icloud.com','$2a$10$Sm6QclHoRE85qKR7MYX9z.AyAbLIyqb4tChkLvfnwLMt.6gvGmfoK','Bryan faucette',NULL,NULL,'male',NULL,NULL,'2018-09-24 17:04:08','2018-09-24 17:04:08','cus_DfLvNx7FL0RTJt',1,'subscriber','monthly',NULL),(111,'joancate3@gmail.com','$2a$10$/yoNe9CRJVWb9YyUDWXSC.psNG2SOJ5lqhMtRKA7Iu7YU9pjT.moC','Joan ',NULL,NULL,'female',NULL,NULL,'2018-09-25 15:12:00','2018-09-25 15:12:00','cus_DfhLiHTpmuYmg2',1,'viewer',NULL,NULL),(136,'demo@enxo.co','$2a$10$qSXjM.3kRbFtjLmIQaJ89udyeZDBusyIQnGRScstBIMTUFXYFE15i','Apple User',NULL,NULL,'male',NULL,NULL,'2018-10-11 16:17:46','2019-01-30 14:24:13','cus_DfjZjdUouzWrNv',1,'subscriber','monthly',NULL),(139,'brethenp@gmail.com','$2a$10$9VVvEqDgy6Tmc.ryql0vMetECcsB6loHGE4RMEvHJCWWJjdN/e8Yi','Patrick Brethen ',NULL,NULL,'male',NULL,NULL,'2018-10-17 18:56:53','2018-10-17 18:56:53','cus_DnzwR0SYqmyDSj',1,'subscriber','monthly',NULL),(140,'manuelisaiahalvarado@gmail.com','$2a$10$XHVs.tT5Ah8P7WmToRJkjeSETRxQd8CtQn9LB1usXlmOVGZ4ht1Zi','Manuel Alvarado',NULL,NULL,'male',NULL,NULL,'2018-10-17 18:57:28','2018-10-17 18:57:28','cus_DnzxUfkndTnfTi',1,'subscriber','monthly',NULL),(141,'originaldro@gmail.com','$2a$10$sG.XJg3Vm/gijGTNoqgTdeVFC.a158r0l9REOvPZ2.fPgfd6TCkC.','Alejandro Caraballo',NULL,NULL,'male',NULL,NULL,'2018-10-17 18:59:03','2018-10-17 18:59:03','cus_DnzyY7ZpqNb5vy',1,'viewer',NULL,NULL),(142,'bryan.oliverdesigns@gmail.com','$2a$10$9qM9sQ4GVz6odIMYBaCRIu8qH4A3.P2yyQ5BP.AIpk6jtsRVVvCa6','Bryan Owens',NULL,NULL,'male',NULL,NULL,'2018-10-17 19:01:43','2018-10-17 19:01:43','cus_Do01McPYnlcZPf',1,'subscriber','monthly',NULL),(143,'bwheat15@gmail.com','$2a$10$6clpSs3PtafNRSwuy.LuY.XOMDQlSoa22u38ubEnNY8SYhep7qwZy','Brad wheatcroft',NULL,NULL,'male',NULL,NULL,'2018-10-24 17:01:30','2018-10-24 17:01:30','cus_DqafEMKCzcHaju',1,'subscriber','monthly',NULL),(144,'sringer83@gmail.com','$2a$10$yLB0QwwaSjBDRAMEexpcz.JwJbNatUZgTVt92acVWNYW0eqOBpvPe','Shana Roberts',NULL,NULL,'male',NULL,NULL,'2018-10-28 17:38:30','2018-10-28 17:38:30','cus_Ds6AGZsB5dexFH',1,'viewer',NULL,NULL),(145,'warren.t.roberts4423@gmail.com','$2a$10$riLglUKcg.eM3bhhuVTxO.2JFqrHzXIe/uJZy3BImrVd1izgSdXaC','Thomas Roberts','Thomas',NULL,'male',NULL,NULL,'2018-10-28 18:00:59','2018-10-28 18:14:31','cus_Ds6W9pfSysJHwK',1,'subscriber','monthly',NULL),(146,'andybond@livechattanooga.com','$2a$10$d6xwkoJa0gR2fcDhAjiu6eGsTEQbaETqr0WQ1gtjZZ/iGFo5eWVju','Andy Bond',NULL,NULL,'male',NULL,NULL,NULL,'2018-11-28 17:00:05','cus_C8Y26sYboMLhYD',NULL,'subscriber',NULL,NULL),(147,'crunchymac8@icloud.com','$2a$10$XzMRIro5GOmc0ANbyKqpquae/YES9SKBJOaMzxLke9JlRjV1iwq.C','Adam mc','CrunchyMac',NULL,'male',NULL,NULL,'2018-11-15 08:40:17','2019-01-18 11:57:57','cus_DyiVoYjarFTVFY',1,'subscriber','monthly',NULL),(148,'bonneydavid92@gmail.com','$2a$10$hw2LiDFHHsbJY7sY4cdLmOHWzdXQIVI9D5PxE1uCSBx7JBKilaZ4K','David bonney',NULL,NULL,'male',NULL,NULL,'2018-11-15 11:05:31','2018-11-15 11:05:31','cus_Dykr2foglCs2J7',1,'subscriber','monthly',NULL),(149,'chadlewis580@gmail.com','$2a$10$cxZvX4bDAWlh470HKO/uLONuIvUP8mWd/9Rp6TqsnV7ypSx0G/gZG','Chad Lewis',NULL,NULL,'male',NULL,NULL,'2018-11-15 12:22:00','2019-04-03 08:16:30','cus_Dym5Hr7JMrpHAQ',1,'subscriber','monthly',NULL),(151,'greerwater@gmail.com','$2a$10$oQvVkUmFxxaICSRbSIyrge8qvGzkSOtnDpHhsc38pBngst2/rpIPS','Greg Greer',NULL,NULL,'male',NULL,NULL,'2018-11-26 18:32:03','2018-11-26 18:32:03','cus_E2zXB4j1SrIgpS',1,'subscriber',NULL,NULL),(152,'jstrickland@woodlandpark.org','$2a$10$T/itAbA7/S1UzwPBU7B2UOcB5M5VirUBXTXzbeVU2JuzpAH61uRPK','Jackson Strickland',NULL,NULL,'male',NULL,NULL,'2018-11-27 09:00:45','2018-11-27 09:00:45','cus_E3DYk39Nia7a8f',1,'subscriber','monthly',NULL),(154,'mk.cnrd@gmail.co','$2a$10$xMGpqZ7iNea/AUqQ3EAJkufzhtuN9OrtuGZc2rZ81Cb/OOv4OcsIO','Mike Jones',NULL,NULL,NULL,NULL,NULL,'2018-11-30 16:47:10','2018-11-30 16:47:10','cus_E4SkadUDcj7cJI',1,'subscriber','monthly',NULL),(155,'katethegreat5180@gmail.com','$2a$10$EimiVJJc9Oxadng8drn6t.Hl0TdUizEC5GXJfNb2AGVJbJBsnRcKO','Katie Lamb','Katethegreat',NULL,'female',NULL,NULL,'2018-12-07 08:59:18','2019-03-16 07:51:11','cus_E6xmClyXkXr7hT',1,'subscriber','monthly',NULL),(156,'erikkinter@icloud.com','$2a$10$e7mW14biu2izcwGBQwlbp.yQeeQqGec.SRLDNMbwpNgm2skRORfrq','erik kinter',NULL,NULL,'male',NULL,NULL,'2018-12-08 15:47:33','2018-12-08 15:47:33','cus_E7RbXVrjoQ06M0',1,'subscriber','monthly',NULL),(157,'bennett.lamb@gmail.com','$2a$10$MSq8e8oGHuRt.ey493LlIeZ89T1tPHIs.AR5fBWgVBEkiTyvtWNVq','Bennett Lamb',NULL,NULL,NULL,NULL,NULL,'2018-12-08 19:49:04','2018-12-08 19:49:04','',1,'viewer',NULL,NULL),(159,'jwilson@woodlandpark.org','$2a$10$V1ZKquTSlB8P7Dv.RKrYsu6uMykhvCMrgkebZzFrcv0jcWHEr0.Aa','Justin Wilson',NULL,NULL,'male',NULL,NULL,'2018-12-18 09:13:04','2018-12-18 09:13:04','cus_EB5UW5MNHvXK5t',1,'subscriber','monthly',NULL),(160,'enxo@woodlandpark.org','$2a$10$UoDgXwOh5/Yj5ehYsBnnuemXBBPSVpuaz2fsLKv5hbOX8tUSxcDJS','WPChatt','WPChatt ENXO',NULL,NULL,NULL,NULL,'2018-12-18 09:16:25','2018-12-18 11:18:12','',1,'viewer',NULL,NULL),(161,'brian@woodlandpark.org','$2a$10$RdK73ekMWx858Q7NsEMgeeszZaHgfuW2ciEOcs1b4tA4rK8FtTula','Brian Kinlaw',NULL,NULL,'male',NULL,NULL,'2018-12-18 10:38:14','2018-12-18 10:38:14','cus_EB6rTwmDcltIsR',1,'subscriber','monthly',NULL),(162,'erasnake@woodlandpark.org','$2a$10$AdKgyDaqi34YwHIYI.t0meK6iaRKF54Uiz/EFqFxdwxLUTW5G1FKG','Eddie Rasnake',NULL,NULL,'male',NULL,NULL,'2018-12-18 11:00:43','2018-12-18 11:00:43','cus_EB7ErBEdvuOV1G',1,'subscriber','monthly',NULL),(163,'cwillis@woodlandpark.org','$2a$10$.2wiu5J7IvE1WF3/N1gxi.F5FcB3sDfgNg7k3b15.UzC6tOzcXyay','Carl Willis',NULL,NULL,'male',NULL,NULL,'2018-12-18 11:09:05','2018-12-18 11:09:05','cus_EB7M5uxRonFXkM',1,'subscriber','monthly',NULL),(164,'lfrick@woodlandpark.org','$2a$10$aRcFerHv4iZNd9PeZtgIkOW6NqhSAUGiM/ZiIZgpSxeH85Cl0kGUG','Larry Frick',NULL,NULL,'male',NULL,NULL,'2018-12-18 11:19:27','2018-12-18 11:19:27','cus_EB7XvVEPaK1g3H',1,'subscriber','monthly',NULL),(165,'bdaugherty@woodlandpark.org','$2a$10$9uQWD2GbYDgs1ClGMKCPkugUKYakH.1c/8eezSIgvop4gg9Nxh896','Bruce Daugherty',NULL,NULL,'male',NULL,NULL,'2018-12-18 11:20:32','2018-12-18 11:20:32','cus_EB7Yf0zwfH2Aw8',1,'subscriber','monthly',NULL),(166,'shinkle@woodlandpark.org','$2a$10$O/MkVlAIIhnJuGpIlNWxluIPLlCu9JL3GRdtXJvLuZnvYG7O2dycS','Stephen Hinkle',NULL,NULL,'male',NULL,NULL,'2018-12-18 11:21:45','2018-12-18 11:21:45','cus_EB7ZBRC18i5R4a',1,'subscriber','monthly',NULL),(167,'jmueller@woodlandpark.org','$2a$10$lCMCzSkt5nCyAqf4Ym/a8uDe.siLtODIws5x1nGTML4D0w3yVij92','Jake Mueller',NULL,NULL,'male',NULL,NULL,'2018-12-18 11:23:19','2018-12-18 11:23:19','cus_EB7a5zIeg7vxgA',1,'subscriber','monthly',NULL),(168,'thechristians@woodlandpark.org','$2a$10$VlX3KL0.EW/mCI79adzEseE.7mIxLexU66GbRFU7XZhiaZXgdx9z6','Tyler Christian',NULL,NULL,'male',NULL,NULL,'2018-12-18 11:28:42','2018-12-18 11:28:42','cus_EB7gBxHoIUPWDA',1,'subscriber','monthly',NULL),(169,'nathan@woodlandpark.org','$2a$10$IENHAlQMU3hXIOgytBxVM.j1H4abupNRsSKgjNPKGHer47CxaKZHS','Nathan Daugherty',NULL,NULL,'male',NULL,NULL,'2018-12-18 11:29:32','2018-12-18 11:29:32','cus_EB7hxiVIBPT2aY',1,'subscriber','monthly',NULL),(170,'kdonaldson210@gmail.com','$2a$10$x5cDyWfQJvVewBOCE.QoouP4Es22i35sOl8JZvScc6022VAglPIiu','Kyle Donaldson',NULL,NULL,'male',NULL,NULL,'2018-12-20 15:11:10','2019-04-06 13:58:07','cus_EBvigYsi0Mr7Kf',1,'subscriber','monthly',NULL),(171,'rickyabryant62@gmail.com','$2a$10$MyAj7OeHSylEYTC0ih749OHkwnOQL0epkDPg7Coj41y.3Kf0hlJgi','Richard Bryant',NULL,NULL,'male',NULL,NULL,'2018-12-20 15:36:26','2018-12-20 15:36:26','cus_EBw85WD5PnZ4Hn',1,'subscriber','monthly',NULL),(173,'onevol@gmail.com','$2a$10$4aitvmwum4DikZHGqLRFIOX12DCRtIJLqU39aejZ3RMQj0HySRAkO','William Washington',NULL,NULL,NULL,NULL,NULL,'2019-01-08 07:44:43','2019-01-08 07:44:43','',1,'viewer',NULL,NULL),(174,'cameron@honestcharley.com','$2a$10$udZHJA8k/QAhyBRqq4ogSO4y4Gm2nmhq3oz/VMur66sfBjzcBlSne','Cameron Coker',NULL,NULL,'male',NULL,NULL,'2019-01-08 16:28:33','2019-01-31 13:25:04','cus_EJ4GUlkRERFzdO',1,'subscriber','monthly',NULL),(175,'corky@honestcharley.com','$2a$10$bfOzhMUXUijt0JddSqZ1me.fyd/7RLfrQnGKHCZg3kvqDE5Q1b0Pu','Corky Coker',NULL,NULL,NULL,NULL,NULL,'2019-01-08 16:49:49','2019-01-08 16:49:49','',1,'viewer',NULL,NULL),(176,'johnm_rogers45@icloud.com','$2a$10$zd0mjcNt9LQl2ic6XAn7GulIfbumFxcNqateipHGPMP/vIEbwKB0K','John Rogers',NULL,NULL,'male',NULL,NULL,'2019-01-22 21:14:00','2019-01-22 21:14:00','cus_EOO1Nux6x4SV09',1,'subscriber','monthly',NULL),(177,'wchurch2626@gmail.com','$2a$10$RvI70XJewYTjWSquK3oop.wge43Vnkv/Pc9Rzk5UELoPhadHt3Pzi','BJ Church',NULL,NULL,'male',NULL,NULL,'2019-01-23 16:22:28','2019-01-23 16:22:28','cus_EOgY2ZbqQ0bhWQ',1,'subscriber','monthly',NULL),(178,'josh.jones5812@gmail.com','$2a$10$GMbZruSTHEl.ixdZKgDnm.wt1KF2P7uW2kk0oeS7gDveTJ9Vo5DrO','Josh Jones',NULL,NULL,'male',NULL,NULL,'2019-01-25 09:22:21','2019-01-25 09:22:21','cus_EPKEeviMOhWGjw',1,'subscriber','monthly',NULL),(179,'hopebennettcruz@gmail.com','$2a$10$rgpkxNN7zJcIxm6wBrvpHe8u3uCpr.HxfyYWaGZQXwpi3rh/OtN8K','Hope',NULL,NULL,NULL,NULL,NULL,'2019-02-02 11:14:24','2019-02-02 11:14:24','',1,'viewer',NULL,NULL),(180,'aafd@enxo.co','$2a$10$oD9d4RXEkOWPuhIjZCXiCefiEtpB.Ur7sPGlE.ytBWwqtaqp/jSCC','ajdkflj',NULL,NULL,NULL,NULL,NULL,'2019-02-07 14:30:38','2019-02-07 14:30:38','cus_EUH8afS0Y93uPJ',1,NULL,NULL,NULL),(181,'jack.noonan1995@gmail.com','$2a$10$qKGk8cab8E4Y7ZA2UmTcIOh09ukYhVCeMuJb31d3z1jtA0uDpl0BO','jack noonan',NULL,NULL,'male',NULL,NULL,'2019-02-19 15:26:38','2019-02-19 15:26:38','cus_EYmkFLENkDn5iu',1,'subscriber','monthly',NULL),(182,'shannon@riverchurch.me','$2a$10$lHlDEd.of7fjoYuC2hshx.dqVWsxUEO2Ibim/Jwh5JYdeJ3imTux2','Shannon Greer',NULL,NULL,NULL,NULL,NULL,'2019-02-20 12:16:36','2019-02-20 12:16:36','',1,'viewer',NULL,NULL),(183,'murph@tuta.io','$2a$10$Cngp9K1wgO1oUfortBlLyuIgw8584Q5Mj9zwTWZxNOcxgOwdMpqgK','Mike Conrad',NULL,NULL,NULL,NULL,NULL,'2019-03-01 11:57:30','2019-03-01 11:57:30','cus_EcTdWcB1vEd6ig',1,'subscriber','monthly',NULL),(184,'rickyabryant@gmail.com','$2a$10$15iKExJrjrsSAvvhi50e8uzKUq.nJN.yZd1NuvX.hqpH8ME6tDjCa','Richard Bryant',NULL,NULL,NULL,NULL,NULL,'2019-03-01 22:04:16','2019-03-01 22:04:16','cus_EcdPYZea2ow85U',1,'subscriber','monthly',NULL),(185,'cotyallenwhite7@gmail.com','$2a$10$9n0IUWOcDY9W4JVuSqlz4.2mqmepYIJZaS2nb7Ov.sbMbn7UUKPYW','Coty',NULL,NULL,NULL,NULL,NULL,'2019-03-08 14:08:55','2019-04-17 14:55:36','cus_Ef8KKPI5PHC64W',1,'subscriber',NULL,NULL),(186,'wjhammel98@gmail.com','$2a$10$dN98oojvhfHCU0HQo2O98uvSKB3iWPE.rcKCL9Is.aP.Tg0XLQF4W','Wesley','Wjhammel',NULL,NULL,NULL,NULL,'2019-03-29 13:18:27','2019-03-29 15:59:48','cus_EmyISAwlw9Z1Yc',1,'subscriber','monthly',NULL),(187,'benwilkey13@gmail.com','$2a$10$Era7qCUtAcLrs7LMFs6CYuzrpUDtjRFjdtTn2qsn7TMLJPyo43FRa','Benjamin Wilkey','Benji',NULL,NULL,NULL,NULL,'2019-03-30 16:17:22','2019-03-30 16:35:39','cus_EnOPzKcZu2NL2I',1,'subscriber','monthly',NULL),(188,'jojahlaw@epbfi.com','$2a$10$fugVLNVBVI2c.BzNPDFhseLJ0p/mgH9pBPmPnu1MPFgdfXw6qraXq','Mike Jennings',NULL,NULL,NULL,NULL,NULL,'2019-03-30 20:40:10','2019-03-30 20:40:10','',1,'viewer',NULL,NULL),(189,'timmyjdavis45@gmail.com','$2a$10$232.MO3JlYO1tWtdhIN0dufZERkwy2zpfLL2fJ6FYOkQ2tXzuqFjq','Timmy Davis',NULL,NULL,NULL,NULL,NULL,'2019-04-07 14:07:18','2019-04-07 14:07:18','cus_EqM6aFw3Y1FnRF',1,'subscriber','monthly',NULL),(191,'Brian_OZ82@yahoo.com','$2a$10$fLnSfR6RyxxyvXoyQOyPrOEk6MVAc/iNQ/uS6EgmWWD1z1q6iraxy','brian osmundson',NULL,NULL,NULL,NULL,NULL,'2019-04-18 14:35:48','2019-04-18 14:35:48','cus_EuU3jYvujosQv5',1,'subscriber','monthly',NULL),(192,'matthewaskew079@icloud.com','$2a$10$0VTubX1sWIPlsguKQh0Iv.QrTm9F/9XikM6fUpgBgGmLuJyFujWYq','Matthew Askew',NULL,NULL,NULL,NULL,NULL,'2019-04-19 10:20:41','2019-04-19 10:20:41','cus_EunAmDUOQBJkT6',1,'subscriber','monthly',NULL),(193,'josh@farm58tn.com','$2a$10$4TfqqAf/MQaxErp6wQlHZuppY9si/GTHfmkGwVFBlPiEvtArqkUs.','Rick Bryant',NULL,NULL,NULL,NULL,NULL,'2019-04-24 10:18:30','2019-04-24 10:18:30','cus_EwfGKyn39PeLuJ',1,'subscriber','monthly',NULL),(194,'antuk77@gmail.com','$2a$10$8d.YZVlOHAXH41jSqb5H4eOqm.JsYfHIcjiJ2q46Xr7jxUwgA8VvO','Ant',NULL,NULL,NULL,NULL,NULL,'2019-04-25 14:08:38','2019-04-25 14:08:38','cus_Ex6CBce2S3ov3F',1,NULL,NULL,NULL),(195,'A.jordanthompson@icloud.com','$2a$10$c3M/jTsPLjEuTd.BtGv6keISywJ4j5I.X7dnv0Hwl2pY7ZQHVnlN.','Jordan Thompson',NULL,NULL,NULL,NULL,NULL,'2019-04-25 14:42:05','2019-04-25 14:42:05','',1,'viewer',NULL,NULL),(196,'markanddarlene@epbfi.com','$2a$10$3SXgYYuHo5CRSxB8wVYD4..8aJJTkdVtcQxPM7CNTcYBAeB2KW0Sq','Mark Brown ',NULL,NULL,NULL,NULL,NULL,'2019-04-26 05:42:28','2019-04-26 05:42:28','',1,'viewer',NULL,NULL),(197,'bill@vdsina.ru','$2a$10$nHQfJ5Q37bSPX.7CARMLkeDX8t4DQpo0iZquZGxy.ElChAh57KM5W','Testeriic',NULL,NULL,'male',NULL,NULL,'2019-05-03 10:50:46','2019-05-03 10:50:46','cus_ErfUek8bd66qYP',1,NULL,NULL,NULL),(198,'director@vdsina.ru','$2a$10$LUhG4ywAvr/cLCkH9GD/GeeUzXNT0wi39loXXSEtvibBBH/DshBZK','RainMachinebug',NULL,NULL,'male',NULL,NULL,'2019-05-04 14:21:42','2019-05-04 14:21:42','cus_F0TRskablRFQy4',1,NULL,NULL,NULL),(199,'support@vdsina.ru','$2a$10$macCpIw9ZXd6pjoMzo.5sO5kvNLe/ZuhcYL4d1mTwMXQSnBehVzY2','Scannerfib',NULL,NULL,'male',NULL,NULL,'2019-05-06 20:43:40','2019-05-06 20:43:40','cus_F1K3lnyTdoUnpI',1,NULL,NULL,NULL),(200,'barrett@calvarychatt.com','$2a$10$cz9IGSWAenNghBy9C1FQau.2aRD70fVdMouQzi1/uC0qPC1fbqs6m','Barrett Mims',NULL,NULL,NULL,NULL,NULL,'2019-05-09 10:16:59','2019-05-09 10:16:59','cus_F2HcKRyHyIS4b3',1,NULL,NULL,NULL),(201,'fcaste1970@gmail.com','$2a$10$apzYzEyPX/EBSGI1Rg9GjOX1cq2MICO7HfCqQP.VFndJXNEsIVSNW','Freedom',NULL,NULL,NULL,NULL,NULL,'2019-05-11 14:16:24','2019-06-01 23:46:03','cus_F35wTLUACIgNgs',1,'subscriber','monthly',NULL),(202,'gregschuchard@icloud.com','$2a$10$SryJndpbIVyLueBjjV1MPe191YCSlIE/kQSEMK39qpHz9QbxaIbZ.','Greg',NULL,NULL,NULL,NULL,NULL,'2019-05-12 19:31:15','2019-05-12 19:31:15','',1,'viewer',NULL,NULL),(203,'cartertodd92@gmail.com','$2a$10$yT2dK/7cNW2iwUZ/wBCvnuXEKfYUyEmmt6u.IOTjo6GKkWcevkiXK','Carter Todd',NULL,NULL,NULL,NULL,NULL,'2019-05-17 09:20:41','2019-05-17 09:20:41','cus_F5GWzMerPg7r42',1,'subscriber','monthly',NULL),(204,'mcbryarchad@gmail.com','$2a$10$8WJSassJp/dg1e0Twl5AgOdv7DQagFv0fN/W72d7oITFGlecHuIVu','Chad McBryar',NULL,NULL,NULL,NULL,NULL,'2019-05-17 10:14:17','2019-05-17 10:14:17','cus_F5HNI6Zq6oFKA7',1,'subscriber','monthly',NULL),(205,'southfusaro@mail.com','$2a$10$hZBmzL3KcTA.KfIYmDzFbODi.LdVqPTLJqBZGK6yWEjXlQqZLXepy','Wirelessghq',NULL,NULL,'male',NULL,NULL,'2019-05-29 02:07:08','2019-05-29 02:07:08','cus_F9eEAvrsWigBLn',1,NULL,NULL,NULL),(206,'alexcardiel500@gmail.com','$2a$10$xbbe1WSBqdiUuwt1Tc12UufoQStRfxuxGiIQXWcP6LZe9POAqvYdm','Cardiel',NULL,NULL,NULL,NULL,NULL,'2019-06-04 09:34:08','2019-06-04 09:34:08','cus_FC0nkV3wE2Zeuf',1,'subscriber','monthly',NULL),(207,'rkmillz33@gmail.com','$2a$10$uXELzFwrH0n/JfkWXYDlT.gXAmWshLNBuHHoFUcNhdzAjB2Qgt7f6','Furrionnmt',NULL,NULL,'male',NULL,NULL,'2019-06-04 19:04:28','2019-06-04 19:04:28','cus_FCA01JT5TfmCyA',1,NULL,NULL,NULL),(208,'cottonhammer7@gmail.com','$2a$10$gTX5d4WSt6w2KdzJTW1wiOlIbOUOq6zOtWHFu3QxtNAy3x/cHlrnq','Coty White',NULL,NULL,NULL,NULL,NULL,'2019-06-06 22:43:18','2019-06-06 22:43:18','cus_FCxym1LUPhOY4M',1,NULL,NULL,NULL),(209,'fsuadina@hotmail.com','$2a$10$KtLP1N84OImU2KpXMh5GEe.zOWEame8ngK6d4C0VAGWX2oVmG3NuK','WILDKATrph',NULL,NULL,'male',NULL,NULL,'2019-06-06 23:17:06','2019-06-06 23:17:06','cus_FCyWVJ3lmKarin',1,NULL,NULL,NULL),(210,'ocenhumo@yahoo.com','$2a$10$wS.nZF8h92D8ZZOsxSVBj.1DxOuxt6U1VNz1PYj.GQK/ZbgRn50NK','Airbladeaej',NULL,NULL,'male',NULL,NULL,'2019-06-09 03:00:40','2019-06-09 03:00:40','cus_FDmaZGeaQqLfK1',1,NULL,NULL,NULL),(211,'beltonbernadette@hotmail.com','$2a$10$vbIoWTWqjLKQ/0kPIQcnauYlAnP5DY9dOIg2QsvlLlROY7Qj0yFIu','Testerwqu',NULL,NULL,'male',NULL,NULL,'2019-06-13 01:43:38','2019-06-13 01:43:38','cus_FFGFQf4yysOFPm',1,NULL,NULL,NULL),(212,'vunglisorma@hotmail.com','$2a$10$AJ7uSog06yJKC.9BNK633uYD12MMLpV5Is7Hakl1abj2fkM50wsZC','Weaponecs',NULL,NULL,'male',NULL,NULL,'2019-06-13 21:47:44','2019-06-13 21:47:44','cus_FFZf2s10wfTD0K',1,NULL,NULL,NULL),(213,'perfectimagepools@outlook.com','$2a$10$.x5neBJApd..HpIrjOobreJGZUdGHBHyk3u3xyJ212kWRdDiMpLAG','Sean gough',NULL,NULL,NULL,NULL,NULL,'2019-06-28 14:20:48','2019-06-28 14:20:48','cus_FL4q4mm1iu92wr',1,'subscriber','monthly',NULL),(214,'ustiggedef@mail.com','$2a$10$Jac3vdPtexpId0dSRbCiR.xShA7xsQthhvPB6v7nL8HzhYQ6XKJr2','CHIRPwig',NULL,NULL,'male',NULL,NULL,'2019-07-05 23:55:05','2019-07-05 23:55:05','cus_FNqg39CjGGYkVe',1,NULL,NULL,NULL),(215,'donna@galmangroup.com','$2a$10$2TFylkZAByOhuP9rPVn66OnbQtMHjfSkdtCcBxBieRFddnOIOVMlK','Fenderqct',NULL,NULL,'male',NULL,NULL,'2019-07-08 12:46:09','2019-07-08 12:46:09','cus_FOnZ5c4KrkYq5e',1,NULL,NULL,NULL),(216,'wrightjames055@gmail.com','$2a$10$hEdLAGmLojW7bahPnacQbuHbxwq5.lmXeMUMQfnGXW3uuwjx4AVq6','Jimmy wright',NULL,NULL,NULL,NULL,NULL,'2019-07-17 15:18:58','2019-07-17 15:18:58','cus_FSD4MmAFfDjK0g',1,'subscriber','monthly',NULL),(217,'donaldjohnson1998@gmail.com','$2a$10$LgNI7MXGpV/mr/fFk4mo3uxsRJhWe7SC1IQ61XTOJ0e6jzb9BHJoC','Jimmy',NULL,NULL,NULL,NULL,NULL,'2019-07-25 19:03:59','2019-07-25 19:03:59','cus_FVGVxHvcpsrUj2',1,NULL,NULL,NULL),(218,'blaze@lovechurch.org','$2a$10$/Dw9JF4MOnCjiv3ZCK9O4.VkB7jAP2IvXOqSQc6WrYrxJ.1//todS','Blaze',NULL,NULL,NULL,NULL,NULL,'2019-07-31 15:11:52','2019-07-31 15:11:52','cus_FXS7uzhU0l3i0a',1,NULL,NULL,NULL),(219,'jaredmetzger@yahoo.com','$2a$10$Xe4UuJBDCrZM.dR6L.ChKe/B/mF4U.UXE2n5aqPPcQHWdYY3coY/G','Testerybm',NULL,NULL,'male',NULL,NULL,'2019-08-05 08:15:19','2019-08-05 08:15:19','cus_FZDWy5Vc54iDzd',1,NULL,NULL,NULL),(220,'ajsavagellc@gmail.com','$2a$10$GviJaUFBZhI1rvsflX.VI.6e4uQfMubdqneCBrcRnNOSb0OX050OC','Flukehyf',NULL,NULL,'male',NULL,NULL,'2019-08-05 13:12:28','2019-08-05 13:12:28','cus_FZIK1KftsaCGQk',1,NULL,NULL,NULL),(222,'Csstreet69@gmail.com','$2a$10$ay3JSd0/gluSs0/l7KvWWeFx2pqq3dvCmGSJJ/RXvYgf5X5IXRf/O','Chris Street',NULL,NULL,NULL,NULL,NULL,'2019-08-09 09:18:18','2019-08-09 09:18:18','cus_FajRPSr1VL8xIR',1,'subscriber','monthly',NULL),(223,'iamcjpitts@gmail.com','$2a$10$ZP8VQoVHy9rYDpnkBiTlwedOi41W0fGw8Q5a6.nwDFEXbv4nDx4si','CJ Pitts',NULL,NULL,NULL,NULL,NULL,'2019-08-11 13:45:09','2019-08-11 13:45:09','cus_FbYC0HgyrzvMMz',1,'subscriber','monthly',NULL),(224,'jesusandme96@icloud.com','$2a$10$of/RXjA9c7wT4UxrRvUHH.yI2oFVcL55EaqbcxK51YnYKnlETY5Vy','Taylor Painter',NULL,NULL,NULL,NULL,NULL,'2019-08-15 19:20:35','2019-08-15 19:20:35','cus_Fd8WJoNODx3Daz',1,'subscriber','monthly',NULL),(225,'townformtabpy@mail.com','$2a$10$dP.bSAPa62d/IjiM4j1d9ugHQSRf./FBGOclyY57ON23.WpmZ4qDK','Rubberirb',NULL,NULL,'male',NULL,NULL,'2019-08-17 01:50:03','2019-08-17 01:50:03','cus_Fdc1n7VT0qCEvV',1,NULL,NULL,NULL),(226,'drippinghoney1000@gmail.com','$2a$10$tHHMsn1JlIXHlER5VLGZDOVl8YycETo27B4Tm.ba.9ZO1BANOyjKG','Alex ',NULL,NULL,NULL,NULL,NULL,'2019-08-19 09:16:21','2019-08-19 09:16:21','cus_FeTgmqOFTYuKH1',1,NULL,NULL,NULL),(227,'coty.white21@gmail.com','$2a$10$bU2/am4ABpc0hgqYiBGm4e/wEU7H.iA.o8iUCx.20IuNi5hCR2olC','Coty',NULL,NULL,NULL,NULL,NULL,'2019-08-19 09:33:06','2019-08-19 09:33:06','cus_FeTwpOqRxeMzjP',1,NULL,NULL,NULL),(229,'darien3d@yahoo.com','$2a$10$2lsU5adRd3CBirBOzYCqruVO7a72wskTQm4uQRjltt4fXTBO.nJmu','Darien Hogans',NULL,NULL,NULL,NULL,NULL,'2019-09-19 11:16:59','2019-09-19 11:16:59','cus_Fq7celmOZWma5m',1,'subscriber','monthly',NULL),(230,'astuff@catt.com','$2a$10$z4BkQXEe284FZ1hNCJVNte1sFD8eELGTK.UQ3Dikyi0K.DTGvebCe','Austin Stuff',NULL,NULL,NULL,NULL,NULL,'2019-09-23 08:49:24','2019-09-23 08:49:24','cus_Fra9ctGwi2YFKw',1,'subscriber','monthly',NULL),(231,'huntervasquez85@gmail.com','$2a$10$GjQGEP8iLEJT320UmSFnduKWLPprsr5.Ej/nsLsS95WI0qvGP7hGW','Hunter Vasquez',NULL,NULL,NULL,NULL,NULL,'2019-09-30 10:19:38','2019-09-30 10:19:38','cus_FuEByoARu1p5aI',1,'subscriber','monthly',NULL),(232,'zackmoore_98@yahoo.com','$2a$10$y3xc77nffmQCB0fdE5F.j.5pp6feSZNU/NZqRmPIJ5DBBLs4KcKKC','Zachary Moore',NULL,NULL,NULL,NULL,NULL,'2019-10-04 11:27:51','2019-10-04 11:27:51','cus_FvkB7ZGR9Qkdg9',1,'subscriber','monthly',NULL),(233,'itsmicheal96@gmail.com','$2a$10$3uKhd3htesR4gFhWLBwvwO39GU3GWqcLqck6.aQC4AWRJm15PZfSi','Micheal Neal ',NULL,NULL,NULL,NULL,NULL,'2019-10-14 09:26:43','2019-10-14 09:26:43','cus_FzSUw34liJ3P6v',1,'subscriber','monthly',NULL),(234,'rmbrookman@yahoo.com','$2a$10$CxHhqLlk3axkjzxj5FAuVObRa26/gXgcH8uO.MAQMsQeaS0lT2E0y','Robert Brookman',NULL,NULL,NULL,NULL,NULL,'2019-10-23 13:06:10','2019-10-23 13:06:10','cus_G2t37ECbkrLozB',1,'subscriber','monthly',NULL),(235,'Markapuckett@yahoo.com','$2a$10$Gb5R49dbkksqwxcGgoc.HOTjEQ4Ai877prGgP9LNRl2WKcTHxrHGS','Mark Puckett',NULL,NULL,NULL,NULL,NULL,'2019-10-23 16:08:48','2019-10-23 16:08:48','',1,'viewer',NULL,NULL),(236,'drewgraben@gmail.com','$2a$10$i9ikZxTZLDp.3mHLg1uc2.yoNSKaPnolJmdz/Tk5zj1qHXAOiPl5W','Andrew Graben',NULL,NULL,NULL,NULL,NULL,'2020-01-12 16:18:17','2020-01-12 16:18:17','cus_GXIP3jCGf7nQkc',1,'subscriber','monthly',NULL),(237,'williamrabercrombie@gmail.com','$2a$10$3wZtPB2WPsXK2stw3QkQHupv0/BtbYAUN3mHoJ0cnAP6n9WW.NKW6','William Abercrombie',NULL,NULL,NULL,NULL,NULL,'2020-02-13 20:09:41','2020-02-13 20:09:41','cus_GjLNnRpZRSiArD',1,NULL,NULL,NULL),(238,'phillyblues50@gmail.com','$2a$10$lEa390QuUP6Pl13j///b.eUkba8MZkoj4lSUcYaUwL5eX1rL.sw.K','John  Centofanti ',NULL,NULL,NULL,NULL,NULL,'2020-04-27 14:31:32','2020-04-27 14:31:32','cus_HAxf8lolVqNjRJ',1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_profile`
--

DROP TABLE IF EXISTS `users_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_profile` (
  `profile_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `provider_id` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `oauth_token` varchar(255) DEFAULT NULL,
  `oauth_token_secret` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`profile_id`),
  KEY `users_profile_user_id_foreign` (`user_id`),
  CONSTRAINT `users_profile_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_profile`
--

LOCK TABLES `users_profile` WRITE;
/*!40000 ALTER TABLE `users_profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_profile` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-27 14:31:33
