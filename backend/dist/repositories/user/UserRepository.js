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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../../models/UserModel"));
class UserRepository {
    //creates new user to db
    insertUser(signUpData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new UserModel_1.default({
                    email: signUpData.email,
                    password: signUpData.password,
                });
                yield user.save();
            }
            catch (error) {
                console.log(error.message);
                throw new Error("Failed to create document");
            }
        });
    }
    //find user with email id
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserModel_1.default.findOne({ email: email });
            }
            catch (error) {
                console.log(error.message);
                throw new Error("Failed to find account");
            }
        });
    }
}
exports.default = UserRepository;
