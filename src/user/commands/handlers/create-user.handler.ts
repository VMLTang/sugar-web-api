import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserCommand } from '../impl/create-user.command';
import { UserEntity } from '../../user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly eventPublisher: EventPublisher
  ) { }

  async execute(
    command: CreateUserCommand,
    resolve: (result: { error?: Error; user: UserEntity }) => void
  ) {
    let error: Error;
    let user: UserEntity;

    try {
      user = await this.userRepository.findOne({
        where: {
          cellNumber: command.partialUser.cellNumber
        }
      });

      if (!user) {
        user = this.eventPublisher.mergeObjectContext(
          this.userRepository.create(command.partialUser)
        );
        await this.userRepository.save(user);

        user.verifyCellNumber();
        user.commit();
      }
    } catch (err) {
      error = err;
    } finally {
      resolve({ error, user});
    }
  }
}
