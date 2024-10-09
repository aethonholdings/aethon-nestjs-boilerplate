import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { paginate, PaginateConfig, Paginated, PaginateQuery } from "nestjs-paginate";
import { UserCreateDTO } from "src/common/dto/user/user.create.dto";
import { UserGetDTO } from "src/common/dto/user/user.get.dto";
import { UserUpdateDTO } from "src/common/dto/user/user.update.dto";
import { User } from "src/common/entities/user.entity";
import { DataSource, Repository } from "typeorm";

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
        return paginate(query, this._userRepository, this._paginateConfig).catch((error) => {
            throw new HttpException(error.message || "Not found", HttpStatus.NOT_FOUND);
        });
    }

    async findOne(id: number): Promise<UserGetDTO> {
        return this._userRepository.findOneOrFail({ where: { id: id } }).catch((error) => {
            throw new HttpException(error.message || "Not found", HttpStatus.NOT_FOUND);
        });
    }

    async create(userCreateDTO: UserCreateDTO): Promise<UserGetDTO> {
        return this._userRepository.save(userCreateDTO);
    }

    async update(id: number, userUpdateDTO: UserUpdateDTO): Promise<UserGetDTO> {
        return this._userRepository.save(userUpdateDTO);
    }

    async delete(id: number): Promise<Boolean> {
        return this._userRepository.delete(id).then((result) => {
            if (result.affected > 0) {
                return true;
            }
            throw new HttpException("Not found", HttpStatus.NOT_FOUND);
        });
    }
}
