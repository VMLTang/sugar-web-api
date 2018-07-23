import { CreateUserCommandHandler } from 'user/commands/handlers/create-user.handler';
import { VerifyCellNumberCommandHandler } from 'user/commands/handlers/verify-cell-number.handler';
import { ResendVerifyCellNumberCommandHandler } from 'user/commands/handlers/resend-verify-cell-number.handler';

export const userCommandHandlers = [
    CreateUserCommandHandler,
    VerifyCellNumberCommandHandler,
    ResendVerifyCellNumberCommandHandler
];
