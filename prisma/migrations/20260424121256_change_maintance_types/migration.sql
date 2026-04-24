/*
  Warnings:

  - The values [MAINTANCE] on the enum `Maintance_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Maintance` MODIFY `type` ENUM('OIL', 'FILTER_CHANGE', 'BRAKE_SERVICE', 'TIRE_SERVICE', 'DIAGNOSTICS', 'REPAIR', 'PLANNED', 'OTHER') NOT NULL;
