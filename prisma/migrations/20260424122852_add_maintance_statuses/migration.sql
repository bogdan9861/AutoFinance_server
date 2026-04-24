-- AlterTable
ALTER TABLE `Maintance` ADD COLUMN `status` ENUM('completed', 'planned', 'cancelled') NOT NULL DEFAULT 'planned';
