-- DropForeignKey
ALTER TABLE `Expencess` DROP FOREIGN KEY `Expencess_autoId_fkey`;

-- DropForeignKey
ALTER TABLE `Maintance` DROP FOREIGN KEY `Maintance_autoId_fkey`;

-- DropIndex
DROP INDEX `Expencess_autoId_fkey` ON `Expencess`;

-- DropIndex
DROP INDEX `Maintance_autoId_fkey` ON `Maintance`;

-- AddForeignKey
ALTER TABLE `Expencess` ADD CONSTRAINT `Expencess_autoId_fkey` FOREIGN KEY (`autoId`) REFERENCES `Auto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Maintance` ADD CONSTRAINT `Maintance_autoId_fkey` FOREIGN KEY (`autoId`) REFERENCES `Auto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
