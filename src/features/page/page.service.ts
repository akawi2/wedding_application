import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageState } from 'src/model/page.model';
import { Repository } from 'typeorm';

@Injectable()
export class PageService {
    constructor(
        @InjectRepository(PageState) private readonly pageRepository : Repository<PageState> 
    ){}

    async modifyPageState(dto: PageState): Promise<PageState>{
        const page = await this.pageRepository.save(dto)
        return page;
    }

    async getPageState(){
        const page= await this.pageRepository.findOne({where:{id: 1}})
        return page.state
    }
}
