import { Injectable } from '@nestjs/common';
import { EventObservable } from '@nestjs/cqrs';
import { map } from 'rxjs/operators';
import { SendVerifyCellNumberCommand } from 'notification-api/commands/impl/send-verify-cell-number.command';
import { SendConfirmationCommand } from 'notification-api/commands/impl/send-confirmation.command';
import { SendBroadcastCommand } from 'notification-api/commands/impl/send-broadcast.command';
import { BroadcastRequestEvent } from 'notification-api/events/impl/broadcast-request.event';
import { VerifyCellNumberEvent } from 'notification-api/events/impl/verify-cell-number.event';
import { ConfirmPostingEvent } from 'notification-api/events/impl/confirm-posting.event';

@Injectable()
export class NotificationApiSagas {
  public verifyCellNumber(events$: EventObservable<any>) {
    return events$
      .ofType(VerifyCellNumberEvent)
      .pipe(
        map((event: VerifyCellNumberEvent) => new SendVerifyCellNumberCommand(event.cellNumber))
      );
  }

  public confirmPosting(events$: EventObservable<any>) {
    return events$
      .ofType(ConfirmPostingEvent)
      .pipe(
        map((event: ConfirmPostingEvent) => new SendConfirmationCommand(
          event.consumerCellNumber,
          event.consumerName,
          event.produceCellNumber,
          event.produceName,
          event.location,
          event.time,
          event.type
        ))
      );
  }

  public broadcastRequest(events$: EventObservable<any>) {
    return events$
      .ofType(BroadcastRequestEvent)
      .pipe(
        map((event: BroadcastRequestEvent) => new SendBroadcastCommand(
          event.requestId,
          event.consumerName,
          event.consumerCellNumber,
          event.producers
        ))
      );
  }
}
