import { HttpService, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendBroadcastCommand } from '../impl/send-broadcast.command';

@CommandHandler(SendBroadcastCommand)
export class SendBroadcastHandler
  implements ICommandHandler<SendBroadcastCommand> {

  constructor(
    @Inject('NotificationApiUrl')
    private readonly notificationApiUrl: string,
    private readonly httpService: HttpService
  ) { }

  async execute(
    command: SendBroadcastCommand,
    resolve: (result: { error?: Error }) => void
  ) {
    let error: Error;

    try {
      const url = `https://vmltang-sugar-web.azurewebsites.net/expo/${command.requestId}`;
      await this.httpService.post(
        `${this.notificationApiUrl}/smsserver/broadcastRequest`,
        {
          RequestUrl: url,
          ConsumerName: command.consumerName,
          Message: `${command.consumerName} in the Public exchange has a new request! Click here to help: ${url}`,
          PhoneNumbers: command.producers
            .filter(producer => producer.cellNumber !== command.consumerCellNumber)
            .map(producer => ({
              Name: producer.name,
              PhoneNumber: producer.cellNumber
            }))
        }
      ).toPromise();
    } catch (err) {
      error = err;
    } finally {
      resolve({ error });
    }
  }
}
