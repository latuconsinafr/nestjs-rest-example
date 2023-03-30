import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserRolesAttribute1679276151891
  implements MigrationInterface
{
  name = 'AlterUserRolesAttribute1679276151891';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`roles\` set ('super-admin', 'user') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`roles\` enum ('super-admin', 'user') NOT NULL`,
    );
  }
}
