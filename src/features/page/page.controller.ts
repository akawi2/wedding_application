import { Controller, Get, Res } from '@nestjs/common';
import { PageService } from './page.service';
import { State } from 'src/model/page.model';
import { Response } from 'express';

@Controller('page')
export class PageController {
    constructor(
        private readonly pageService : PageService
    ){}

    @Get()
    async getPage(@Res() res: Response){
        const pageState = await this.pageService.getPageState()
        if( pageState == State.NOACCESS){
            res.redirect('faire_part')
        }
        else if(pageState == State.RESULTS)
        {
            res.redirect('/')
        }
    }
}
