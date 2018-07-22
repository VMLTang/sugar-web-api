import { AggregateRoot } from '@nestjs/cqrs';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PostingLocationEntity {
  @Column({
    type: 'decimal',
    nullable: false
  })
  lat: number;

  @Column({
    type: 'decimal',
    nullable: false
  })
  long: number;
}