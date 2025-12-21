/*
  Warnings:

  - You are about to drop the column `tgl_berakhir` on the `partnerships` table. All the data in the column will be lost.
  - You are about to drop the column `tgl_mulai` on the `partnerships` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `partnerships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `partnerships` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `partnerships` DROP COLUMN `tgl_berakhir`,
    DROP COLUMN `tgl_mulai`,
    ADD COLUMN `endDate` DATE NOT NULL,
    ADD COLUMN `startDate` DATE NOT NULL;
