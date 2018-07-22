import { Injectable } from '@nestjs/common';
import { EventObservable } from '@nestjs/cqrs';
import { map } from 'rxjs/operators';
import { VerifyCellNumberEvent } from './impl/verify-cell-number.event';
import { SendVerifyCellNumberCommand } from '../commands/impl/send-verify-cell-number.command';

@Injectable()
export class NotificationApiSagas {
  public verifyCellNumber(events$: EventObservable<any>) {
    return events$
      .ofType(VerifyCellNumberEvent)
      .pipe(
        map((event: VerifyCellNumberEvent) => new SendVerifyCellNumberCommand(event.cellNumber))
      );
  }
}
