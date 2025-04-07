import axiosInstance from "../axios/axios";
import { ILogin, IRegistration } from "@/interfaces/IAuth";

//api sends sign in data to the server
const signInApi = async (formData: ILogin) => {
    try {
        const response = await axiosInstance.post("/sign-in", formData);
        return {
            success: true,
            message: "Sucessfully signed Into Account",
            data: response.data.data,
        };
    } catch (error: any) {
        console.log(error.message);
        return {
            success: false,
            message: error.response.data.message || "Something went wrong",
        };
    }
};

//api sends signup data to the server
const signUpApi = async (formData: IRegistration) => {
    try {
        const response = await axiosInstance.post("/sign-up", formData);

        return { success: true, message: "Sucessfully Created Account", data: response.data.data };
    } catch (error: any) {
        console.log(error.message);
        return {
            success: false,
            message: error.response.data.message || "Something went wrong",
            data: null,
        };
    }
};

//api logouts clears access and refresh tokens
const logoutApi = async () => {
    try {
        const response = await axiosInstance.get("/sign-out");

        return {
            success: true,
            message: response.data.message,
            data: null,
        };
    } catch (error: any) {
        console.log(error.message);
        return {
            success: false,
            message: error.response.data.message || "Something went wrong",
            data: null,
        };
    }
};

//api for refreshing access token
const refreshTokenApi = async () => {
    try {
        const response = await axiosInstance.post("/refresh-token");
        return {
            success: true,
            message: response.data.message,
            data: null,
        };
    } catch (error: any) {
        console.log(error.message);
        return {
            success: false,
            message: error.response.data.message || "Something went wrong",
            data: null,
        };
    }
};

//api for refreshing access token
const saveVideoApi = async (videoBlob: Blob, user_id: string) => {
    try {
        const formData = new FormData();

        formData.append("video", videoBlob, "kyc-video.webm"); // Send as Blob with filename
        formData.append("userId", user_id);

        const response = await axiosInstance.post("/kyc-video", formData);

        return {
            success: true,
            message: response.data.message,
            data: null,
        };
    } catch (error: any) {
        console.log(error.message);
        return {
            success: false,
            message: error.response.data.message || "Something went wrong",
            data: null,
        };
    }
};

export { signInApi, signUpApi, logoutApi, refreshTokenApi, saveVideoApi };
