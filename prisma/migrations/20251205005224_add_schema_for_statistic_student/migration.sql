-- CreateTable
CREATE TABLE `StatisticStudent` (
    `id` VARCHAR(191) NOT NULL,
    `tahun` MEDIUMINT UNSIGNED NOT NULL,
    `enteredStudents` MEDIUMINT UNSIGNED NOT NULL,
    `graduatedStudents` MEDIUMINT UNSIGNED NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `StatisticStudent_tahun_key`(`tahun`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
