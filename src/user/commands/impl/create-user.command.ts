import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly cellNumber: string,
    public readonly name: string
  ) { }
}
