import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ExampleInterface } from "src/common/interfaces/example.interface";

@Entity()
export class Example implements ExampleInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    isActive: boolean;
}
