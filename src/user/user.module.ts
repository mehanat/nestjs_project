import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from "../model/user.entity";
import {Role} from "../model/role.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Role])],
    providers: [UserService],
    controllers: [UserController],
    exports: []
})
export class UserModule { }