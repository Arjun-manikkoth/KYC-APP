import { ISignUp, ISignIn, ISignUpResponse, ISignInResponse } from "../../interfaces/UserInterface";
import { IRefreshTokenResponse } from "../../interfaces/IRefreshToken";

export default interface IUserService {
    createUser(userData: ISignUp): Promise<ISignUpResponse>;
    authenticateUser(userData: ISignIn): Promise<ISignInResponse>;
    refreshTokenCheck(token: string): Promise<IRefreshTokenResponse>;
}
