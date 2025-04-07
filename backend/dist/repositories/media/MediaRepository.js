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
const MediaModel_1 = __importDefault(require("../../models/MediaModel"));
const mongoose_1 = __importDefault(require("mongoose"));
class MediaRepository {
    //creates new media to db
    createMedia(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new MediaModel_1.default({
                    url: data.url,
                    userId: new mongoose_1.default.Types.ObjectId(data.userId),
                    type: data.type,
                });
                yield user.save();
            }
            catch (error) {
                console.log(error.message);
                throw new Error("Failed to create Media document");
            }
        });
    }
    getDashboard(id, search, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let limit = 10;
                let pageNo = Number(page);
                let skip = (pageNo - 1) * limit;
                let filterQuery = {
                    userId: new mongoose_1.default.Types.ObjectId(id),
                    url: { $regex: ".*" + search + ".*", $options: "i" },
                };
                let totalDocuments = yield MediaModel_1.default.countDocuments(filterQuery);
                let totalPages = Math.ceil(totalDocuments / limit);
                const dashboardData = yield MediaModel_1.default.find(filterQuery).skip(skip).limit(limit);
                return dashboardData.length > 0
                    ? { data: dashboardData, totalPages }
                    : {
                        data: dashboardData,
                        totalPages: 1,
                    };
            }
            catch (error) {
                console.log(error.message);
                throw new Error("Failed to fetch dashboard data");
            }
        });
    }
}
exports.default = MediaRepository;
