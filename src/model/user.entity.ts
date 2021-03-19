import { Role } from "./role.entity";
import {
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    Entity,
    ManyToMany,
    JoinTable
} from 'typeorm';

@Entity({
    name: 'users'
})
export class User {

    @PrimaryGeneratedColumn('increment')
    readonly id: number;
    @Column()
    readonly name: string;
    @Column()
    readonly login: string;
    @Column()
    readonly password: string;
    @ManyToMany(() => Role, {eager: true})
    @JoinTable({
        name: 'user_roles',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        }
    })
    readonly roles: Role[];


    constructor(id: number, name: string, login: string, password: string, roles: Role[]) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
        this.roles = roles;
    }
}