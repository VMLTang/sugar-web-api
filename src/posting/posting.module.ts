import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CQRSModule, CommandBus } from '@nestjs/cqrs';
import { PostingEntity } from 'posting/posting.entity';
import { PostingController } from 'posting/posting.controller';
import { postingCommandHandlers } from 'posting/commands/handlers';
import { PostingService } from 'posting/posting.service';
import { UserEntity } from 'user/user.entity';

@Module({
  imports: [
    CQRSModule,
    TypeOrmModule.forFeature([PostingEntity, UserEntity])
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
