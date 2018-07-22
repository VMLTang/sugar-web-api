import { OnModuleInit, Module, HttpModule } from '@nestjs/common';
import { CQRSModule, EventBus, CommandBus } from '@nestjs/cqrs';
import { notificationApiCommandHandlers } from './commands/handlers';
import { ModuleRef } from '@nestjs/core';
import { NotificationApiSagas } from './events/notification-api.sagas';

@Module({
  imports: [
    CQRSModule,
    HttpModule
  ],
  providers: [
    {
      provide: 'NotificationApiUrl',
      useValue: 'https://sugarnotificationapi.azurewebsites.net'
    },
    ...notificationApiCommandHandlers,
    NotificationApiSagas
  ]
})
export class NotificationApiModule implements OnModuleInit {
  public constructor(
    private readonly moduleRef: ModuleRef,
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
    private readonly notificationApiSagas: NotificationApiSagas
  ) { }

  public onModuleInit() {
    this.commandBus.setModuleRef(this.moduleRef);
    this.commandBus.register(notificationApiCommandHandlers);
    this.eventBus.setModuleRef(this.moduleRef);
    this.eventBus.combineSagas([
      this.notificationApiSagas.verifyCellNumber.bind(this.notificationApiSagas),
      this.notificationApiSagas.confirmPosting.bind(this.notificationApiSagas),
      this.notificationApiSagas.broadcastRequest.bind(this.notificationApiSagas)
    ]);
  }
}
