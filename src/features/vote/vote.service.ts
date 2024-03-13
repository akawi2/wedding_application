import { Injectable } from '@nestjs/common';
import { VoteDto } from './dto/vote.dto';
import { Vote, choice } from 'src/model/vote.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageState } from 'src/model/page.model';
import { VoteResponse } from './response/voteResponse.response';

@Injectable()
export class VoteService {
    constructor(
        @InjectRepository(Vote) private readonly voteRepository: Repository<Vote>,
        @InjectRepository(PageState) private readonly pageRepository: Repository<PageState> 
    ){}

    async addVote(dto : VoteDto): Promise<Vote>{
        const findVote = await this.voteRepository.findOne({where: {code: dto.code}})
        if(!findVote){
        const vote = await this.voteRepository.save(dto)
        return vote;
        }

        else{
            findVote.choice = dto.choice
            const voteChanged =  await this.voteRepository.save(findVote)
            return voteChanged;
        }
    }

    async getPageState(){
        const page= await this.pageRepository.findOne({where:{id: 1}})
        return page.state
    }

    async getResults() : Promise<VoteResponse>{
        const votes = await this.voteRepository.find()
        const response = new VoteResponse()
        let FILLES = 0
        let GARCONS = 0
        for (var i of votes){
            if(i.choice == choice.GARCONS){
                GARCONS +=1;
            }
            else if(i.choice == choice.FILLES){
                FILLES +=1;
            }
        }  
        if(GARCONS > FILLES){
            response.gtitle = "VAINQUEUR";
            response.gcount = GARCONS;
            response.ftitle = "DEUXIEME PLACE"
            response.fcount = FILLES
            console.log(response)
            return response
        }
        else if(FILLES > GARCONS){
            response.ftitle = "VAINQUEUR";
            response.fcount = FILLES;
            response.gtitle = "DEUXIEME PLACE"
            response.gcount = GARCONS   
            return response
 
        }
        else{
            response.gtitle = "VAINQUEUR";
            response.gcount = GARCONS;
            response.ftitle = "VAINQUEUR"
            response.fcount = FILLES
            return response

        }
               
    }

}
