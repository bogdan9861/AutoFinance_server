/*
  Warnings:

  - The values [OIL] on the enum `Maintance_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Maintance` MODIFY `type` ENUM('OIL_CHANGE', 'FILTER_CHANGE', 'BRAKE_SERVICE', 'TIRE_SERVICE', 'DIAGNOSTICS', 'REPAIR', 'PLANNED', 'OTHER') NOT NULL;
