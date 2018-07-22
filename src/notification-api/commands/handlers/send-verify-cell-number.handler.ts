import { HttpService, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendVerifyCellNumberCommand } from '../impl/send-verify-cell-number.command';

@CommandHandler(SendVerifyCellNumberCommand)
export class SendVerifyCellNumberCommandHandler
  implements ICommandHandler<SendVerifyCellNumberCommand> {

  constructor(
    @Inject('NotificationApiUrl')
    private readonly notificationApiUrl: string,
    private readonly httpService: HttpService
  ) { }

  async execute(
    command: SendVerifyCellNumberCommand,
    resolve: (result: { error?: Error }) => void
  ) {
    let error: Error;

    try {
      await this.httpService.post(
        `${this.notificationApiUrl}/smsserver/verify`,
        {
          PhoneNumber: command.cellNumber
        }
      ).toPromise();
    } catch (err) {
      error = err;
    } finally {
      resolve({ error });
    }
  }
}
