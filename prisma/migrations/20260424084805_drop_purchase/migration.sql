/*
  Warnings:

  - You are about to drop the column `purchaseDate` on the `Auto` table. All the data in the column will be lost.
  - You are about to drop the column `purchasePrice` on the `Auto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Auto` DROP COLUMN `purchaseDate`,
    DROP COLUMN `purchasePrice`;
