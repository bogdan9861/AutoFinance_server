-- AlterTable
ALTER TABLE `Maintance` MODIFY `status` ENUM('completed', 'planned', 'cancelled') NOT NULL DEFAULT 'completed';
