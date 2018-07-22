import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CQRSModule } from '@nestjs/cqrs';
import { PostingEntity } from './posting.entity';
import { PostingController } from './posting.controller';

@Module({
  imports: [
    CQRSModule,
    TypeOrmModule.forFeature([PostingEntity])
  ],
  controllers: [
    PostingController
  ]
})
export class PostingModule {
}
