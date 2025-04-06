import { ISignUp, ISignIn, ISignUpResponse, ISignInResponse } from "../../interfaces/UserInterface";

export default interface IUserService {
    createUser(userData: ISignUp): Promise<ISignUpResponse>;
    authenticateUser(userData: ISignIn): Promise<ISignInResponse>;
}
