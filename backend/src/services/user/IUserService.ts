import { ISignUp, ISignIn, ISignUpResponse, ISignInResponse } from "../../interfaces/UserInterface";
import { IRefreshTokenResponse } from "../../interfaces/IRefreshToken";
import multer from "multer";

export default interface IUserService {
    createUser(userData: ISignUp): Promise<ISignUpResponse>;
    authenticateUser(userData: ISignIn): Promise<ISignInResponse>;
    refreshTokenCheck(token: string): Promise<IRefreshTokenResponse>;
    uploadVideo(video: Express.Multer.File, userId: string): Promise<void>;
}
