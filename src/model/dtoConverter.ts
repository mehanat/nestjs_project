import {User} from "./user.entity";
import {UserDto} from "../dto/userDto";
import {Role} from "./role.entity";
import {RoleDto} from "../dto/roleDto";

export class DtoConverter {

    public convertUsers(users: Array<User>): Array<UserDto> {
        //todo
        const dtos: UserDto[] = [];
        users.forEach((user: User) => {
            dtos.push(this.convertUser(user))
        })
        return dtos;
    }

    public convertUser(user: User): UserDto {
        const userDto = new UserDto();
        userDto.id = user.id;
        userDto.name = user.name;
        userDto.login = user.login;
        console.log(user)
        if (user.roles) {
            userDto.roles = user.roles.map(this.convertRole);
        }
        return userDto;
    }

    public convertRole(role: Role): RoleDto {
        const roleDto = new RoleDto();
        roleDto.id = role.id;
        roleDto.name = role.name;
        return roleDto;
    }

    public convertUserDto(userDto: UserDto): User {
        return new User(
            userDto.id,
            userDto.name,
            userDto.login,
            userDto.password,
            []
        );
    }

    public convertRoleDtp(roleDto: RoleDto): Role {
        return new Role(roleDto.id, roleDto.name);
    }
}