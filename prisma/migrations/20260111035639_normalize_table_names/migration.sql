/*
  Warnings:

  - You are about to drop the `adminaccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `statisticstudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `visionmission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `adminaccount` DROP FOREIGN KEY `AdminAccount_adminId_fkey`;

-- DropTable
DROP TABLE `adminaccount`;

-- DropTable
DROP TABLE `statisticstudent`;

-- DropTable
DROP TABLE `visionmission`;

-- CreateTable
CREATE TABLE `admin_accounts` (
    `id` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `adminId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `admin_accounts_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `statistic_student` (
    `id` VARCHAR(191) NOT NULL,
    `year` MEDIUMINT UNSIGNED NOT NULL,
    `enteredStudents` MEDIUMINT UNSIGNED NOT NULL,
    `graduatedStudents` MEDIUMINT UNSIGNED NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `statistic_student_year_key`(`year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vission_mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vision` TEXT NOT NULL,
    `mission` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admin_accounts` ADD CONSTRAINT `admin_accounts_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
