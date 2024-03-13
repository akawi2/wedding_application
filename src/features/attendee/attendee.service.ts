import { Injectable } from '@nestjs/common';
import { Attendee } from 'src/model/attendee.model';
import { AttendeeDto } from './dto/attendee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AttendeeService {
    constructor(
        @InjectRepository(Attendee) private readonly attendeeRepository: Repository<Attendee>,
    ){}

    private generateOtp(length: number): string {
        const characters = '0123456789';
        let otp = '';

        for (let i = 0; i < length; i++) {
            otp += characters[Math.floor(Math.random() * characters.length)];
        }

        return otp;
    }

    async addAttendee(dto: AttendeeDto): Promise<Attendee>{
        const code = this.generateOtp(6)
        const attendee = new Attendee()

        attendee.code = code
        attendee.couple = dto.couple
        attendee.description = dto.description
        attendee.name = dto.name
        attendee.phoneNumber = dto.phoneNumber
        attendee.table_number = dto.table_number
        await this.attendeeRepository.save(attendee);
        return attendee
    }


    async validatePresence(code : string,presence: string): Promise<Attendee>{
        const attendee = await this.attendeeRepository.findOne({where: {code: code}});
        attendee.validate = presence
         await this.attendeeRepository.save(attendee);
        return attendee;
    }

    async getAttendees(): Promise<Attendee[]>{
        let attendees = []
        const attendeesGet = await this.attendeeRepository.find();
        if(attendeesGet){
            return attendeesGet
        }
        
        else{
        return attendees}
    }

    async getAttendee(code: string): Promise<Attendee>{
        const attendee = await this.attendeeRepository.findOne({where: {code: code}})
        return attendee
    }
}
