import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface IUser extends Document {
    _id: ObjectId;
    email: string;
    password: string;
}

const userSchema: Schema = new Schema(
    {
        email: String,
        password: String,
    },
    { timestamps: true }
);
const userModel = mongoose.model<IUser>("user", userSchema);

export default userModel;
export { IUser };
