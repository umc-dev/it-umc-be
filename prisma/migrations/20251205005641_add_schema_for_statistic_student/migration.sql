-- CreateTable
CREATE TABLE `StatisticStudent` (
    `id` VARCHAR(191) NOT NULL,
    `year` MEDIUMINT UNSIGNED NOT NULL,
    `enteredStudents` MEDIUMINT UNSIGNED NOT NULL,
    `graduatedStudents` MEDIUMINT UNSIGNED NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `StatisticStudent_year_key`(`year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
