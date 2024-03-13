import { Body, Controller, Get, Post, Query, Redirect, Render, Res } from '@nestjs/common';
import { AttendeeService } from './attendee.service';
import { Attendee } from 'src/model/attendee.model';
import { AttendeeDto } from './dto/attendee.dto';
import { Response } from 'express';

@Controller('attendee')
export class AttendeeController {
    constructor(
        private readonly attendeeService : AttendeeService
    ){}

    @Get()
    @Render('login')
    async getAttendees(): Promise<Attendee[]>{
        return this.attendeeService.getAttendees()
                                                    .then();
    }

    @Get('/one')
    async getAttendee(@Query('code') code: string, @Res() res: Response): Promise<void> {
      const attendee = await this.attendeeService.getAttendee(code);
      
      if (attendee) {
        res.redirect('/index?attendee=' + encodeURIComponent(JSON.stringify(attendee)));
      } else {
        res.redirect('/');
      }
    }

    @Post()
    async addAttendee(@Body() dto: AttendeeDto): Promise<Attendee>{
        return this.attendeeService.addAttendee(dto)
    }

    @Get('validate')
    async validatePresence(@Query('presence') presence: string, @Query('code') code : string, @Res() res: Response){
      const attendee = this.attendeeService.validatePresence(code, presence);
        if (attendee) {
            res.redirect('/faire_part');
          } else {
            res.redirect('/');
          }    
        }
}
