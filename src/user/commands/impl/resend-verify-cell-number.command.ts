import { ICommand } from '@nestjs/cqrs';
import { UserEntity } from 'user/user.entity';

export class ResendVerifyCellNumberCommand implements ICommand {
  constructor(
    public readonly partialUser: Partial<UserEntity>
  ) { }
}
