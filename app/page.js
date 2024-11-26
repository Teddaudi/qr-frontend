"use client"; // Ensure it's a client-side component
import React, { useState } from "react";
import axios from "axios";

const VerifyQRCode = () => {
    const [qrCodeId, setQrCodeId] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [image,setImage] = useState("")
    const handleVerify = async () => {
        // setMessage("");
        // setError("");

        // if (!qrCodeId.trim()) {
        //     setError("Please enter a QR code ID.");
        //     return;
        // }

        try {
            const response = await axios.post(`https://menu-management-system.onrender.com/qr/generate`);
            setImage(response.data.qrImagePath)
            setMessage(response.data.message); // Success message from backend
        } catch (err) {
            if (err.response) {
                // Backend error
                setError(err.response.data.error || "Verification failed.");
            } else {
                // Network or other error
                setError("An unexpected error occurred.");
            }
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
            <button
                onClick={handleVerify}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    width: "100%",
                }}
            >
                Verify QR Code
            </button>
            {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            {image && <img src={image} alt="image"/>}
        </div>
    );
};

export default VerifyQRCode;

