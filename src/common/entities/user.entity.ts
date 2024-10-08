import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserInterface } from "../interfaces/user.interface";

@Entity()
export class User implements UserInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    isActive: boolean;
}
