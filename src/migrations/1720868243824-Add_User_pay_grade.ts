import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPayGrade1720868243824 implements MigrationInterface {
    name = 'AddUserPayGrade1720868243824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`pay_grade\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`pay_grade\``);
    }

}
