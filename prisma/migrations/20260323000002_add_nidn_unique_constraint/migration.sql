-- Populate missing NIDN values for existing records
UPDATE `dosen` SET `nidn` = CONCAT('NIDN-', HEX(id)) WHERE `nidn` = '' OR `nidn` IS NULL;
