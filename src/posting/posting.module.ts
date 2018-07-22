import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CQRSModule, CommandBus } from '@nestjs/cqrs';
import { PostingEntity } from './posting.entity';
import { PostingController } from './posting.controller';
import { postingCommandHandlers } from './commands/handlers';
import { ModuleRef } from '@nestjs/core';
import { PostingService } from './posting.service';

@Module({
  imports: [
    CQRSModule,
    TypeOrmModule.forFeature([PostingEntity])
  ],
  providers: [
    PostingService,
    ...postingCommandHandlers
  ],
  controllers: [
    PostingController
  ]
})
export class PostingModule implements OnModuleInit {
  public constructor(
    private readonly moduleRef: ModuleRef,
    private readonly commandBus: CommandBus
  ) { }

  public onModuleInit() {
    this.commandBus.setModuleRef(this.moduleRef);
    this.commandBus.register(postingCommandHandlers);
  }
}
