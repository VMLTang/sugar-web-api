import { ICommand } from '@nestjs/cqrs';
import { PostingEntity } from 'posting/posting.entity';

export class GrantPostingCommand implements ICommand {
  constructor(
    public readonly partialPosting: Partial<PostingEntity>
  ) {}
}
