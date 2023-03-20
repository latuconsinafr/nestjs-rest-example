import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTopicTable1678958507781 implements MigrationInterface {
  name = 'AddTopicTable1678958507781';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`topic\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_15f634a2dbf62a79bb726fc615\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`posts_topics\` (\`postId\` varchar(36) NOT NULL, \`topicId\` varchar(36) NOT NULL, INDEX \`IDX_c7456e05d41b3df071726b7084\` (\`postId\`), INDEX \`IDX_7c5dca0db8653a4c4efa3974a3\` (\`topicId\`), PRIMARY KEY (\`postId\`, \`topicId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`category\``);
    await queryRunner.query(
      `ALTER TABLE \`posts_topics\` ADD CONSTRAINT \`FK_c7456e05d41b3df071726b7084a\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts_topics\` ADD CONSTRAINT \`FK_7c5dca0db8653a4c4efa3974a37\` FOREIGN KEY (\`topicId\`) REFERENCES \`topic\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts_topics\` DROP FOREIGN KEY \`FK_7c5dca0db8653a4c4efa3974a37\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts_topics\` DROP FOREIGN KEY \`FK_c7456e05d41b3df071726b7084a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`category\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_7c5dca0db8653a4c4efa3974a3\` ON \`posts_topics\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c7456e05d41b3df071726b7084\` ON \`posts_topics\``,
    );
    await queryRunner.query(`DROP TABLE \`posts_topics\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_15f634a2dbf62a79bb726fc615\` ON \`topic\``,
    );
    await queryRunner.query(`DROP TABLE \`topic\``);
  }
}
