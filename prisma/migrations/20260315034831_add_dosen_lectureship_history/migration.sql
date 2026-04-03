/*
  Warnings:

  - You are about to drop the column `lectureshipId` on the `dosen` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `dosen` DROP FOREIGN KEY `News_lectureshipId_fkey`;

-- DropIndex
DROP INDEX `News_lectureshipId_fkey` ON `dosen`;

-- AlterTable
ALTER TABLE `dosen` DROP COLUMN `lectureshipId`;

-- CreateTable
CREATE TABLE `dosen_lectureships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dosenId` VARCHAR(191) NOT NULL,
    `lectureshipId` INTEGER NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `DosenLectureship_dosenId_fkey`(`dosenId`),
    INDEX `DosenLectureship_lectureshipId_fkey`(`lectureshipId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dosen_lectureships` ADD CONSTRAINT `dosen_lectureships_dosenId_fkey` FOREIGN KEY (`dosenId`) REFERENCES `dosen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dosen_lectureships` ADD CONSTRAINT `dosen_lectureships_lectureshipId_fkey` FOREIGN KEY (`lectureshipId`) REFERENCES `lectureships`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
