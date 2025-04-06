import { ObjectId } from "mongoose";
import { IUser } from "../models/UserModel";

interface ISignUp {
    email: string;
    password: string;
}

interface ISignIn {
    email: string;
    password: string;
}

interface ISignUpResponse {
    statusCode: number;
    message: string;
    data: null;
}
interface ISignInData {
    _id: ObjectId | null;
    email: string | null;
}

interface ISignInResponse {
    statusCode: number;
    message: string;
    data: ISignInData | null;
    accessToken: string | null;
    refreshToken: string | null;
}

export { ISignUp, ISignIn, ISignUpResponse, ISignInResponse };
