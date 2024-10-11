import { Injectable } from "@nestjs/common";
import { PaginateConfig, Paginated, PaginateQuery } from "nestjs-paginate";
import { UserCreateDTO } from "src/common/dto/user/user.create.dto";
import { UserGetDTO } from "src/common/dto/user/user.get.dto";
import { UserUpdateDTO } from "src/common/dto/user/user.update.dto";
import { User } from "src/common/entities/user.entity";
import { DataSource, Repository } from "typeorm";
import { crud } from "../../../../common/utils/crud";

@Injectable()
export class UserService {
    private readonly _userRepository: Repository<User>;

    private _paginateConfig: PaginateConfig<User> = {
        sortableColumns: ["id"],
        defaultSortBy: [["id", "ASC"]]
    };

    constructor(private readonly dataSource: DataSource) {
        this._userRepository = this.dataSource.getRepository(User);
    }

    async findAll(query: PaginateQuery): Promise<Paginated<UserGetDTO>> {
        return crud.findAll(query, this._userRepository, this._paginateConfig);
    }

    async findOne(id: number): Promise<UserGetDTO> {
        return crud.findOne(this._userRepository, { where: { id: id } });
    }

    async create(userCreateDTO: UserCreateDTO): Promise<UserGetDTO> {
        return crud.create(this._userRepository, userCreateDTO);
    }

    async update(id: number, userUpdateDTO: UserUpdateDTO): Promise<null> {
        return crud.update(id, this._userRepository, userUpdateDTO);
    }

    async delete(id: number): Promise<null> {
        return crud.del(id, this._userRepository);
    }
}
