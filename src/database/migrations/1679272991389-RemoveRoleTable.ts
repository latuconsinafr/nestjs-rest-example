import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveRoleTable1679272991389 implements MigrationInterface {
  name = 'RemoveRoleTable1679272991389';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`roles\` enum ('super-admin', 'user') NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE \`users_roles\``);
    await queryRunner.query(`DROP TABLE \`role\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users_roles\` (\`userId\` int NOT NULL, \`roleId\` int NOT NULL, INDEX \`IDX_776b7cf9330802e5ef5a8fb18d\` (\`userId\`), INDEX \`IDX_4fb14631257670efa14b15a3d8\` (\`roleId\`), PRIMARY KEY (\`userId\`, \`roleId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD \`name\` enum ('super-admin', 'user') NOT NULL`,
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
      `CREATE INDEX \`IDX_776b7cf9330802e5ef5a8fb18d\` ON \`users_roles\` (\`userId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_4fb14631257670efa14b15a3d8\` ON \`users_roles\` (\`roleId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_776b7cf9330802e5ef5a8fb18dc\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_4fb14631257670efa14b15a3d86\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
  }
}
