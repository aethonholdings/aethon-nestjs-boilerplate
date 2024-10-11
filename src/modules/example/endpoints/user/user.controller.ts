import { Body, Controller, Delete, Get, Param, Post, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserGetDTO } from "src/common/dto/user/user.get.dto";
import { UserCreateDTO } from "src/common/dto/user/user.create.dto";
import { UserUpdateDTO } from "src/common/dto/user/user.update.dto";
import { Paginate, Paginated, PaginateQuery } from "nestjs-paginate";
import { ApiTags } from "@nestjs/swagger";

const path = "user";

@Controller(path)
@ApiTags("User")
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    findAll(@Paginate() query: PaginateQuery): Promise<Paginated<UserGetDTO>> {
        return this.userService.findAll(query);
    }

    @Get(":id")
    findOne(@Param("id") id: number): Promise<UserGetDTO> {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() userCreateDTO: UserCreateDTO): Promise<UserGetDTO> {
        return this.userService.create(userCreateDTO);
    }

    @Post(":id")
    update(@Param("id") id: number, userUpdateDTO: UserUpdateDTO): Promise<null> {
        return this.userService.update(id, userUpdateDTO).then(() => null);
    }

    @Delete(":id")
    delete(@Param("id") id: number): Promise<null> {
        return this.userService.delete(id).then(() => null);
    }
}
