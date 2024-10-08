import { UserInterface } from "src/common/interfaces/user.interface";

export class UserCreateDTO implements Partial<UserInterface>{
    firstName: string;
    lastName: string;
    isActive: boolean;
}
