import mongoose from "mongoose";

const url: string = process.env.MONGO_URL || "";

//database connection
export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(url);
        console.log("Connected to the database");
    } catch (error) {
        console.error(error);
    }
};
