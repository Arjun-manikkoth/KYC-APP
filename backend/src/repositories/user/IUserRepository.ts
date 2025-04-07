import { ISignUp } from "../../interfaces/UserInterface";
import { IUser } from "../../models/UserModel";

export default interface IUserRepository {
    insertUser(userData: ISignUp): Promise<void>;
    findUserByEmail(email: string): Promise<IUser | null>;
}
