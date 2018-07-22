import { Entity, Column } from 'typeorm';

@Entity()
export class PostingLocationEntity {
  @Column({
    type: 'float',
    nullable: false,
    precision: 18
  })
  lat: number;

  @Column({
    type: 'float',
    nullable: false,
    precision: 18
  })
  long: number;
}
