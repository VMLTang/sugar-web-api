import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user.entity';
import { VerifyCellNumberCommand } from '../impl/verify-cell-number.command';

@CommandHandler(VerifyCellNumberCommand)
export class VerifyCellNumberCommandHandler
  implements ICommandHandler<VerifyCellNumberCommand> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async execute(
    command: VerifyCellNumberCommand,
    resolve: (result: { error?: Error }) => void
  ) {
    let error: Error;

    try {
      const user = await this.userRepository.findOne({
        where: command
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      user.verified = 1;
      await this.userRepository.save(user);
    } catch (err) {
      error = err;
    } finally {
      resolve({ error });
    }
  }
}
