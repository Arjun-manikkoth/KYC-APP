import IMediaRepository from "./IMediaRepository";
import Media from "../../models/MediaModel";
import { ICreateMedia } from "../../interfaces/IMedia";
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
}
export default MediaRepository;
