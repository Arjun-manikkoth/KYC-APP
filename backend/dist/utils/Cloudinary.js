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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideo = exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Shared upload logic
const uploadToCloudinary = (file, resourceType, folder) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customName = `kyc_${Date.now()}`;
        const fileData = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        const result = yield cloudinary_1.v2.uploader.upload(fileData, {
            public_id: customName,
            overwrite: true,
            resource_type: resourceType,
            folder,
        });
        return result.secure_url;
    }
    catch (error) {
        console.error(`Error uploading ${resourceType}:`, error.message);
        throw new Error(`Failed to upload ${resourceType}`);
    }
});
// Explicit functions for images/videos
const uploadImage = (image) => __awaiter(void 0, void 0, void 0, function* () {
    return uploadToCloudinary(image, "image", "kyc-images");
});
exports.uploadImage = uploadImage;
const uploadVideo = (video) => __awaiter(void 0, void 0, void 0, function* () {
    return uploadToCloudinary(video, "video", "kyc-videos");
});
exports.uploadVideo = uploadVideo;
