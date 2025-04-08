"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Messages_1 = require("../constants/Messages");
const StatusCodes_1 = require("../constants/StatusCodes");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    //create a new user
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.email || !req.body.password) {
                    res.status(StatusCodes_1.HTTP_STATUS.BAD_REQUEST).json({
                        success: false,
                        message: Messages_1.AuthMessages.SIGN_UP_REQUIRED_FIELDS,
                        data: null,
                    });
                    return;
                }
                const user = yield this.userService.createUser(req.body);
                if (user.statusCode === StatusCodes_1.HTTP_STATUS.CREATED) {
                    res.status(StatusCodes_1.HTTP_STATUS.CREATED).json({
                        success: true,
                        message: user.message,
                        data: null,
                    });
                }
                else if (user.statusCode === StatusCodes_1.HTTP_STATUS.CONFLICT) {
                    res.status(StatusCodes_1.HTTP_STATUS.CONFLICT).json({
                        success: false,
                        message: Messages_1.AuthMessages.ACCOUNT_EXISTS,
                        data: null,
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(StatusCodes_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: Messages_1.GeneralMessages.INTERNAL_SERVER_ERROR,
                    data: null,
                });
            }
        });
    }
    //verify email and password and sends token
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.email || !req.body.password) {
                    res.status(StatusCodes_1.HTTP_STATUS.BAD_REQUEST).json({
                        success: false,
                        message: Messages_1.AuthMessages.SIGN_IN_REQUIRED_FIELDS,
                        data: null,
                    });
                    return;
                }
                const response = yield this.userService.authenticateUser(req.body);
                if (response.statusCode === StatusCodes_1.HTTP_STATUS.OK && response.data) {
                    res.status(StatusCodes_1.HTTP_STATUS.OK)
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
                }
                else {
                    switch (response.statusCode) {
                        case StatusCodes_1.HTTP_STATUS.NOT_FOUND:
                            res.status(StatusCodes_1.HTTP_STATUS.NOT_FOUND).json({
                                success: false,
                                message: response.message,
                                data: null,
                            });
                            break;
                        case StatusCodes_1.HTTP_STATUS.UNAUTHORIZED:
                            res.status(StatusCodes_1.HTTP_STATUS.UNAUTHORIZED).json({
                                success: false,
                                message: response.message,
                                data: null,
                            });
                            break;
                    }
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(StatusCodes_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: Messages_1.GeneralMessages.INTERNAL_SERVER_ERROR,
                    data: null,
                });
            }
        });
    }
    signOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("accessToken", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });
                res.clearCookie("refreshToken", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });
                res.status(StatusCodes_1.HTTP_STATUS.OK).json({
                    success: true,
                    message: Messages_1.AuthMessages.SIGN_OUT_SUCCESS,
                    data: null,
                });
            }
            catch (error) {
                console.error(error.message);
                res.status(StatusCodes_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: Messages_1.GeneralMessages.INTERNAL_SERVER_ERROR,
                    data: null,
                });
            }
        });
    }
    // Refresh token logic
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.cookies.refreshToken;
                if (!token) {
                    res.status(StatusCodes_1.HTTP_STATUS.UNAUTHORIZED).json({
                        success: false,
                        message: Messages_1.tokenMessages.REFRESH_TOKEN_MISSING,
                        data: null,
                    });
                    return;
                }
                const response = yield this.userService.refreshTokenCheck(token);
                if (response.statusCode === StatusCodes_1.HTTP_STATUS.CREATED) {
                    res.status(StatusCodes_1.HTTP_STATUS.CREATED)
                        .cookie("accessToken", response.accessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        maxAge: process.env.MAX_AGE_ACCESS_COOKIE
                            ? parseInt(process.env.MAX_AGE_ACCESS_COOKIE)
                            : 15 * 60 * 1000, // 15 minutes
                    })
                        .json({
                        success: true,
                        message: Messages_1.tokenMessages.ACCESS_TOKEN_SUCCESS,
                        data: null,
                    });
                }
                else {
                    res.status(StatusCodes_1.HTTP_STATUS.UNAUTHORIZED).json({
                        success: false,
                        message: response.message,
                        data: null,
                    });
                }
            }
            catch (error) {
                console.error(error.message);
                res.status(StatusCodes_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: Messages_1.GeneralMessages.INTERNAL_SERVER_ERROR,
                    data: null,
                });
            }
        });
    }
    uploadVideo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file || !req.body.userId) {
                    res.status(StatusCodes_1.HTTP_STATUS.BAD_REQUEST).json({
                        success: false,
                        message: Messages_1.videoMessages.VIDEO_UPLOAD_REQUIRED_FIELDS,
                        data: null,
                    });
                    return;
                }
                const status = yield this.userService.uploadVideo(req.file, req.body.userId);
                res.status(StatusCodes_1.HTTP_STATUS.OK).json({
                    success: true,
                    message: Messages_1.videoMessages.VIDEO_UPLOAD_SUCCESS,
                    data: status,
                });
            }
            catch (error) {
                console.log(error.message);
                res.status(StatusCodes_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: Messages_1.GeneralMessages.INTERNAL_SERVER_ERROR,
                    data: null,
                });
            }
        });
    }
    uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file || !req.body.userId) {
                    res.status(StatusCodes_1.HTTP_STATUS.BAD_REQUEST).json({
                        success: false,
                        message: Messages_1.imageMessages.IMAGE_UPLOAD_REQUIRED_FIELDS,
                        data: null,
                    });
                    return;
                }
                const status = yield this.userService.uploadImage(req.file, req.body.userId);
                res.status(StatusCodes_1.HTTP_STATUS.OK).json({
                    success: true,
                    message: Messages_1.imageMessages.IMAGE_UPLOAD_SUCCESS,
                    data: status,
                });
            }
            catch (error) {
                console.log(error.message);
                res.status(StatusCodes_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: Messages_1.GeneralMessages.INTERNAL_SERVER_ERROR,
                    data: null,
                });
            }
        });
    }
    getDashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.query.page || !req.params.id) {
                    res.status(StatusCodes_1.HTTP_STATUS.BAD_REQUEST).json({
                        success: false,
                        message: Messages_1.dashboardMessages.GET_DASHBOARD_REQUIRED_FIELDS,
                        data: null,
                    });
                    return;
                }
                const status = yield this.userService.fetchDashboard(req.params.id, req.query.search, Number(req.query.page));
                if (status.data.length > 0) {
                    res.status(StatusCodes_1.HTTP_STATUS.OK).json({
                        success: true,
                        message: Messages_1.dashboardMessages.GET_DASHBOARD_SUCCESS,
                        data: status,
                    });
                }
                else {
                    res.status(StatusCodes_1.HTTP_STATUS.NOT_FOUND).json({
                        success: true,
                        message: Messages_1.dashboardMessages.GET_DASHBOARD_FAILED,
                        data: status,
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(StatusCodes_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: Messages_1.GeneralMessages.INTERNAL_SERVER_ERROR,
                    data: null,
                });
            }
        });
    }
}
exports.default = UserController;
