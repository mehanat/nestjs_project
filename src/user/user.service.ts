import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../model/user.entity';
import {Role} from "../model/role.entity";
import {CustomException} from "../custom.exception";


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
                @InjectRepository(Role) private readonly roleRepository: Repository<Role>) { }

    public async getAll() {
        return await this.userRepository.find();
    }

    public async get(id: number): Promise<User> {
        const found = await this.userRepository.findOne(id);
        if (!found) {
            throw new CustomException(`Не найден ользователь с ИД = {id}`);
        }
        return found;
    }

    public async delete(id: number) {
        return await this.userRepository.delete(id);
    }

    public async save(user: User) {
        return await this.userRepository.save(user);
    }

    public async update(user: User) {
        const  existed = this.get(user.id);
        return  await this.userRepository.save({
            ...existed,
            ...user
        });
    }
}
