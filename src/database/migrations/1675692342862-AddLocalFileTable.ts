import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLocalFileTable1675692342862 implements MigrationInterface {
  name = 'AddLocalFileTable1675692342862';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`local_file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fileName\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`mimeType\` varchar(255) NOT NULL, \`generalAccess\` enum ('private', 'public') NOT NULL, \`ownerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD \`avatarFileId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD UNIQUE INDEX \`IDX_3f24071759ec6354b0259f9c4d\` (\`avatarFileId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_3f24071759ec6354b0259f9c4d\` ON \`user_profile\` (\`avatarFileId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD CONSTRAINT \`FK_3f24071759ec6354b0259f9c4d1\` FOREIGN KEY (\`avatarFileId\`) REFERENCES \`local_file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` ADD CONSTRAINT \`FK_1dc62b3a3dd9182d23a01bb0c31\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`local_file\` DROP FOREIGN KEY \`FK_1dc62b3a3dd9182d23a01bb0c31\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` DROP FOREIGN KEY \`FK_3f24071759ec6354b0259f9c4d1\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_3f24071759ec6354b0259f9c4d\` ON \`user_profile\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` DROP INDEX \`IDX_3f24071759ec6354b0259f9c4d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` DROP COLUMN \`avatarFileId\``,
    );
    await queryRunner.query(`DROP TABLE \`local_file\``);
  }
}
