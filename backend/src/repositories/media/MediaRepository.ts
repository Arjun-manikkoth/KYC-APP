import IMediaRepository from "./IMediaRepository";
import Media from "../../models/MediaModel";
import { ICreateMedia, IDashboardResponse } from "../../interfaces/IMedia";
import { IKYCMedia } from "../../models/MediaModel";
import mongoose from "mongoose";

class MediaRepository implements IMediaRepository {
    //creates new media to db
    async createMedia(data: ICreateMedia): Promise<void> {
        try {
            const user = new Media({
                url: data.url,
                userId: new mongoose.Types.ObjectId(data.userId),
                type: data.type,
            });

            await user.save();
        } catch (error: any) {
            console.log(error.message);
            throw new Error("Failed to create Media document");
        }
    }

    async getDashboard(id: string, search: string, page: number): Promise<IDashboardResponse> {
        try {
            let limit = 10;

            let pageNo: number = Number(page);

            let skip = (pageNo - 1) * limit;

            let filterQuery = {
                userId: new mongoose.Types.ObjectId(id),
                url: { $regex: ".*" + search + ".*", $options: "i" },
            };

            let totalDocuments = await Media.countDocuments(filterQuery);
            let totalPages = Math.ceil(totalDocuments / limit);

            const dashboardData = await Media.find(filterQuery).skip(skip).limit(limit);

            return dashboardData.length > 0
                ? { data: dashboardData, totalPages }
                : {
                      data: dashboardData,
                      totalPages: 1,
                  };
        } catch (error: any) {
            console.log(error.message);
            throw new Error("Failed to fetch dashboard data");
        }
    }
}
export default MediaRepository;
