import { Module } from '@nestjs/common';
import { AttendeeModule } from './features/attendee/attendee.module';
import { VoteModule } from './features/vote/vote.module';
import { PageModule } from './features/page/page.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Attendee } from './model/attendee.model';
import { PageState } from './model/page.model';
import { Vote } from './model/vote.model';
import { AppController } from './app.controller';

@Module({

  imports: [AttendeeModule, VoteModule, PageModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      password: process.env.PASSWORD,
      username: "postgres.kmfcmmnvxmufbuohggag",
      entities: [Attendee, PageState, Vote],
      database: process.env.DATABASE,
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
