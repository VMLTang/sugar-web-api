import { IEvent } from '@nestjs/cqrs';
import { UserEntity } from '../../../user/user.entity';

export class BroadcastRequestEvent implements IEvent {
  constructor(
    public readonly requestId: number,
    public readonly consumerName: string,
    public readonly consumerCellNumber: string,
    public readonly producers: Array<Partial<UserEntity>>
  ) {}
}
