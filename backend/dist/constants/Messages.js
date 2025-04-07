"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardMessages = exports.imageMessages = exports.videoMessages = exports.tokenMessages = exports.GeneralMessages = exports.AuthMessages = void 0;
exports.AuthMessages = {
    SIGN_UP_REQUIRED_FIELDS: "Email, password are required",
    SIGN_UP_FAILED: "Failed to sign up",
    SIGN_IN_REQUIRED_FIELDS: "Email and password are required",
    ACCOUNT_DOES_NOT_EXIST: "Account does not exist",
    INVALID_CREDENTIALS: "Invalid email or password",
    SIGN_UP_SUCCESS: "Account created successfully",
    SIGN_IN_SUCCESS: "Successfully signed in",
    ACCOUNT_EXISTS: "Account exists already",
    SIGN_OUT_SUCCESS: "Signed out sucessfully",
};
exports.GeneralMessages = {
    INTERNAL_SERVER_ERROR: "An unexpected error occurred",
};
exports.tokenMessages = {
    REFRESH_TOKEN_MISSING: "Refresh Token missing",
    ACCESS_TOKEN_SUCCESS: "Access Token sent successfully",
    TOKEN_ERROR: "Token error",
};
exports.videoMessages = {
    VIDEO_UPLOAD_REQUIRED_FIELDS: "User id and video are required fields",
    VIDEO_UPLOAD_SUCCESS: "Video uploaded successfully",
    VIDEO_UPLOAD_FAILED: "Failed to upload video",
};
exports.imageMessages = {
    IMAGE_UPLOAD_REQUIRED_FIELDS: "User id and image are required fields",
    IMAGE_UPLOAD_SUCCESS: "Image uploaded successfully",
    IMAGE_UPLOAD_FAILED: "Failed to upload image",
};
exports.dashboardMessages = {
    GET_DASHBOARD_REQUIRED_FIELDS: "User id , page no are required fields",
    GET_DASHBOARD_SUCCESS: "Fetched dashboard data successfully",
    GET_DASHBOARD_FAILED: "Failed to get dashboard data",
};
