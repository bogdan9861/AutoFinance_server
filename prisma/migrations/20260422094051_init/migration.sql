-- CreateTable
CREATE TABLE `Auto` (
    `id` VARCHAR(191) NOT NULL,
    `mark` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `mileageKM` INTEGER NOT NULL,
    `consumption` DOUBLE NOT NULL,
    `maintanceDistance` INTEGER NOT NULL DEFAULT 10000,
    `distanceCovered` INTEGER NOT NULL DEFAULT 0,
    `image` VARCHAR(191) NOT NULL,
    `purchaseDate` DATETIME(3) NOT NULL,
    `purchasePrice` BIGINT NOT NULL,
    `fuelType` ENUM('PETROL', 'DISEL', 'ELECTRO', 'HYBRID') NOT NULL,
    `color` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expencess` (
    `id` VARCHAR(191) NOT NULL,
    `price` BIGINT NOT NULL,
    `type` ENUM('FUEL', 'MAINTANCE', 'REPAIR', 'INSURANCE', 'TAXES', 'PARKING', 'CHARGING') NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `place` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `autoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Maintance` (
    `id` VARCHAR(191) NOT NULL,
    `price` BIGINT NOT NULL,
    `type` ENUM('PLANNED', 'TIRE_SERVICE', 'MAINTANCE', 'OIL', 'REPAIR', 'DIAGNOSTICS') NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nextMaintanceMillageKM` INTEGER NULL,
    `place` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `masterName` VARCHAR(191) NULL,
    `autoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Expencess` ADD CONSTRAINT `Expencess_autoId_fkey` FOREIGN KEY (`autoId`) REFERENCES `Auto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Maintance` ADD CONSTRAINT `Maintance_autoId_fkey` FOREIGN KEY (`autoId`) REFERENCES `Auto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
