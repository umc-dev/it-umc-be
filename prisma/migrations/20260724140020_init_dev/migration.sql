/*
  Warnings:

  - The primary key for the `organizational_structure` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[prodi]` on the table `organizational_structure` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[year,prodi]` on the table `statistic_student` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `organizational_structure` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `organizational_structure` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `statistic_student_year_key` ON `statistic_student`;

-- AlterTable
ALTER TABLE `achievements` ADD COLUMN `prodi` ENUM('S1', 'D3') NOT NULL DEFAULT 'S1';

-- AlterTable
ALTER TABLE `alumni` ADD COLUMN `prodi` ENUM('S1', 'D3') NOT NULL DEFAULT 'S1';

-- AlterTable
ALTER TABLE `dosen` ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `education` TEXT NULL,
    ADD COLUMN `prodi` ENUM('S1', 'D3') NOT NULL DEFAULT 'S1';

-- AlterTable
ALTER TABLE `organizational_structure` DROP PRIMARY KEY,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `prodi` ENUM('S1', 'D3') NOT NULL DEFAULT 'S1',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `statistic_student` ADD COLUMN `prodi` ENUM('S1', 'D3') NOT NULL DEFAULT 'S1';

-- AlterTable
ALTER TABLE `study` ADD COLUMN `prodi` ENUM('S1', 'D3') NOT NULL DEFAULT 'S1';

-- AlterTable
ALTER TABLE `vission_mission` ADD COLUMN `prodi` ENUM('S1', 'D3') NOT NULL DEFAULT 'S1';

-- CreateIndex
CREATE UNIQUE INDEX `organizational_structure_prodi_key` ON `organizational_structure`(`prodi`);

-- CreateIndex
CREATE UNIQUE INDEX `statistic_student_year_prodi_key` ON `statistic_student`(`year`, `prodi`);
