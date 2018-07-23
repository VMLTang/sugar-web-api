import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'user/user.entity';
import { ResendVerifyCellNumberCommand } from 'user/commands/impl/resend-verify-cell-number.command';

@CommandHandler(ResendVerifyCellNumberCommand)
export class ResendVerifyCellNumberCommandHandler
  implements ICommandHandler<ResendVerifyCellNumberCommand> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly eventPublisher: EventPublisher
  ) { }

  async execute(
    command: ResendVerifyCellNumberCommand,
    resolve: (result: { error?: Error }) => void
  ) {
    let error: Error;

    try {
      let user = await this.userRepository.findOne({
        where: command.partialUser
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (!user.verified) {
        user = this.eventPublisher.mergeObjectContext(user);
        user.verifyCellNumber();
        user.commit();
      }
    } catch (err) {
      error = err;
    } finally {
      resolve({ error });
    }
  }
}
