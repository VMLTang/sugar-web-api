import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: '20'
  })
  cellNumber: string;

  @Column({
    type: 'varchar'
  })
  emailAddress: string;

  @Column({
    type: 'text'
  })
  oktaId: string;
}
