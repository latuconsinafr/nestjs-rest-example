import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleTable1675697129483 implements MigrationInterface {
  name = 'AddRoleTable1675697129483';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_3f24071759ec6354b0259f9c4d\` ON \`user_profile\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users_roles\` (\`userId\` int NOT NULL, \`roleId\` int NOT NULL, INDEX \`IDX_776b7cf9330802e5ef5a8fb18d\` (\`userId\`), INDEX \`IDX_4fb14631257670efa14b15a3d8\` (\`roleId\`), PRIMARY KEY (\`userId\`, \`roleId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
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
      `ALTER TABLE \`user\` ADD \`roles\` enum ('super-admin', 'user') NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4fb14631257670efa14b15a3d8\` ON \`users_roles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_776b7cf9330802e5ef5a8fb18d\` ON \`users_roles\``,
    );
    await queryRunner.query(`DROP TABLE \`users_roles\``);
    await queryRunner.query(`DROP TABLE \`role\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_3f24071759ec6354b0259f9c4d\` ON \`user_profile\` (\`avatarFileId\`)`,
    );
  }
}
