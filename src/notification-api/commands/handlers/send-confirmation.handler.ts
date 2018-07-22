import { HttpService, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendConfirmationCommand } from '../impl/send-confirmation.command';

@CommandHandler(SendConfirmationCommand)
export class SendConfirmationCommandHandler
  implements ICommandHandler<SendConfirmationCommand> {

  constructor(
    @Inject('NotificationApiUrl')
    private readonly notificationApiUrl: string,
    private readonly httpService: HttpService
  ) { }

  async execute(
    command: SendConfirmationCommand,
    resolve: (result: { error?: Error }) => void
  ) {
    let error: Error;

    try {
      const dateTime = new Date(command.time);
      let hours = dateTime.getHours();
      const minutes = dateTime.getMinutes();
      const amPm = hours >= 12 ? 'PM' : 'AM';
      hours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;

      await this.httpService.post(
        `${this.notificationApiUrl}/smsserver/meetingConfirm`,
        {
          ConsumerPhoneNumber: command.consumerCellNumber,
          ConsumerName: command.consumerName,
          ProducerPhoneNumber: command.produceCellNumber,
          ProducerName: command.produceName,
          Location: command.location.description,
          Time: `${('0' + hours.toString()).slice(-2)}:${('0' + minutes.toString()).slice(-2)} ${amPm}`,
          Type: command.type
        }
      ).toPromise();
    } catch (err) {
      error = err;
    } finally {
      resolve({ error });
    }
  }
}
