-- AlterTable
ALTER TABLE `admin` MODIFY `password` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `AdminAccount` (
    `id` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `access_token` VARCHAR(191) NULL,
    `refresh_token` VARCHAR(191) NULL,
    `expires_at` INTEGER NULL,
    `adminId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AdminAccount_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AdminAccount` ADD CONSTRAINT `AdminAccount_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `admin` RENAME INDEX `Admin_email_key` TO `admin_email_key`;
