-- DropForeignKey
ALTER TABLE `news` DROP FOREIGN KEY `News_authorId_fkey`;

-- AddForeignKey
ALTER TABLE `news` ADD CONSTRAINT `News_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
