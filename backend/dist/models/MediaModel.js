"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema for kyc_media
const kycMediaSchema = new mongoose_1.default.Schema({
    url: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["image", "video"], // Restrict to image or video
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
// Optional: Add indexes for faster queries
kycMediaSchema.index({ userId: 1, createdAt: -1 }); // Index for user-specific, time-sorted queries
kycMediaSchema.index({ type: 1 }); // Index for filtering by type
// Create and export the model
const KycMedia = mongoose_1.default.model("kyc_media", kycMediaSchema);
exports.default = KycMedia;
