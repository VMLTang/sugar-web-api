import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CQRSModule, CommandBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'user/user.entity';
import { UserController } from 'user/user.controller';
import { UserService } from 'user/user.service';
import { userCommandHandlers } from 'user/commands/handlers';

@Module({
  imports: [
    CQRSModule,
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [
    ...userCommandHandlers,
    UserService,
  ],
  controllers: [
    UserController
  ]
})
export class UserModule implements OnModuleInit {
  public constructor(
    private readonly moduleRef: ModuleRef,
    private readonly commandBus: CommandBus
  ) { }

  public onModuleInit() {
    this.commandBus.setModuleRef(this.moduleRef);
    this.commandBus.register(userCommandHandlers);
  }
}
