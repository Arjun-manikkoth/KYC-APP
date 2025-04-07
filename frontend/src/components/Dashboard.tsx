import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Video as VideoIcon, Camera, Search } from "react-feather";
import { dashboardApi } from "@/api/api";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Dashboard data interface
interface DashboardItem {
    _id: { $oid: string };
    url: string;
    type: string;
    userId: { $oid: string };
    createdAt: Date;
}

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    // State for dashboard data, pagination, search, and popup
    const [dashboardData, setDashboardData] = useState<DashboardItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetch, setFetch] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<DashboardItem | null>(null); // For popup
    const user = useSelector((state: RootState) => state.user);

    // Fetch data from API
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const response = await dashboardApi(user.id || "", searchQuery, currentPage);
                if (response.data) {
                    setDashboardData(response.data.data);
                    setTotalPages(response.data.totalPages);
                    setError(null);
                }
            } catch (err) {
                setError("Failed to fetch dashboard data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user.id, currentPage, fetch]);

    // Pagination handlers
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Search input handler
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Search button handler
    const handleSearchClick = () => {
        setCurrentPage(1);
        setFetch((prev) => prev + 1);
    };

    // Popup handlers
    const openPopup = (item: DashboardItem) => {
        setSelectedItem(item);
    };

    const closePopup = () => {
        setSelectedItem(null);
    };

    // Extract filename from URL
    const getFileName = (url: string) => {
        const parts = url.split("/");
        return parts[parts.length - 1];
    };

    return (
        <div className="pt-[5.5rem] min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-6">
                {/* Video and Image Buttons */}
                <div className="flex justify-end items-center space-x-4">
                    <button
                        className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                        onClick={() => navigate("/video-kyc")}
                        title="Record Video"
                    >
                        <VideoIcon size={20} />
                        <span className="hidden sm:inline font-medium">Video</span>
                    </button>
                    <button
                        className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                        onClick={() => navigate("/image-kyc")}
                        title="Capture Image"
                    >
                        <Camera size={20} />
                        <span className="hidden sm:inline font-medium">Image</span>
                    </button>
                </div>
                {/* Dashboard Label */}
                <h2 className="text-2xl font-bold text-center mb-8">Dashboard</h2>
                {/* Search Bar with Button */}
                <div className="mt-4 flex justify-center items-center space-x-2">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by URL or type..."
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <button
                        onClick={handleSearchClick}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
                    >
                        <Search size={20} />
                        <span>Search</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                {loading ? (
                    <p className="text-gray-600 text-center">Loading...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : dashboardData.length === 0 ? (
                    <p className="text-gray-600 text-center">
                        {searchQuery ? "No results found." : "No data available."}
                    </p>
                ) : (
                    <>
                        {/* Dashboard Items */}
                        <div className="space-y-4">
                            {dashboardData.map((item) => (
                                <div
                                    key={item._id.$oid}
                                    className="p-4 border border-gray-200 rounded-md"
                                >
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {item.type === "image" ? "Image KYC" : `${item.type} KYC`}
                                    </h3>
                                    <p className="text-gray-600">
                                        <strong>Filename:</strong> {getFileName(item.url)}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        <strong>Created:</strong>{" "}
                                        {new Date(item.createdAt).toLocaleString()}
                                    </p>
                                    <p
                                        className="text-indigo-600 cursor-pointer hover:underline"
                                        onClick={() => openPopup(item)}
                                    >
                                        View Details
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="mt-6 flex justify-between items-center">
                            <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-lg ${
                                    currentPage === 1
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                                } transition-colors duration-200`}
                            >
                                Previous
                            </button>
                            <span className="text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-lg ${
                                    currentPage === totalPages
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                                } transition-colors duration-200`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Popup/Modal */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-[90%] sm:max-w-lg">
                        <h3 className="text-lg sm:text-xl font-semibold mb-4">KYC Details</h3>
                        {selectedItem.type === "video" ? (
                            <video
                                src={selectedItem.url}
                                controls
                                className="w-full max-h-48 sm:max-h-64 rounded mb-4"
                            >
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img
                                src={selectedItem.url}
                                alt="KYC Preview"
                                className="w-full max-h-48 sm:max-h-64 object-contain rounded mb-4"
                            />
                        )}
                        <p className="text-gray-700 break-all text-sm sm:text-base">
                            <strong>URL:</strong> {selectedItem.url}
                        </p>
                        <button
                            onClick={closePopup}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 w-full sm:w-auto"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
