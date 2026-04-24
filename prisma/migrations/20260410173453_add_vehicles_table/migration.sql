-- CreateTable
CREATE TABLE `vehicles` (
    `id` VARCHAR(191) NOT NULL,
    `plaque` VARCHAR(191) NOT NULL,
    `modele` VARCHAR(191) NOT NULL,
    `chauffeur` VARCHAR(191) NOT NULL,
    `statut` ENUM('EN_ROUTE', 'DISPONIBLE', 'MAINTENANCE', 'HORS_SERVICE') NOT NULL DEFAULT 'DISPONIBLE',
    `localisation` VARCHAR(191) NOT NULL,
    `carburant` INTEGER NOT NULL DEFAULT 100,
    `dernier_entretien` DATETIME(3) NULL,
    `prochain_entretien` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `vehicles_plaque_key`(`plaque`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
