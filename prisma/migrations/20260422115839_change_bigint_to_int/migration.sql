/*
  Warnings:

  - You are about to alter the column `purchasePrice` on the `Auto` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `price` on the `Expencess` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `price` on the `Maintance` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `Auto` MODIFY `purchasePrice` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Expencess` MODIFY `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Maintance` MODIFY `price` INTEGER NOT NULL;
