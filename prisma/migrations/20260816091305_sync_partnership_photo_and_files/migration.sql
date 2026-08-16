/*
  Warnings:

  - Added the required column `photo` to the `partnerships` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `partnerships` ADD COLUMN `photo` VARCHAR(255) NOT NULL;
