import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageState } from 'src/model/page.model';

@Module({
  providers: [PageService],
  controllers: [PageController],
  imports: [
    TypeOrmModule.forFeature([
      PageState
    ])
  ]
})
export class PageModule {}
