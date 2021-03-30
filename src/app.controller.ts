import {Controller, Get, Header, HttpCode, Res} from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from "fs";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('video')
  //@HttpCode(201)
  @Header('Content-Type', 'video/mp4')
  //@Header('Content-Length', '3364687')
  async streamVideo(@Res() res) {
    const path = 'assets/16061365924341.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    //console.log(res)

    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.set('Content-Length', fileSize)
    fs.createReadStream(path).pipe(res)
  }
}
