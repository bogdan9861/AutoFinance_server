/*
  Warnings:

  - Added the required column `userId` to the `Auto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Auto` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Auto` ADD CONSTRAINT `Auto_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
