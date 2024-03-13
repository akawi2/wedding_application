import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Attendee } from "./attendee.model";

@Entity('Vote')
export class Vote{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=> Attendee)
    @JoinColumn({name: "code"})
    code : number;

    @Column({nullable: true})
    choice : choice
}

export enum choice{
    GARCONS = 'GARCONS',
    FILLES = "FILLES",
}