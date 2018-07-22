import { IEvent } from '@nestjs/cqrs';

export class VerifyCellNumberEvent implements IEvent {
    constructor(
        public readonly cellNumber: string
    ) {}
}
