-- Création de la base de données
CREATE DATABASE IF NOT EXISTS carbivio_saas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE carbivio_saas;

-- Création de la table `users`
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `password` VARCHAR(191) NOT NULL,
  `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_email_key` (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Création de la table `service_requests`
CREATE TABLE IF NOT EXISTS `service_requests` (
  `id` VARCHAR(191) NOT NULL,
  `user_id` VARCHAR(191) NOT NULL,
  `service_type` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `location` VARCHAR(191) NOT NULL,
  `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
  `price` DOUBLE NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `service_requests_user_id_idx` (`user_id`),
  INDEX `service_requests_status_idx` (`status`),
  CONSTRAINT `service_requests_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Création de la table `admin_logs`
CREATE TABLE IF NOT EXISTS `admin_logs` (
  `id` VARCHAR(191) NOT NULL,
  `admin_id` VARCHAR(191) NOT NULL,
  `action` VARCHAR(191) NOT NULL,
  `target_id` VARCHAR(191) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
