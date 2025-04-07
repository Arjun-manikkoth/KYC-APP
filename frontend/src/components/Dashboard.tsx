import React from "react";
import { useNavigate } from "react-router-dom";
import { Video, Camera } from "react-feather";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="pt-[5.5rem] min-h-screen  px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Dashboard Header with Buttons */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold  ">Dashboard</h2>
                <div className="flex items-center space-x-4">
                    {/* Video Capture Button */}
                    <button
                        className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                        onClick={() => navigate("/video-kyc")}
                        title="Record Video"
                    >
                        <Video size={20} />
                        <span className="hidden sm:inline font-medium">Video</span>
                    </button>

                    {/* Image Capture Button */}
                    <button
                        className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                        onClick={() => navigate("/image-kyc")}
                        title="Capture Image"
                    >
                        <Camera size={20} />
                        <span className="hidden sm:inline font-medium">Image</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600">
                    Welcome to the Dashboard! This is a placeholder for your content.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
