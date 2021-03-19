import {RoleDto} from "./roleDto";
import { IsEmail, IsNotEmpty } from 'class-validator';


export class UserDto {
    id: number;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    login: string;
    @IsNotEmpty()
    password: string;
    roles: Array<RoleDto>;

}