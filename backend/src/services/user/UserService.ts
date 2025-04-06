import { ISignUp } from "../../interfaces/UserInterface";
import IUserService from "./IUserService";
import IUserRepository from "../../repositories/user/IUserRepository";
import { ISignUpResponse, ISignIn, ISignInResponse } from "../../interfaces/UserInterface";
import { hashPassword, comparePasswords } from "../../utils/HashPassword";
import { AuthMessages, GeneralMessages } from "../../constants/Messages";
import { HTTP_STATUS } from "../../constants/StatusCodes";
import { generateTokens } from "../../utils/GenerateTokens";

class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) {}

    //creates a new user document without duplicates
    async createUser(userData: ISignUp): Promise<ISignUpResponse> {
        try {
            const exists = await this.userRepository.findUserByEmail(userData.email);

            if (!exists) {
                const hashedPassword = await hashPassword(userData.password);
                userData.password = hashedPassword;

                const status = await this.userRepository.insertUser(userData);

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
}
export default UserService;
