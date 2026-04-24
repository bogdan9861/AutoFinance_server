/*
  Warnings:

  - Added the required column `userId` to the `Expencess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Maintance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Expencess` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Maintance` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Expencess` ADD CONSTRAINT `Expencess_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Maintance` ADD CONSTRAINT `Maintance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
