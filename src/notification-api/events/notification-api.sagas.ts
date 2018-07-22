import { Injectable } from '@nestjs/common';
import { EventObservable } from '@nestjs/cqrs';
import { map } from 'rxjs/operators';
import { VerifyCellNumberEvent } from './impl/verify-cell-number.event';
import { SendVerifyCellNumberCommand } from '../commands/impl/send-verify-cell-number.command';
import { ConfirmPostingEvent } from './impl/confirm-posting.event';
import { SendConfirmationCommand } from '../commands/impl/send-confirmation.command';
import { BroadcastRequestEvent } from './impl/broadcast-request.event';
import { SendBroadcastCommand } from '../commands/impl/send-broadcast.command';

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
