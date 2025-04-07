import mongoose, { ObjectId } from "mongoose";

interface IKYCMedia extends Document {
    user_id: ObjectId;
    url: string;
    type: string;
}

// Define the schema for kyc_media
const kycMediaSchema = new mongoose.Schema({
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
        type: mongoose.Types.ObjectId,
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
const KycMedia = mongoose.model<IKYCMedia>("kyc_media", kycMediaSchema);

export default KycMedia;
export { IKYCMedia };
