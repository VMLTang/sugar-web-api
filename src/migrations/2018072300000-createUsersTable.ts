import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTokenTable2018072300000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'cellNumber',
            type: 'varchar',
            length: '20',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'name',
            type: 'varchar',
            length: '200',
            isNullable: false
          },
          {
            name: 'verified',
            type: 'tinyint',
            default: 0,
            isNullable: false
          },
          {
            name: 'createdAt',
            type: 'datetime2',
            isNullable: false
          },
          {
            name: 'updatedAt',
            type: 'datetime2',
            isNullable: false
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('users');
  }
}
