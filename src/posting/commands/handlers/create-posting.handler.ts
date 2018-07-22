import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostingCommand } from '../impl/create-posting.command';
import { PostingEntity } from '../../posting.entity';

@CommandHandler(CreatePostingCommand)
export class CreatePostingCommandHandler
  implements ICommandHandler<CreatePostingCommand> {
  constructor(
    @InjectRepository(PostingEntity)
    private readonly postingRepository: Repository<PostingEntity>,
    private readonly eventPublisher: EventPublisher
  ) { }

  async execute(
    command: CreatePostingCommand,
    resolve: (result: { error?: Error; posting: PostingEntity }) => void
  ) {
    let error: Error;
    let posting: PostingEntity;

    try {
      posting = this.eventPublisher.mergeObjectContext(
        this.postingRepository.create(command.partialPosting)
      );
      console.log(posting)
      await this.postingRepository.save(posting);
    } catch (err) {
      error = err;
    } finally {
      resolve({ error, posting});
    }
  }
}
