import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserCreatUpdatedDate1720714553167 implements MigrationInterface {
    name = 'AddUserCreatUpdatedDate1720714553167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updated_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updated_date\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`created_date\``);
    }

}
