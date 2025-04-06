import { ISignUp } from "../../interfaces/UserInterface";
import IUserRepository from "./IUserRepository";
import { IUser } from "../../models/UserModel";
import User from "../../models/UserModel";

class UserRepository implements IUserRepository {
    //creates new user to db
    async insertUser(signUpData: ISignUp): Promise<IUser> {
        try {
            const user = new User({
                email: signUpData.email,
                password: signUpData.password,
            });

            return await user.save();
        } catch (error: any) {
            console.log(error.message);
            throw new Error("Failed to create document");
        }
    }

    //find user with email id
    async findUserByEmail(email: string): Promise<IUser | null> {
        try {
            return await User.findOne({ email: email });
        } catch (error: any) {
            console.log(error.message);

            throw new Error("Failed to find account");
        }
    }
}
export default UserRepository;
