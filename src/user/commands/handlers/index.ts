import { CreateUserCommandHandler } from './create-user.handler';
import { VerifyCellNumberCommandHandler } from './verify-cell-number.handler';
import { ResendVerifyCellNumberCommandHandler } from './resend-verify-cell-number.handler';

export const userCommandHandlers = [
    CreateUserCommandHandler,
    VerifyCellNumberCommandHandler,
    ResendVerifyCellNumberCommandHandler
];
