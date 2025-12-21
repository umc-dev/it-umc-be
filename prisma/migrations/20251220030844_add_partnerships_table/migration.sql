-- CreateTable
CREATE TABLE `partnerships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `photo` VARCHAR(255) NULL,
    `tgl_mulai` DATE NOT NULL,
    `tgl_berakhir` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
