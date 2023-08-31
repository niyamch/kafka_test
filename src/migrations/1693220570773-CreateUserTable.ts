import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1693220570773 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "user" (
      "id" serial PRIMARY KEY,
	    "first_name" VARCHAR ( 64 ) NOT NULL,
	    "last_name" VARCHAR ( 64 ) NOT NULL,
	    "birthday" TIMESTAMP  WITHOUT TIME ZONE NOT NULL,
	    "created_on" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	    "updated_on" TIMESTAMP WITHOUT TIME ZONE NOT NULL
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user`);
  }
}
