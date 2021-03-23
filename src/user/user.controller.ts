import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseFilters,
    ValidationPipe
} from '@nestjs/common';
import { UserService } from "./user.service";
import { DtoConverter } from "../model/dtoConverter";
import {UserDto} from "../dto/userDto";
import {User} from "../model/user.entity";
import {HttpExceptionFilter} from "../exception.filter";

@Controller('user')
export class UserController {

    private dtoConverter: DtoConverter;

    constructor(private serv: UserService) {
        this.dtoConverter = new DtoConverter();
    }

    @Get()
    public async getAll() {
        return this.dtoConverter.convertUsers(await this.serv.getAll());
    }

    @Get('/:id')
    @UseFilters(new HttpExceptionFilter())
    public async getById(@Param('id', new ParseIntPipe()) id) {
        return this.dtoConverter.convertUser(await this.serv.get(id));
    }

    @Delete('/:id')
    public async deleteById(@Param('id', new ParseIntPipe()) id) {
        return await this.serv.delete(id);
    }

    @Post()
    public async saveUser(@Body(new ValidationPipe()) userDto: UserDto) {
        const user = this.dtoConverter.convertUserDto(userDto);
        return await this.serv.save(user);
    }

    @Put()
    public async updateUser(@Body(new ValidationPipe()) userDto: UserDto) {
        const user = this.dtoConverter.convertUserDto(userDto);
        return await this.serv.update(user);
    }
}
