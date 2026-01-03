-- DropForeignKey
ALTER TABLE `adminaccount` DROP FOREIGN KEY `AdminAccount_adminId_fkey`;

-- DropIndex
DROP INDEX `AdminAccount_adminId_fkey` ON `adminaccount`;

-- AddForeignKey
ALTER TABLE `AdminAccount` ADD CONSTRAINT `AdminAccount_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
