/*
  Warnings:

  - Added the required column `achievementName` to the `achievements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `achievements` ADD COLUMN `achievementName` VARCHAR(255) NOT NULL;
