-- CreateTable
CREATE TABLE `dosen` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `kepakaran` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NOT NULL,
    `pengabdian` VARCHAR(191) NOT NULL,
    `pengajaran` VARCHAR(191) NOT NULL,
    `penelitian` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
