import { IsNotEmpty } from 'class-validator';

export class VoteResponse{
    @IsNotEmpty()
    gcount : number;
    @IsNotEmpty()
    fcount : number;
    @IsNotEmpty()
    gtitle : string;
    @IsNotEmpty()
    ftitle : string;
}