import { ISignUp, ISignIn, ISignUpResponse, ISignInResponse } from "../../interfaces/UserInterface";
import { IRefreshTokenResponse } from "../../interfaces/IRefreshToken";
import { IKYCMedia } from "../../models/MediaModel";
import { IDashboardResponse } from "../../interfaces/IMedia";

export default interface IUserService {
    createUser(userData: ISignUp): Promise<ISignUpResponse>;
    authenticateUser(userData: ISignIn): Promise<ISignInResponse>;
    refreshTokenCheck(token: string): Promise<IRefreshTokenResponse>;
    uploadVideo(video: Express.Multer.File, userId: string): Promise<void>;
    uploadImage(image: Express.Multer.File, userId: string): Promise<void>;
    fetchDashboard(id: string, search: string, page: number): Promise<IDashboardResponse>;
}
