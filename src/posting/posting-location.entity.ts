import { Entity, Column } from 'typeorm';

@Entity()
export class PostingLocationEntity {
  @Column({
    type: 'float',
    nullable: false,
    precision: 18
  })
  lat: string;

  @Column({
    type: 'float',
    nullable: false,
    precision: 18
  })
  long: string;
}
