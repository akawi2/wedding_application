import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from 'src/model/vote.model';
import { Attendee } from 'src/model/attendee.model';
import { PageState } from 'src/model/page.model';

@Module({
  providers: [VoteService],
  controllers: [VoteController],
  imports: [
    TypeOrmModule.forFeature([
      Vote, Attendee, PageState
    ])
  ]
})
export class VoteModule {}
