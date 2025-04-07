import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Shared upload logic
const uploadToCloudinary = async (
    file: Express.Multer.File,
    resourceType: "image" | "video",
    folder: string
) => {
    try {
        const customName = `kyc_${Date.now()}`;
        const fileData = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(fileData, {
            public_id: customName,
            overwrite: true,
            resource_type: resourceType,
            folder,
        });

        return result.secure_url;
    } catch (error: any) {
        console.error(`Error uploading ${resourceType}:`, error.message);
        throw new Error(`Failed to upload ${resourceType}`);
    }
};

// Explicit functions for images/videos
const uploadImage = async (image: Express.Multer.File) => {
    return uploadToCloudinary(image, "image", "kyc-images");
};

const uploadVideo = async (video: Express.Multer.File) => {
    return uploadToCloudinary(video, "video", "kyc-videos");
};

export { uploadImage, uploadVideo };
