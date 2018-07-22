import { AggregateRoot } from '@nestjs/cqrs';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { PostingType } from './posting-type.enum';
import { PostingStatus } from './posting-status.enum';
import { UserEntity } from '../user/user.entity';
import { PostingContentEntity } from './posting-content.entity';
import { PostingLocationEntity } from './posting-location.entity';

@Entity()
export class PostingEntity extends AggregateRoot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false
  })
  type: PostingType;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false
  })
  status: PostingStatus;

  @Column(() => PostingLocationEntity)
  pickupLocation: PostingLocationEntity;

  @Column({
    type: 'datetime',
    nullable: true
  })
  pickupTime: Date;

  @Column({
    type: 'datetime',
    nullable: false
  })
  expiresAt: Date;

  @Column({
    type: 'datetime',
    nullable: false
  })
  closedAt: Date;

  @Column(() => PostingContentEntity)
  content: PostingContentEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, {
    nullable: false
  })
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, {
    nullable: true
  })
  grantedBy: UserEntity;
}
