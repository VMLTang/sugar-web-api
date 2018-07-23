import { ICommand } from '@nestjs/cqrs';
import { PostingEntity } from 'posting/posting.entity';

export class CreatePostingCommand implements ICommand {
  constructor(
    public readonly partialPosting: Partial<PostingEntity>
  ) {}
}
