import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GrantPostingCommand } from '../impl/grant-posting.command';
import { PostingEntity } from '../../posting.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PostingStatus } from '../../posting-status.enum';

@CommandHandler(GrantPostingCommand)
export class GrantPostingCommandHandler
  implements ICommandHandler<GrantPostingCommand> {
  constructor(
    @InjectRepository(PostingEntity)
    private readonly postingRepository: Repository<PostingEntity>,
    private readonly eventPublisher: EventPublisher
  ) { }

  async execute(
    command: GrantPostingCommand,
    resolve: (result: { error?: Error; posting: PostingEntity }) => void
  ) {
    let error: Error;
    let posting: PostingEntity;

    try {
      const postings = await this.postingRepository.findByIds([ command.partialPosting.id ]);

      if (!postings || postings.length === 0) {
        throw new HttpException('Posting not found', HttpStatus.NOT_FOUND);
      }

      posting = this.eventPublisher.mergeObjectContext(postings[0]);
      posting.grantedBy = command.partialPosting.grantedBy;
      posting.pickupTime = command.partialPosting.pickupTime;
      posting.status = PostingStatus.COMPLETE;
      await this.postingRepository.save(posting);

      posting.grantPosting();
      posting.commit();
    } catch (err) {
      error = err;
    } finally {
      resolve({ error, posting});
    }
  }
}
