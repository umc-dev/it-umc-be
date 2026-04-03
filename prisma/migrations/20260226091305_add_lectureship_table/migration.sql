-- AlterTable
ALTER TABLE `dosen` ADD COLUMN `lectureshipId` INTEGER NULL;

-- CreateTable
CREATE TABLE `lectureships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `News_lectureshipId_fkey` ON `dosen`(`lectureshipId`);

-- AddForeignKey
ALTER TABLE `dosen` ADD CONSTRAINT `News_lectureshipId_fkey` FOREIGN KEY (`lectureshipId`) REFERENCES `lectureships`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
