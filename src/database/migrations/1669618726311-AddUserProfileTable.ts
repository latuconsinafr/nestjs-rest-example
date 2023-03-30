import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserProfileTable1669618726311 implements MigrationInterface {
  name = 'AddUserProfileTable1669618726311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_profile\` (\`id\` int NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`bio\` varchar(255) NULL, \`location\` varchar(255) NULL, \`website\` varchar(255) NULL, \`birthDate\` datetime NOT NULL, UNIQUE INDEX \`REL_f44d0cd18cfd80b0fed7806c3b\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`description\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`firstName\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastName\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`phone\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD CONSTRAINT \`FK_f44d0cd18cfd80b0fed7806c3b7\` FOREIGN KEY (\`id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` DROP FOREIGN KEY \`FK_f44d0cd18cfd80b0fed7806c3b7\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phone\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`lastName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`firstName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`description\` text NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_f44d0cd18cfd80b0fed7806c3b\` ON \`user_profile\``,
    );
    await queryRunner.query(`DROP TABLE \`user_profile\``);
  }
}
