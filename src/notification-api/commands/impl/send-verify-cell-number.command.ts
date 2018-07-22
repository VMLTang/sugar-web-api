import { ICommand } from '@nestjs/cqrs';

export class SendVerifyCellNumberCommand implements ICommand {
    constructor(
        public readonly cellNumber: string
    ) {}
}
