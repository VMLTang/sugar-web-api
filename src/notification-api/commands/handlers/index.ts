import { SendVerifyCellNumberCommandHandler } from './send-verify-cell-number.handler';
import { SendConfirmationCommandHandler } from './send-confirmation.handler';
import { SendBroadcastHandler } from './send-broadcast.handler';

export const notificationApiCommandHandlers = [
    SendVerifyCellNumberCommandHandler,
    SendConfirmationCommandHandler,
    SendBroadcastHandler
];
