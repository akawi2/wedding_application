import { Controller, Get, Query, Redirect, Render, Res } from "@nestjs/common";
import { Attendee } from "./model/attendee.model";
import { Response } from "express";

@Controller()
export class AppController{
    @Render('login')
    @Get()
    firstPage(){
    }

    @Render('index')
    @Get('index')
    index(@Query('attendee') attendee: Attendee, @Res() res: Response) {
      if (!attendee) {
        res.redirect('/');
        return;
      }
      return { attendee };
    }
    
    @Render('faire_part')
    @Get('faire_part')
    faire_part() {

    }

    @Render('rwait')
    @Get('rwait')
    rwait() {

    }
    
    @Render('waiting')
    @Get('waiting')
    waiting() {
    }

    @Render('results')
    @Get('results')
    result(){

    }

    @Render('battle')
    @Get('battle')
    vote(){

    }

}