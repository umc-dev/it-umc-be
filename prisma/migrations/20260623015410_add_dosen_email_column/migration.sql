/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `dosen` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `dosen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dosen` ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `dosen_email_key` ON `dosen`(`email`);

-- CreateIndex
CREATE INDEX `dosen_email_fkey` ON `dosen`(`email`);

-- AddForeignKey
ALTER TABLE `dosen` ADD CONSTRAINT `dosen_email_fkey` FOREIGN KEY (`email`) REFERENCES `admin`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
