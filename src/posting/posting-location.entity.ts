import { AggregateRoot } from '@nestjs/cqrs';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PostingLocationEntity extends AggregateRoot {
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
