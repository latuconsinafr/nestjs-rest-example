import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablesCascade1678096726170 implements MigrationInterface {
  name = 'AlterTablesCascade1678096726170';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` DROP FOREIGN KEY \`FK_3f24071759ec6354b0259f9c4d1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` DROP FOREIGN KEY \`FK_1dc62b3a3dd9182d23a01bb0c31\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_c6fb082a3114f35d0cc27c518e0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD CONSTRAINT \`FK_3f24071759ec6354b0259f9c4d1\` FOREIGN KEY (\`avatarFileId\`) REFERENCES \`local_file\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` ADD CONSTRAINT \`FK_1dc62b3a3dd9182d23a01bb0c31\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_c6fb082a3114f35d0cc27c518e0\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_c6fb082a3114f35d0cc27c518e0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` DROP FOREIGN KEY \`FK_1dc62b3a3dd9182d23a01bb0c31\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` DROP FOREIGN KEY \`FK_3f24071759ec6354b0259f9c4d1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_c6fb082a3114f35d0cc27c518e0\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`local_file\` ADD CONSTRAINT \`FK_1dc62b3a3dd9182d23a01bb0c31\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD CONSTRAINT \`FK_3f24071759ec6354b0259f9c4d1\` FOREIGN KEY (\`avatarFileId\`) REFERENCES \`local_file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
