DROP TABLE IF EXISTS `petitioners`;
CREATE TABLE `petitioners` (
  `petitioner_email` VARCHAR(100) NOT NULL,
  `fullname` VARCHAR(100) DEFAULT NULL,
  `dob` DATE DEFAULT NULL,
  `password_hash` TEXT,
  `bioid` VARCHAR(45) DEFAULT NULL,
  `role` VARCHAR(20) NOT NULL DEFAULT 'Petitioner', -- Role column
  PRIMARY KEY (`petitioner_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Updated Admins Table with Role Column
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `admin_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password_hash` TEXT NOT NULL,
  `role` VARCHAR(20) NOT NULL DEFAULT 'Admin', -- Role column
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Updated Petitions Table with Foreign Key
DROP TABLE IF EXISTS `petitions`;
CREATE TABLE `petitions` (
  `petition_id` INT NOT NULL AUTO_INCREMENT,
  `petitioner_email` VARCHAR(100) DEFAULT NULL,
  `title` VARCHAR(100) DEFAULT NULL,
  `content` LONGTEXT,
  `status` VARCHAR(45) DEFAULT 'open',
  `response` LONGTEXT,
  `signature_count` INT DEFAULT NULL,
  PRIMARY KEY (`petition_id`),
  FOREIGN KEY (`petitioner_email`) REFERENCES `petitioners`(`petitioner_email`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Petition Signatures Table
DROP TABLE IF EXISTS `petition_signatures`;
CREATE TABLE `petition_signatures` (
  `signature_id` INT NOT NULL AUTO_INCREMENT,
  `petition_id` INT NOT NULL,
  `signer_email` VARCHAR(100) NOT NULL,
  `signed_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`signature_id`),
  FOREIGN KEY (`petition_id`) REFERENCES `petitions`(`petition_id`) ON DELETE CASCADE,
  FOREIGN KEY (`signer_email`) REFERENCES `petitioners`(`petitioner_email`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




