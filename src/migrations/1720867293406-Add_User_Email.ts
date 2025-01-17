import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserEmail1720867293406 implements MigrationInterface {
    name = 'AddUserEmail1720867293406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    }

}
