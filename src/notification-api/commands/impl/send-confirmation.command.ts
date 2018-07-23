import { ICommand } from '@nestjs/cqrs';
import { PostingType } from 'posting/posting-type.enum';
import { PostingLocationEntity } from 'posting/posting-location.entity';

export class SendConfirmationCommand implements ICommand {
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
