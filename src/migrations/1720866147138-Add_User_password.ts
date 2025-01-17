import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPassword1720866147138 implements MigrationInterface {
    name = 'AddUserPassword1720866147138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    }

}
