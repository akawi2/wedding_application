import { Controller,Post,Body,Get,Res,Render, Query, Redirect } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteDto } from './dto/vote.dto';
import { Vote, choice } from 'src/model/vote.model';
import { State } from 'src/model/page.model';
import { Response } from 'express';
import { stat } from 'fs';

@Controller('vote')
export class VoteController {
    constructor(
        private readonly voteService: VoteService
    ){}    
    
    
    @Post()
    async addVote(@Body() voteDto: VoteDto, @Query('code') code : number, @Res() res: Response){

        const vote = this.voteService.addVote(voteDto)
        if(vote){
            res.redirect('/rwait')
        }
    }


@Get('/')
async getBattleResults(@Query('code') code: string, @Res() res: Response): Promise<any> {
  const state = await this.voteService.getPageState();
  
  if (state === State.RESULTS) {
    const result = await this.voteService.getResults();
    if(result){
    console.log(result)
    
    res.redirect('/results?results=' + encodeURIComponent(JSON.stringify(result)));
        }
        else{
            res.redirect('/waiting')
        }
  } else if(state === State.VOTE){
    res.redirect('/battle?code='+ encodeURIComponent(code));
  }
  else{
    res.redirect('waiting');
  }

}

@Get('test')
async getTest(@Res() res: Response): Promise<any> {

      const result = this.voteService.getResults();
      console.log(result)
      return result
    
  }



}
