import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterPhoneAttributeUniqueness1676900183425 implements MigrationInterface {
    name = 'AlterPhoneAttributeUniqueness1676900183425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_3f24071759ec6354b0259f9c4d\` ON \`user_profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_f44d0cd18cfd80b0fed7806c3b\` ON \`user_profile\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_8e1f623798118e629b46a9e629\` (\`phone\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_8e1f623798118e629b46a9e629\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_f44d0cd18cfd80b0fed7806c3b\` ON \`user_profile\` (\`id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_3f24071759ec6354b0259f9c4d\` ON \`user_profile\` (\`avatarFileId\`)`);
    }

}
