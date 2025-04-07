import { IKYCMedia } from "../models/MediaModel";

export interface ICreateMedia {
    url: string;
    type: "video" | "image";
    userId: string;
}

export interface IDashboardResponse {
    data: IKYCMedia[] | [];
    totalPages: number | null;
}
