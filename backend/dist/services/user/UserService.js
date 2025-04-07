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
const HashPassword_1 = require("../../utils/HashPassword");
const Messages_1 = require("../../constants/Messages");
const StatusCodes_1 = require("../../constants/StatusCodes");
const GenerateTokens_1 = require("../../utils/GenerateTokens");
const CheckToken_1 = require("../../utils/CheckToken");
const Cloudinary_1 = require("../../utils/Cloudinary");
const Cloudinary_2 = require("../../utils/Cloudinary");
class UserService {
    constructor(userRepository, mediaRepository) {
        this.userRepository = userRepository;
        this.mediaRepository = mediaRepository;
    }
    //creates a new user document without duplicates
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exists = yield this.userRepository.findUserByEmail(userData.email);
                if (!exists) {
                    const hashedPassword = yield (0, HashPassword_1.hashPassword)(userData.password);
                    userData.password = hashedPassword;
                    yield this.userRepository.insertUser(userData);
                    return {
                        statusCode: StatusCodes_1.HTTP_STATUS.CREATED,
                        message: Messages_1.AuthMessages.SIGN_UP_SUCCESS,
                        data: null,
                    };
                }
                else {
                    return {
                        statusCode: StatusCodes_1.HTTP_STATUS.CONFLICT,
                        message: Messages_1.AuthMessages.ACCOUNT_EXISTS,
                        data: null,
                    };
                }
            }
            catch (error) {
                console.log(error.message);
                throw new Error(error);
            }
        });
    }
    //verify credentials and generates tokens
    authenticateUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exists = yield this.userRepository.findUserByEmail(userData.email);
                if (exists) {
                    const passwordStatus = yield (0, HashPassword_1.comparePasswords)(userData.password, exists.password);
                    if (passwordStatus) {
                        const tokens = (0, GenerateTokens_1.generateTokens)(exists._id.toString(), exists.email, "user");
                        return {
                            statusCode: StatusCodes_1.HTTP_STATUS.OK,
                            message: Messages_1.AuthMessages.SIGN_IN_SUCCESS,
                            data: {
                                email: exists.email,
                                _id: exists._id,
                            },
                            accessToken: tokens.accessToken,
                            refreshToken: tokens.refreshToken,
                        };
                    }
                    else {
                        return {
                            statusCode: StatusCodes_1.HTTP_STATUS.UNAUTHORIZED,
                            message: Messages_1.AuthMessages.INVALID_CREDENTIALS,
                            data: { email: exists.email, _id: null },
                            accessToken: null,
                            refreshToken: null,
                        };
                    }
                }
                else {
                    return {
                        statusCode: StatusCodes_1.HTTP_STATUS.NOT_FOUND,
                        message: Messages_1.AuthMessages.ACCOUNT_DOES_NOT_EXIST,
                        data: { email: null, _id: null },
                        accessToken: null,
                        refreshToken: null,
                    };
                }
            }
            catch (error) {
                console.log(error.message);
                throw new Error("Failed to sign in");
            }
        });
    }
    refreshTokenCheck(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenStatus = yield (0, CheckToken_1.verifyToken)(token);
                if (tokenStatus.id && tokenStatus.email && tokenStatus.role) {
                    const tokens = (0, GenerateTokens_1.generateTokens)(tokenStatus.id, tokenStatus.email, tokenStatus.role);
                    return {
                        statusCode: StatusCodes_1.HTTP_STATUS.CREATED,
                        accessToken: tokens.accessToken,
                        message: tokenStatus.message,
                    };
                }
                return {
                    statusCode: StatusCodes_1.HTTP_STATUS.INTERNAL_SERVER_ERROR,
                    accessToken: null,
                    message: tokenStatus.message,
                };
            }
            catch (error) {
                console.log(error.message);
                throw new Error("Failed to create refresh token");
            }
        });
    }
    uploadVideo(video, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = yield (0, Cloudinary_1.uploadVideo)(video);
                yield this.mediaRepository.createMedia({ url, type: "video", userId });
            }
            catch (error) {
                console.log(error.message);
                throw new Error("Failed to upload video");
            }
        });
    }
    uploadImage(image, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = yield (0, Cloudinary_2.uploadImage)(image);
                yield this.mediaRepository.createMedia({ url, type: "image", userId });
            }
            catch (error) {
                console.log(error.message);
                throw new Error("Failed to upload image");
            }
        });
    }
    fetchDashboard(id, search, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.mediaRepository.getDashboard(id, search, page);
            }
            catch (error) {
                console.log(error);
                throw new Error("Failed to fetch dashboard");
            }
        });
    }
}
exports.default = UserService;
