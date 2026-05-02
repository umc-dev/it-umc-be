-- CreateTable
CREATE TABLE `dosen_tridharmas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dosenId` VARCHAR(191) NOT NULL,
    `category` ENUM('PENGABDIAN', 'PENGAJARAN', 'PENELITIAN') NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `year` MEDIUMINT UNSIGNED NOT NULL,
    `description` TEXT NOT NULL,
    `link` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `DosenTridharma_dosenId_fkey`(`dosenId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dosen_tridharmas` ADD CONSTRAINT `dosen_tridharmas_dosenId_fkey` FOREIGN KEY (`dosenId`) REFERENCES `dosen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
