import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

const ImageKYC: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user", // "environment" for rear camera on mobile
    };

    const handleCaptureImage = useCallback(() => {
        if (!webcamRef.current) {
            setError("Camera not accessible. Please allow camera permissions.");
            return;
        }
        const image = webcamRef.current.getScreenshot();
        if (!image) {
            setError("Failed to capture image.");
            return;
        }
        setImageSrc(image);
    }, []);

    const handleSaveImage = useCallback(() => {
        if (!imageSrc) {
            setError("No image captured yet.");
            return;
        }
        const a = document.createElement("a");
        a.href = imageSrc;
        a.download = "kyc-image.jpeg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setImageSrc(null);
    }, [imageSrc]);

    return (
        <div className="pt-[4.5rem] min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
            <h2 className="text-2xl font-bold text-indigo-600 mb-6">Image KYC</h2>

            {/* Webcam Feed */}
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="w-full max-w-2xl rounded-lg shadow-md"
            />

            {/* Error Message */}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {/* Captured Image Preview */}
            {imageSrc && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Captured Image</h3>
                    <img
                        src={imageSrc}
                        alt="Captured"
                        className="w-full max-w-2xl rounded-lg shadow-md"
                    />
                </div>
            )}

            {/* Controls */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                    onClick={handleCaptureImage}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                    Capture Image
                </button>
                {imageSrc && (
                    <button
                        onClick={handleSaveImage}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                        Save Image
                    </button>
                )}
            </div>
        </div>
    );
};

export default ImageKYC;
