import { AggregateRoot } from '@nestjs/cqrs';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { VerifyCellNumberEvent } from 'notification-api/events/impl/verify-cell-number.event';

@Entity()
export class UserEntity extends AggregateRoot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    unique: true
  })
  cellNumber: string;

  @Column({
    type: 'varchar',
    length: '200',
    nullable: false
  })
  name: string;

  @Column({
    type: 'tinyint',
    default: 0,
    nullable: false
  })
  verified: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  public verifyCellNumber() {
    this.apply(new VerifyCellNumberEvent(this.cellNumber));
  }
}
