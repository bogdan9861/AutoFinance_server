/*
  Warnings:

  - The values [DISEL] on the enum `Auto_fuelType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Auto` MODIFY `fuelType` ENUM('PETROL', 'DIESEL', 'ELECTRO', 'HYBRID') NOT NULL;
