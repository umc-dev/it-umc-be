/*
  Warnings:

  - You are about to drop the column `photo` on the `partnerships` table. All the data in the column will be lost.
  - Added the required column `description` to the `partnerships` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dosen_tridharmas` MODIFY `link` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `partnerships` DROP COLUMN `photo`,
    ADD COLUMN `description` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `partnership_files` (
    `id` VARCHAR(191) NOT NULL,
    `partnershipId` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(255) NOT NULL,
    `fileUrl` VARCHAR(255) NOT NULL,
    `fileType` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `partnership_files_partnershipId_idx`(`partnershipId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accreditations` (
    `id` VARCHAR(191) NOT NULL,
    `category` ENUM('KAMPUS', 'PRODI') NOT NULL,
    `prodi` ENUM('S1', 'D3') NULL,
    `title` VARCHAR(255) NOT NULL,
    `grade` VARCHAR(50) NOT NULL,
    `skNumber` VARCHAR(100) NOT NULL,
    `skLink` TEXT NULL,
    `certificateFile` VARCHAR(255) NULL,
    `institution` VARCHAR(100) NULL,
    `validFrom` DATE NOT NULL,
    `validUntil` DATE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `partnership_files` ADD CONSTRAINT `partnership_files_partnershipId_fkey` FOREIGN KEY (`partnershipId`) REFERENCES `partnerships`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
