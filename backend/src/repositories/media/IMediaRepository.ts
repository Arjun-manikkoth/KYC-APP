import { ICreateMedia } from "../../interfaces/IMedia";

export default interface IMediaRepository {
    createMedia(data: ICreateMedia): Promise<void>;
}
