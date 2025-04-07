import { ISignUp } from "../../interfaces/UserInterface";
import IUserService from "./IUserService";
import IUserRepository from "../../repositories/user/IUserRepository";
import IMediaRepository from "../../repositories/media/IMediaRepository";
import { ISignUpResponse, ISignIn, ISignInResponse } from "../../interfaces/UserInterface";
import { hashPassword, comparePasswords } from "../../utils/HashPassword";
import { AuthMessages } from "../../constants/Messages";
import { HTTP_STATUS } from "../../constants/StatusCodes";
import { generateTokens } from "../../utils/GenerateTokens";
import { verifyToken } from "../../utils/CheckToken";
import { IRefreshTokenResponse } from "../../interfaces/IRefreshToken";
import { uploadVideo } from "../../utils/Cloudinary";
import { uploadImage } from "../../utils/Cloudinary";
import { IDashboardResponse } from "../../interfaces/IMedia";

class UserService implements IUserService {
    constructor(
        private userRepository: IUserRepository,
        private mediaRepository: IMediaRepository
    ) {}

    //creates a new user document without duplicates
    async createUser(userData: ISignUp): Promise<ISignUpResponse> {
        try {
            const exists = await this.userRepository.findUserByEmail(userData.email);

            if (!exists) {
                const hashedPassword = await hashPassword(userData.password);
                userData.password = hashedPassword;

                await this.userRepository.insertUser(userData);

                return {
                    statusCode: HTTP_STATUS.CREATED,
                    message: AuthMessages.SIGN_UP_SUCCESS,
                    data: null,
                };
            } else {
                return {
                    statusCode: HTTP_STATUS.CONFLICT,
                    message: AuthMessages.ACCOUNT_EXISTS,
                    data: null,
                };
            }
        } catch (error: any) {
            console.log(error.message);

            throw new Error(error);
        }
    }

    //verify credentials and generates tokens
    async authenticateUser(userData: ISignIn): Promise<ISignInResponse> {
        try {
            const exists = await this.userRepository.findUserByEmail(userData.email);

            if (exists) {
                const passwordStatus = await comparePasswords(userData.password, exists.password);

                if (passwordStatus) {
                    const tokens = generateTokens(exists._id.toString(), exists.email, "user");

                    return {
                        statusCode: HTTP_STATUS.OK,
                        message: AuthMessages.SIGN_IN_SUCCESS,
                        data: {
                            email: exists.email,
                            _id: exists._id,
                        },
                        accessToken: tokens.accessToken,
                        refreshToken: tokens.refreshToken,
                    };
                } else {
                    return {
                        statusCode: HTTP_STATUS.UNAUTHORIZED,
                        message: AuthMessages.INVALID_CREDENTIALS,
                        data: { email: exists.email, _id: null },
                        accessToken: null,
                        refreshToken: null,
                    };
                }
            } else {
                return {
                    statusCode: HTTP_STATUS.NOT_FOUND,
                    message: AuthMessages.ACCOUNT_DOES_NOT_EXIST,
                    data: { email: null, _id: null },
                    accessToken: null,
                    refreshToken: null,
                };
            }
        } catch (error: any) {
            console.log(error.message);
            throw new Error("Failed to sign in");
        }
    }

    async refreshTokenCheck(token: string): Promise<IRefreshTokenResponse> {
        try {
            const tokenStatus = await verifyToken(token);

            if (tokenStatus.id && tokenStatus.email && tokenStatus.role) {
                const tokens = generateTokens(tokenStatus.id, tokenStatus.email, tokenStatus.role);

                return {
                    statusCode: HTTP_STATUS.CREATED,
                    accessToken: tokens.accessToken,
                    message: tokenStatus.message,
                };
            }

            return {
                statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                accessToken: null,
                message: tokenStatus.message,
            };
        } catch (error: any) {
            console.log(error.message);
            throw new Error("Failed to create refresh token");
        }
    }

    async uploadVideo(video: Express.Multer.File, userId: string): Promise<void> {
        try {
            const url = await uploadVideo(video);

            await this.mediaRepository.createMedia({ url, type: "video", userId });
        } catch (error: any) {
            console.log(error.message);
            throw new Error("Failed to upload video");
        }
    }

    async uploadImage(image: Express.Multer.File, userId: string): Promise<void> {
        try {
            const url = await uploadImage(image);
            await this.mediaRepository.createMedia({ url, type: "image", userId });
        } catch (error: any) {
            console.log(error.message);
            throw new Error("Failed to upload image");
        }
    }

    async fetchDashboard(id: string, search: string, page: number): Promise<IDashboardResponse> {
        try {
            return await this.mediaRepository.getDashboard(id, search, page);
        } catch (error: any) {
            console.log(error);
            throw new Error("Failed to fetch dashboard");
        }
    }
}
export default UserService;
