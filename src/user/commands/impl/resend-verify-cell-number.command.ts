import { ICommand } from '@nestjs/cqrs';

export class ResendVerifyCellNumberCommand implements ICommand {
  constructor(
    public readonly cellNumber: string
  ) { }
}
