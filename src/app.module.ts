import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {UserModule} from "./user/user.module";


@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()), UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
