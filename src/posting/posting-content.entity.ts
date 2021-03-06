import { Entity, Column } from 'typeorm';

@Entity()
export class PostingContentEntity {
  @Column({
    type: 'text',
    nullable: false
  })
  message: string;

  @Column({
    type: 'text',
    nullable: false
  })
  item: string;

  @Column({
    type: 'int',
    nullable: true
  })
  quantity: number;
}
