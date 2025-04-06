import IUserService from "../services/user/IUserService";
import { Request, Response } from "express";
import { AuthMessages, GeneralMessages } from "../constants/Messages";
import { HTTP_STATUS } from "../constants/StatusCodes";

class UserController {
    constructor(private userService: IUserService) {}

    //create a new user
    async signUp(req: Request, res: Response): Promise<void> {
        try {
            if (!req.body.email || !req.body.password) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: AuthMessages.SIGN_UP_REQUIRED_FIELDS,
                    data: null,
                });
                return;
            }

            const user = await this.userService.createUser(req.body);

            if (user.statusCode === HTTP_STATUS.CREATED) {
                res.status(HTTP_STATUS.CREATED).json({
                    success: true,
                    message: user.message,
                    data: null,
                });
            } else if (user.statusCode === HTTP_STATUS.CONFLICT) {
                res.status(HTTP_STATUS.CONFLICT).json({
                    success: false,
                    message: AuthMessages.ACCOUNT_EXISTS,
                    data: null,
                });
            }
        } catch (error: any) {
            console.log(error.message);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: GeneralMessages.INTERNAL_SERVER_ERROR,
                data: null,
            });
        }
    }

    //verify email and password and sends token
    async signIn(req: Request, res: Response): Promise<void> {
        try {
            if (!req.body.email || !req.body.password) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: AuthMessages.SIGN_IN_REQUIRED_FIELDS,
                    data: null,
                });
                return;
            }

            const response = await this.userService.authenticateUser(req.body);

            if (response.statusCode === HTTP_STATUS.OK && response.data) {
                res.status(HTTP_STATUS.OK)
                    .cookie("accessToken", response.accessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        maxAge: process.env.MAX_AGE_ACCESS_COOKIE
                            ? parseInt(process.env.MAX_AGE_ACCESS_COOKIE)
                            : 15 * 60 * 1000, // 15 minutes
                    })
                    .cookie("refreshToken", response.refreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        maxAge: process.env.MAX_AGE_REFRESH_COOKIE
                            ? parseInt(process.env.MAX_AGE_REFRESH_COOKIE)
                            : 7 * 24 * 60 * 60 * 1000, // 7 days
                    })
                    .json({
                        success: true,
                        message: response.message,
                        data: {
                            email: response.data.email,
                            id: response.data._id,
                        },
                    });
            } else {
                switch (response.statusCode) {
                    case HTTP_STATUS.NOT_FOUND:
                        res.status(HTTP_STATUS.NOT_FOUND).json({
                            success: false,
                            message: response.message,
                            data: null,
                        });
                        break;
                    case HTTP_STATUS.UNAUTHORIZED:
                        res.status(HTTP_STATUS.UNAUTHORIZED).json({
                            success: false,
                            message: response.message,
                            data: null,
                        });
                        break;
                }
            }
        } catch (error: any) {
            console.log(error.message);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: GeneralMessages.INTERNAL_SERVER_ERROR,
                data: null,
            });
        }
    }
}
export default UserController;
