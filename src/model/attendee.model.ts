import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Attendee')
export class Attendee{
    @PrimaryColumn({unique: true})
    code : string;

    @Column()
    name : string;
    
    @Column()
    couple : boolean;

    @Column()
    phoneNumber : string;

    @Column()
    description : string;

    @Column()
    table_number : number;

    @Column({nullable: true})
    validate : string; 

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    created_at : Date;

}

// export enum Presence{
//     OUINOUS = 'OUI NOUS SERONS LA',
//     OUI = 'OUI',
//     MON = 'NON',
// }