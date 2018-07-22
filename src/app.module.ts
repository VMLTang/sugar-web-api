import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { NotificationApiModule } from './notification-api/notification-api.module';
import { UserEntity } from './user/user.entity';
import { PostingEntity } from './posting/posting.entity';
import { PostingModule } from './posting/posting.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'vmltang-sugar-db.database.windows.net',
      port: 1433,
      username: 'rootadmin',
      password: 'OP()op90',
      database: 'vmltang-sugar',
      entities: [
        UserEntity,
        PostingEntity
      ],
      options: {
        encrypt: true
      },
      synchronize: true
    }),
    NotificationApiModule,
    UserModule,
    PostingModule
  ]
})
export class AppModule {}
