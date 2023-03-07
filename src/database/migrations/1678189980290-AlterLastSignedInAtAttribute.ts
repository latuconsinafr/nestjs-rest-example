import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterLastSignedInAtAttribute1678189980290
  implements MigrationInterface
{
  name = 'AlterLastSignedInAtAttribute1678189980290';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`lastSignedInAt\` datetime(6) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`lastSignedInAt\``,
    );
  }
}
