import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';

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
        UserEntity
      ],
      options: {
        encrypt: true
      },
      synchronize: true
    }),
    UserModule
  ]
})
export class AppModule {}
