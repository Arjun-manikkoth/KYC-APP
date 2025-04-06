import { Router } from "express";
import express from "express";
import UserController from "../controllers/UserController";
import UserRepository from "../repositories/user/UserRepository";
import UserService from "../services/user/UserService";
import verifyToken from "../middlewares/JwtVerify";

const userRoute: Router = express.Router();

//creating user repository instance
const userRepository = new UserRepository();

//DI of user repository to user service class
const userService = new UserService(userRepository);

// Injecting dependency of user service to user controller class
const userController = new UserController(userService);

//--------------------------------------------Auth Routes-----------------------------------------------------

userRoute.route("/sign-in").post((req, res) => userController.signIn(req, res));

userRoute.route("/sign-up").post((req, res) => userController.signUp(req, res));

userRoute.route("/sign-out").get((req, res) => userController.signOut(req, res));

userRoute.route("/refresh-token").post((req, res) => userController.refreshToken(req, res));

export default userRoute;
