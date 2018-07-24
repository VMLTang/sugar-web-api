import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from 'user/user.module';
import { NotificationApiModule } from 'notification-api/notification-api.module';
import { UserEntity } from 'user/user.entity';
import { PostingEntity } from 'posting/posting.entity';
import { PostingModule } from 'posting/posting.module';
import { environment } from 'shared/config/environment';
import { CreateUsersTokenTable2018072300000 } from 'migrations/2018072300000-createUsersTable';
import { CreatePostingsTokenTable2018072300001 } from 'migrations/2018072300001-createPostingsTable';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      url: environment.mssql_url,
      entities: [
        UserEntity,
        PostingEntity
      ],
      migrations: [
        CreateUsersTokenTable2018072300000,
        CreatePostingsTokenTable2018072300001
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
export class AppModule implements OnModuleInit {
  constructor(
    private readonly connection: Connection
  ) {}

  async onModuleInit() {
    try {
      await this.connection.runMigrations();
    } catch (error) {
      console.log(error);
    }
  }
}
