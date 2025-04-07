import { ICreateMedia, IDashboardResponse } from "../../interfaces/IMedia";
import { IKYCMedia } from "../../models/MediaModel";

export default interface IMediaRepository {
    createMedia(data: ICreateMedia): Promise<void>;
    getDashboard(id: string, search: string, page: number): Promise<IDashboardResponse>;
}
