import { ICommand } from '@nestjs/cqrs';
import { UserEntity } from '../../user.entity';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly partialUser: Partial<UserEntity>
  ) { }
}
