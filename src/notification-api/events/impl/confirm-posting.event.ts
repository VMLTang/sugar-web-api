import { IEvent } from '@nestjs/cqrs';
import { PostingLocationEntity } from '../../../posting/posting-location.entity';
import { PostingType } from '../../../posting/posting-type.enum';

export class ConfirmPostingEvent implements IEvent {
  constructor(
    public readonly consumerCellNumber: string,
    public readonly consumerName: string,
    public readonly produceCellNumber: string,
    public readonly produceName: string,
    public readonly location: Partial<PostingLocationEntity>,
    public readonly time: Date,
    public readonly type: PostingType
  ) {}
}
