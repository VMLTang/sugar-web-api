import { AggregateRoot } from '@nestjs/cqrs';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { PostingType } from './posting-type.enum';
import { PostingStatus } from './posting-status.enum';
import { UserEntity } from '../user/user.entity';
import { PostingContentEntity } from './posting-content.entity';
import { PostingLocationEntity } from './posting-location.entity';
import { ConfirmPostingEvent } from '../notification-api/events/impl/confirm-posting.event';
import { BroadcastRequestEvent } from '../notification-api/events/impl/broadcast-request.event';

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
    nullable: false,
    default: 'PENDING'
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
    nullable: true
  })
  closedAt: Date;

  @Column(() => PostingContentEntity)
  content: PostingContentEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, {
    nullable: false,
    eager: true
  })
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, {
    nullable: true,
    eager: true
  })
  grantedBy: UserEntity;

  grantPosting() {
    if (this.type === PostingType.OFFER) {
      this.apply(
        new ConfirmPostingEvent(
          this.grantedBy.cellNumber,
          this.grantedBy.name,
          this.createdBy.cellNumber,
          this.createdBy.name,
          this.pickupLocation,
          this.pickupTime,
          this.type
        )
      );
    } else {
      this.apply(
        new ConfirmPostingEvent(
          this.createdBy.cellNumber,
          this.createdBy.name,
          this.grantedBy.cellNumber,
          this.grantedBy.name,
          this.pickupLocation,
          this.pickupTime,
          this.type
        )
      );
    }
  }

  broadcastRequest(users: UserEntity[]) {
    this.apply(
      new BroadcastRequestEvent(
        this.id,
        this.createdBy.name,
        this.createdBy.cellNumber,
        users
      )
    );
  }
}
