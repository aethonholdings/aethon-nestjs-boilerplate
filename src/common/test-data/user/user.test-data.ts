import { UserCreateDTO } from "src/common/dto/user/user.create.dto";

export const userTestData: UserCreateDTO[] = [
    {
        firstName: "John",
        lastName: "Doe",
        isActive: true
    },
    {
        firstName: "Jane",
        lastName: "Doe",
        isActive: false
    },
    {
        firstName: "John",
        lastName: "Smith",
        isActive: true
    }
]