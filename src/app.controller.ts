import {Controller, Get, Header, HttpCode, Res, Headers} from '@nestjs/common';
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
  @Header('Content-Type', 'video/mp4')
  //@Header('Content-Length', '3364687')
  async streamVideo(@Res() res,
                    @Headers() headers) {

    const path = 'assets/16061365924341.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = headers.range
    console.log(fileSize)

    if (range) {
      console.log('Chunk!')
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1]) : start + 50000
      console.log(start + ' - ' + end)
      res.set('Content-Length', end - start + 1)
      res.set('Accept-Ranges', 'bytes')
      res.set('Content-Range', `bytes ${start}-${end}/${fileSize}`)
      res.status(206)
      fs.createReadStream(path, {start, end}).pipe(res)
    } else {
      console.log('All file')
      res.set('Content-Length', fileSize)
      res.status(200)
      fs.createReadStream(path).pipe(res)
    }
  }
}
