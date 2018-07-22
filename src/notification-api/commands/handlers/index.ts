import { SendVerifyCellNumberCommandHandler } from './send-verify-cell-number.handler';
import { SendConfirmationCommandHandler } from './send-confirmation.handler';

export const notificationApiCommandHandlers = [
    SendVerifyCellNumberCommandHandler,
    SendConfirmationCommandHandler
];
