import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreatePostingsTokenTable2018072300001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'postings',
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
            name: 'type',
            type: 'varchar',
            length: '20',
            isNullable: false
          },
          {
            name: 'status',
            type: 'varchar',
            length: '20',
            isNullable: false
          },
          {
            name: 'pickupLocationLatitude',
            type: 'float',
            precision: 18,
            isNullable: false
          },
          {
            name: 'pickupLocationLongitude',
            type: 'float',
            precision: 18,
            isNullable: false
          },
          {
            name: 'pickupLocationDescription',
            type: 'text',
            isNullable: false
          },
          {
            name: 'pickupTime',
            type: 'datetime',
            isNullable: true
          },
          {
            name: 'expiresAt',
            type: 'datetime',
            isNullable: false
          },
          {
            name: 'closedAt',
            type: 'datetime',
            isNullable: false
          },
          {
            name: 'contentMessage',
            type: 'text',
            isNullable: false
          },
          {
            name: 'contentItem',
            type: 'text',
            isNullable: false
          },
          {
            name: 'contentQuantity',
            type: 'int',
            isNullable: true
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
          },
          {
            name: 'createdById',
            type: 'bigint',
            isNullable: false
          },
          {
            name: 'grantedById',
            type: 'bigint',
            isNullable: true
          }
        ]
      })
    );
    await queryRunner.createForeignKeys('postings', [
      new TableForeignKey({
        name: 'FK_POSTINGS_USERS_CREATED_BY_ID',
        columnNames: ['createdById'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users'
      }),
      new TableForeignKey({
        name: 'FK_POSTINGS_USERS_GRANTED_BY_ID',
        columnNames: ['grantedById'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users'
      })
    ]);
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.dropForeignKey('postings', 'FK_POSTINGS_USERS_CREATED_BY_ID');
    await queryRunner.dropForeignKey('postings', 'FK_POSTINGS_USERS_GRANTED_BY_ID');
    await queryRunner.dropTable('postings');
  }
}
