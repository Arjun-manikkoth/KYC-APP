import { Router } from "express";
import express from "express";
import UserController from "../controllers/UserController";
import UserRepository from "../repositories/user/UserRepository";
import UserService from "../services/user/UserService";
import verifyToken from "../middlewares/JwtVerify";
import multer from "multer";
import { upload } from "../utils/Multer";
import MediaRepository from "../repositories/media/MediaRepository";

const userRoute: Router = express.Router();

const userRepository = new UserRepository(); //creating user repository instance

const mediaRepository = new MediaRepository(); //creating media repository instance

//DI of  repositories to user service class
const userService = new UserService(userRepository, mediaRepository);

// Injecting dependency of user service to user controller class
const userController = new UserController(userService);

//--------------------------------------------Auth Routes-----------------------------------------------------

userRoute.route("/sign-in").post((req, res) => userController.signIn(req, res));

userRoute.route("/sign-up").post((req, res) => userController.signUp(req, res));

userRoute.route("/sign-out").get((req, res) => userController.signOut(req, res));

userRoute.route("/refresh-token").post((req, res) => userController.refreshToken(req, res));

userRoute
    .route("/kyc-video")
    .all(verifyToken, upload.single("video"))
    .post((req, res) => userController.uploadVideo(req, res));

userRoute
    .route("/kyc-image")
    .all(verifyToken, upload.single("image"))
    .post((req, res) => userController.uploadImage(req, res));

export default userRoute;
