//import {Role} from "./Role";
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';


export class User {

    @PrimaryGeneratedColumn('increment')
    readonly id: bigint;
    @Column('name')
    readonly name: string;
    @Column('login')
    readonly login: string;
    @Column('password')
    readonly password: string;
/*
    readonly roles: Array<Role>;
*/

}