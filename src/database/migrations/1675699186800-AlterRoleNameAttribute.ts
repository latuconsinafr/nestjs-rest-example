import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRoleNameAttribute1675699186800 implements MigrationInterface {
  name = 'AlterRoleNameAttribute1675699186800';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD \`name\` enum ('super-admin', 'user') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD \`name\` varchar(255) NOT NULL`,
    );
  }
}
