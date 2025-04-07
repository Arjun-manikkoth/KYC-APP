import { v2 as cloudinary } from "cloudinary";
import { upload } from "./Multer";

// Configure Cloudinary
export default cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadVideo = async (video: Express.Multer.File) => {
    try {
        const customName = `kyc_${Date.now()}`;

        // Create a proper data URI from the buffer
        const fileData = `data:${video.mimetype};base64,${video.buffer.toString("base64")}`;

        // Upload video to Cloudinary
        const uploadedVideo = await cloudinary.uploader.upload(fileData, {
            public_id: customName,
            overwrite: true,
            resource_type: "video", // Specify video resource type
            folder: "kyc-videos", // Optional: organize in a folder
        });
        console.log(uploadedVideo, "uploaded video");
        return uploadedVideo.url;
    } catch (error: any) {
        console.error("Error uploading video:", error.message);
        throw new Error("Failed to upload video");
    }
};

export { uploadVideo };
