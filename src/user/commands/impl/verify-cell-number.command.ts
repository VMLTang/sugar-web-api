import { ICommand } from '@nestjs/cqrs';

export class VerifyCellNumberCommand implements ICommand {
  constructor(
    public readonly cellNumber: string
  ) { }
}
