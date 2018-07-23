import { SendVerifyCellNumberCommandHandler } from 'notification-api/commands/handlers/send-verify-cell-number.handler';
import { SendConfirmationCommandHandler } from 'notification-api/commands/handlers/send-confirmation.handler';
import { SendBroadcastHandler } from 'notification-api/commands/handlers/send-broadcast.handler';

export const notificationApiCommandHandlers = [
    SendVerifyCellNumberCommandHandler,
    SendConfirmationCommandHandler,
    SendBroadcastHandler
];
