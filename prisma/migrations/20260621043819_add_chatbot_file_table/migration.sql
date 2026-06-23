/*
  Warnings:

  - You are about to alter the column `year` on the `dosen_tridharmas` table. The data in that column could be lost. The data in that column will be cast from `UnsignedMediumInt` to `Int`.
  - You are about to alter the column `link` on the `dosen_tridharmas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `dosen_tridharmas` MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `year` INTEGER NOT NULL,
    MODIFY `link` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `chatbot_files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(255) NOT NULL,
    `filePath` VARCHAR(255) NOT NULL,
    `fileUrl` VARCHAR(255) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- RenameIndex
ALTER TABLE `dosen_tridharmas` RENAME INDEX `DosenTridharma_dosenId_fkey` TO `dosen_tridharmas_dosenId_idx`;
