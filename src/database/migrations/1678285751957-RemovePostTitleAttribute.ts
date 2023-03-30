import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovePostTitleAttribute1678285751957
  implements MigrationInterface
{
  name = 'RemovePostTitleAttribute1678285751957';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`local_file\` DROP FOREIGN KEY \`FK_1dc62b3a3dd9182d23a01bb0c31\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` CHANGE \`ownerId\` \`uploaderId\` varchar(255) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`title\``);
    await queryRunner.query(
      `ALTER TABLE \`local_file\` CHANGE \`uploaderId\` \`uploaderId\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` ADD CONSTRAINT \`FK_89db8ec91d69803e1c35e871742\` FOREIGN KEY (\`uploaderId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`local_file\` DROP FOREIGN KEY \`FK_89db8ec91d69803e1c35e871742\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` CHANGE \`uploaderId\` \`uploaderId\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`title\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` CHANGE \`uploaderId\` \`ownerId\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` ADD CONSTRAINT \`FK_1dc62b3a3dd9182d23a01bb0c31\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
