-- ============================================================
-- Carbivio SaaS — Script de création de la base de données
-- MySQL — utf8mb4
-- ============================================================

CREATE DATABASE IF NOT EXISTS carbivio_saas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE carbivio_saas;

-- ============================================================
-- Table : users
-- ============================================================
CREATE TABLE IF NOT EXISTS `users` (
  `id`         VARCHAR(191) NOT NULL,
  `name`       VARCHAR(191) NOT NULL,
  `email`      VARCHAR(191) NOT NULL,
  `password`   VARCHAR(191) NOT NULL,
  `role`       ENUM('USER', 'ADMIN', 'DRIVER') NOT NULL DEFAULT 'USER',
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_email_key` (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ============================================================
-- Table : service_requests
-- ============================================================
CREATE TABLE IF NOT EXISTS `service_requests` (
  `id`           VARCHAR(191) NOT NULL,
  `user_id`      VARCHAR(191) NOT NULL,
  `driver_id`    VARCHAR(191) NULL,
  `service_type` VARCHAR(191) NOT NULL,
  `description`  TEXT NOT NULL,
  `location`     VARCHAR(191) NOT NULL,
  `latitude`     DOUBLE NULL,
  `longitude`    DOUBLE NULL,
  `status`       ENUM('PENDING', 'APPROVED', 'IN_PROGRESS', 'REJECTED', 'COMPLETED') NOT NULL DEFAULT 'APPROVED',
  `price`        DOUBLE NULL,
  `created_at`   DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`   DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `service_requests_user_id_idx` (`user_id`),
  INDEX `service_requests_driver_id_idx` (`driver_id`),
  INDEX `service_requests_status_idx` (`status`),
  CONSTRAINT `service_requests_user_id_fkey`
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `service_requests_driver_id_fkey`
    FOREIGN KEY (`driver_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ============================================================
-- Table : password_reset_tokens
-- ============================================================
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `id`         VARCHAR(191) NOT NULL,
  `user_id`    VARCHAR(191) NOT NULL,
  `token`      VARCHAR(191) NOT NULL,
  `expires_at` DATETIME(3) NOT NULL,
  `used`       TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `password_reset_tokens_token_key` (`token`),
  INDEX `password_reset_tokens_token_idx` (`token`),
  CONSTRAINT `password_reset_tokens_user_id_fkey`
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ============================================================
-- Table : admin_logs
-- ============================================================
CREATE TABLE IF NOT EXISTS `admin_logs` (
  `id`         VARCHAR(191) NOT NULL,
  `admin_id`   VARCHAR(191) NOT NULL,
  `action`     VARCHAR(191) NOT NULL,
  `target_id`  VARCHAR(191) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ============================================================
-- Table : vehicles
-- ============================================================
CREATE TABLE IF NOT EXISTS `vehicles` (
  `id`                VARCHAR(191) NOT NULL,
  `plaque`            VARCHAR(191) NOT NULL,
  `modele`            VARCHAR(191) NOT NULL,
  `chauffeur`         VARCHAR(191) NOT NULL,
  `statut`            ENUM('EN_ROUTE', 'DISPONIBLE', 'MAINTENANCE', 'HORS_SERVICE') NOT NULL DEFAULT 'DISPONIBLE',
  `localisation`      VARCHAR(191) NOT NULL,
  `carburant`         INT NOT NULL DEFAULT 100,
  `dernier_entretien` DATETIME(3) NULL,
  `prochain_entretien`DATETIME(3) NULL,
  `created_at`        DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`        DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `vehicles_plaque_key` (`plaque`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ============================================================
-- Table : stock_items
-- ============================================================
CREATE TABLE IF NOT EXISTS `stock_items` (
  `id`            VARCHAR(191) NOT NULL,
  `name`          VARCHAR(191) NOT NULL,
  `category`      ENUM('FUEL', 'BATTERY', 'OIL', 'TIRE') NOT NULL,
  `quantity`      INT NOT NULL,
  `unit`          VARCHAR(191) NOT NULL,
  `unit_price`    INT NOT NULL,
  `total_value`   INT NOT NULL,
  `supplier`      VARCHAR(191) NOT NULL,
  `received_date` DATETIME(3) NOT NULL,
  `location`      VARCHAR(191) NOT NULL,
  `status`        ENUM('AVAILABLE', 'LOW', 'CRITICAL') NOT NULL DEFAULT 'AVAILABLE',
  `last_updated`  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `created_at`    DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`    DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
