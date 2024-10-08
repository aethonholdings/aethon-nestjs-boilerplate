import { UserInterface } from "src/common/interfaces/user.interface";

export class UserCreateDTO implements UserInterface{
    firstName: string;
    lastName: string;
    isActive: boolean;
}
