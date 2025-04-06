import { ISignUp } from "../../interfaces/UserInterface";
import { IUser } from "../../models/UserModel";

export default interface IUserRepository {
    insertUser(userData: ISignUp): Promise<IUser>;
    findUserByEmail(email: string): Promise<IUser | null>;
}
