-- Populate missing NIDN values for existing records
UPDATE `dosen` SET `nidn` = CONCAT('NIDN-', HEX(id)) WHERE `nidn` = '' OR `nidn` IS NULL;

-- AddUniqueConstraint
ALTER TABLE `dosen` ADD UNIQUE INDEX `dosen_nidn_key` (`nidn`);
