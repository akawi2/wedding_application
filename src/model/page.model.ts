import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('PageState')
export class PageState{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    page: string

    @Column()
    state: State

}

export enum State{
    NOACCESS = "NOACCESS",
    VOTE = "VOTE",
    RESULTS = "RESULTS"
}