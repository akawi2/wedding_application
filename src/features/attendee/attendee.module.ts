import { Module } from '@nestjs/common';
import { AttendeeService } from './attendee.service';
import { AttendeeController } from './attendee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendee } from 'src/model/attendee.model';

@Module({
  providers: [AttendeeService],
  controllers: [AttendeeController],
  imports: [
    TypeOrmModule.forFeature([
      Attendee
    ])
  ]
})
export class AttendeeModule {}
