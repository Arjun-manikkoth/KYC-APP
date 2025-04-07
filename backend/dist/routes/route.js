"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const UserRepository_1 = __importDefault(require("../repositories/user/UserRepository"));
const UserService_1 = __importDefault(require("../services/user/UserService"));
const JwtVerify_1 = __importDefault(require("../middlewares/JwtVerify"));
const Multer_1 = require("../utils/Multer");
const MediaRepository_1 = __importDefault(require("../repositories/media/MediaRepository"));
const userRoute = express_1.default.Router();
const userRepository = new UserRepository_1.default(); //creating user repository instance
const mediaRepository = new MediaRepository_1.default(); //creating media repository instance
//DI of  repositories to user service class
const userService = new UserService_1.default(userRepository, mediaRepository);
// Injecting dependency of user service to user controller class
const userController = new UserController_1.default(userService);
//--------------------------------------------Auth Routes-----------------------------------------------------
userRoute.route("/sign-in").post((req, res) => userController.signIn(req, res));
userRoute.route("/sign-up").post((req, res) => userController.signUp(req, res));
userRoute.route("/sign-out").get((req, res) => userController.signOut(req, res));
userRoute.route("/refresh-token").post((req, res) => userController.refreshToken(req, res));
userRoute
    .route("/kyc-video")
    .all(JwtVerify_1.default, Multer_1.upload.single("video"))
    .post((req, res) => userController.uploadVideo(req, res));
userRoute
    .route("/kyc-image")
    .all(JwtVerify_1.default, Multer_1.upload.single("image"))
    .post((req, res) => userController.uploadImage(req, res));
userRoute
    .route("/:id/dashboard")
    .all(JwtVerify_1.default)
    .get((req, res) => userController.getDashboard(req, res));
exports.default = userRoute;
