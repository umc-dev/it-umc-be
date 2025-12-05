-- CreateTable
CREATE TABLE `statistic_student` (
    `id` VARCHAR(191) NOT NULL,
    `tahun` MEDIUMINT UNSIGNED NOT NULL,
    `total_keluar` MEDIUMINT UNSIGNED NOT NULL,
    `total_masuk` MEDIUMINT UNSIGNED NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `statistic_student_tahun_key`(`tahun`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
