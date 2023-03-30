import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablesIdentifierToUuid1676872212399
  implements MigrationInterface
{
  name = 'AlterTablesIdentifierToUuid1676872212399';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` DROP FOREIGN KEY \`FK_3f24071759ec6354b0259f9c4d1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` DROP FOREIGN KEY \`FK_1dc62b3a3dd9182d23a01bb0c31\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` CHANGE \`id\` \`id\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`local_file\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`local_file\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`local_file\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` DROP COLUMN \`ownerId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` ADD \`ownerId\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` DROP FOREIGN KEY \`FK_f44d0cd18cfd80b0fed7806c3b7\``,
    );
    await queryRunner.query(`ALTER TABLE \`user_profile\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `DROP INDEX \`REL_f44d0cd18cfd80b0fed7806c3b\` ON \`user_profile\``,
    );
    await queryRunner.query(`ALTER TABLE \`user_profile\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD \`id\` varchar(255) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD UNIQUE INDEX \`IDX_f44d0cd18cfd80b0fed7806c3b\` (\`id\`)`,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_3f24071759ec6354b0259f9c4d\` ON \`user_profile\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` DROP COLUMN \`avatarFileId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD \`avatarFileId\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD UNIQUE INDEX \`IDX_3f24071759ec6354b0259f9c4d\` (\`avatarFileId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_776b7cf9330802e5ef5a8fb18dc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`id\` \`id\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_4fb14631257670efa14b15a3d86\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`role\` CHANGE \`id\` \`id\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`role\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`users_roles\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD PRIMARY KEY (\`roleId\`)`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_776b7cf9330802e5ef5a8fb18d\` ON \`users_roles\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` DROP COLUMN \`userId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD \`userId\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`users_roles\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD PRIMARY KEY (\`roleId\`, \`userId\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`users_roles\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD PRIMARY KEY (\`userId\`)`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4fb14631257670efa14b15a3d8\` ON \`users_roles\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` DROP COLUMN \`roleId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD \`roleId\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`users_roles\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD PRIMARY KEY (\`userId\`, \`roleId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_f44d0cd18cfd80b0fed7806c3b\` ON \`user_profile\` (\`id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_3f24071759ec6354b0259f9c4d\` ON \`user_profile\` (\`avatarFileId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_776b7cf9330802e5ef5a8fb18d\` ON \`users_roles\` (\`userId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_4fb14631257670efa14b15a3d8\` ON \`users_roles\` (\`roleId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` ADD CONSTRAINT \`FK_1dc62b3a3dd9182d23a01bb0c31\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD CONSTRAINT \`FK_f44d0cd18cfd80b0fed7806c3b7\` FOREIGN KEY (\`id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD CONSTRAINT \`FK_3f24071759ec6354b0259f9c4d1\` FOREIGN KEY (\`avatarFileId\`) REFERENCES \`local_file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_776b7cf9330802e5ef5a8fb18dc\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_4fb14631257670efa14b15a3d86\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_4fb14631257670efa14b15a3d86\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_776b7cf9330802e5ef5a8fb18dc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` DROP FOREIGN KEY \`FK_3f24071759ec6354b0259f9c4d1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` DROP FOREIGN KEY \`FK_f44d0cd18cfd80b0fed7806c3b7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` DROP FOREIGN KEY \`FK_1dc62b3a3dd9182d23a01bb0c31\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4fb14631257670efa14b15a3d8\` ON \`users_roles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_776b7cf9330802e5ef5a8fb18d\` ON \`users_roles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_3f24071759ec6354b0259f9c4d\` ON \`user_profile\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_f44d0cd18cfd80b0fed7806c3b\` ON \`user_profile\``,
    );
    await queryRunner.query(`ALTER TABLE \`users_roles\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD PRIMARY KEY (\`userId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` DROP COLUMN \`roleId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD \`roleId\` int NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_4fb14631257670efa14b15a3d8\` ON \`users_roles\` (\`roleId\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`users_roles\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD PRIMARY KEY (\`roleId\`, \`userId\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`users_roles\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD PRIMARY KEY (\`roleId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` DROP COLUMN \`userId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD \`userId\` int NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_776b7cf9330802e5ef5a8fb18d\` ON \`users_roles\` (\`userId\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`users_roles\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD PRIMARY KEY (\`userId\`, \`roleId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role\` DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\``,
    );
    await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD \`id\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`role\` ADD PRIMARY KEY (\`id\`)`);
    await queryRunner.query(
      `ALTER TABLE \`role\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_4fb14631257670efa14b15a3d86\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`id\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` ADD PRIMARY KEY (\`id\`)`);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_776b7cf9330802e5ef5a8fb18dc\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` DROP INDEX \`IDX_3f24071759ec6354b0259f9c4d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` DROP COLUMN \`avatarFileId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD \`avatarFileId\` int NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_3f24071759ec6354b0259f9c4d\` ON \`user_profile\` (\`avatarFileId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` DROP INDEX \`IDX_f44d0cd18cfd80b0fed7806c3b\``,
    );
    await queryRunner.query(`ALTER TABLE \`user_profile\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD \`id\` int NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_f44d0cd18cfd80b0fed7806c3b\` ON \`user_profile\` (\`id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD PRIMARY KEY (\`id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD CONSTRAINT \`FK_f44d0cd18cfd80b0fed7806c3b7\` FOREIGN KEY (\`id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` DROP COLUMN \`ownerId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` ADD \`ownerId\` int NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`local_file\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`local_file\` ADD \`id\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` ADD PRIMARY KEY (\`id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` ADD CONSTRAINT \`FK_1dc62b3a3dd9182d23a01bb0c31\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD CONSTRAINT \`FK_3f24071759ec6354b0259f9c4d1\` FOREIGN KEY (\`avatarFileId\`) REFERENCES \`local_file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
