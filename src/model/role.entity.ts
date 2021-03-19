import {
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    Entity,
    ManyToMany,
    JoinTable
} from 'typeorm';
import {User} from "./user.entity";

@Entity({
    name: 'roles'
})
export class Role {
    @PrimaryGeneratedColumn('increment')
    readonly id: number;
    @Column()
    readonly name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }


}