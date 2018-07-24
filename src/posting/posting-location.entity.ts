import { Entity, Column } from 'typeorm';

@Entity()
export class PostingLocationEntity {
  @Column({
    type: 'float',
    nullable: false,
    precision: 18
  })
  latitude: number;

  @Column({
    type: 'float',
    nullable: false,
    precision: 18
  })
  longitude: number;

  @Column({
    type: 'text',
    nullable: false
  })
  description: string;
}
