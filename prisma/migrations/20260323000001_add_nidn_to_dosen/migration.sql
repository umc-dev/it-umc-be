-- AlterTable
-- First add column as nullable
ALTER TABLE `dosen` ADD COLUMN `nidn` VARCHAR(191) NULL;

-- Populate existing rows with unique values based on ID
UPDATE `dosen` SET `nidn` = CONCAT('NIDN-', HEX(id)) WHERE `nidn` IS NULL;

-- Make column NOT NULL
ALTER TABLE `dosen` MODIFY COLUMN `nidn` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `dosen_nidn_key` ON `dosen`(`nidn`);
