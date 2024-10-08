import { Injectable } from "@nestjs/common";
import { UserCreateDTO } from "src/common/dto/user/user.create.dto";
import { UserGetDTO } from "src/common/dto/user/user.get.dto";
import { UserUpdateDTO } from "src/common/dto/user/user.update.dto";
import { User } from "src/common/entities/user.entity";
import { DataSource } from "typeorm";

@Injectable()
export class UserService {
    userRepository = this.dataSource.getRepository(User);

    constructor(private dataSource: DataSource) {}

    async findAll(): Promise<UserGetDTO[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<UserGetDTO> {
        return this.userRepository.findOneOrFail({ where: { id: id } });
    }

    async create(userCreateDTO: UserCreateDTO): Promise<UserGetDTO> {
        return this.userRepository.save(userCreateDTO);
    }

    async update(id: number, userUpdateDTO: UserUpdateDTO): Promise<UserGetDTO> {
        return this.userRepository.save(userUpdateDTO);
    }

    async delete(id: number): Promise<Boolean> {
        return this.userRepository.delete(id).then((result) => { return result.affected > 0 });
    }
}
