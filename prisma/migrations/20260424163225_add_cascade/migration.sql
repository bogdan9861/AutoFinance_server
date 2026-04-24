-- DropForeignKey
ALTER TABLE `Auto` DROP FOREIGN KEY `Auto_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Expencess` DROP FOREIGN KEY `Expencess_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Maintance` DROP FOREIGN KEY `Maintance_userId_fkey`;

-- DropIndex
DROP INDEX `Auto_userId_fkey` ON `Auto`;

-- DropIndex
DROP INDEX `Expencess_userId_fkey` ON `Expencess`;

-- DropIndex
DROP INDEX `Maintance_userId_fkey` ON `Maintance`;

-- AddForeignKey
ALTER TABLE `Auto` ADD CONSTRAINT `Auto_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expencess` ADD CONSTRAINT `Expencess_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Maintance` ADD CONSTRAINT `Maintance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
