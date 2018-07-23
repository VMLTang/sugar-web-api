import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'user/user.module';
import { NotificationApiModule } from 'notification-api/notification-api.module';
import { UserEntity } from 'user/user.entity';
import { PostingEntity } from 'posting/posting.entity';
import { PostingModule } from 'posting/posting.module';
import { environment } from 'shared/config/environment';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      url: environment.mssql_url,
      entities: [
        UserEntity,
        PostingEntity
      ],
      options: {
        encrypt: true
      }
    }),
    NotificationApiModule,
    UserModule,
    PostingModule
  ]
})
export class AppModule {}
