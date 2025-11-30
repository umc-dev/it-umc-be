/*
  Warnings:

  - You are about to drop the column `kepakaran` on the `dosen` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `dosen` table. All the data in the column will be lost.
  - You are about to drop the column `penelitian` on the `dosen` table. All the data in the column will be lost.
  - You are about to drop the column `pengabdian` on the `dosen` table. All the data in the column will be lost.
  - You are about to drop the column `pengajaran` on the `dosen` table. All the data in the column will be lost.
  - Added the required column `expertise` to the `dosen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `dosen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `research` to the `dosen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teaching` to the `dosen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dosen` DROP COLUMN `kepakaran`,
    DROP COLUMN `nama`,
    DROP COLUMN `penelitian`,
    DROP COLUMN `pengabdian`,
    DROP COLUMN `pengajaran`,
    ADD COLUMN `expertise` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `research` VARCHAR(191) NOT NULL,
    ADD COLUMN `teaching` VARCHAR(191) NOT NULL;
