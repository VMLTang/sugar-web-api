import { ICommand } from '@nestjs/cqrs';
import { UserEntity } from '../../user.entity';

export class VerifyCellNumberCommand implements ICommand {
  constructor(
    public readonly partialUser: Partial<UserEntity>
  ) { }
}
