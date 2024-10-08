import { UserInterface } from "src/common/interfaces/user.interface";

export class UserGetDTO implements UserInterface {
    id: number;
    firstName: string;
    lastName: string;
    isActive: boolean;
}