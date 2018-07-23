import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'user/user.entity';
import { PostingEntity } from 'posting/posting.entity';
import { PostingType } from 'posting/posting-type.enum';
import { CreatePostingCommand } from 'posting/commands/impl/create-posting.command';

@CommandHandler(CreatePostingCommand)
export class CreatePostingCommandHandler
  implements ICommandHandler<CreatePostingCommand> {
  constructor(
    @InjectRepository(PostingEntity)
    private readonly postingRepository: Repository<PostingEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
      await this.postingRepository.save(posting);

      if (command.partialPosting.type === PostingType.REQUEST) {
        const users = await this.userRepository.find();
        const postingEntity = this.eventPublisher.mergeObjectContext(
          (await this.postingRepository.findByIds([posting.id], {
            loadEagerRelations: true
          }))[0]
        );
        postingEntity.broadcastRequest(users);
        postingEntity.commit();
      }
    } catch (err) {
      error = err;
    } finally {
      resolve({ error, posting});
    }
  }
}
