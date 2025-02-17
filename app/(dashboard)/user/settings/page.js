"use client";
import { useState, useEffect } from "react";

export default function Settings() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [userId, setUserId] = useState(null); // Store userId

    // Fetch userId when the component loads
    useEffect(() => {
        const storedUserId = localStorage.getItem("userId"); // Replace with your method
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        if (!userId) {
            setError("User ID is missing. Please log in again.");
            return;
        }

        setError(""); // Clear errors if everything is fine

        const response = await fetch("/api/auth/change-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, oldPassword, newPassword, confirmPassword }),
        });

        const data = await response.json();
        if (!response.ok) {
            setError(data.error);
        } else {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

            alert(data.message);
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>Change Password</h5>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="card shadow-sm border-0 bg-fff py-3 rounded-4">
                        <div className="card-body px-0">
                            <form onSubmit={handleSubmit}>
                                {error && <div className="alert alert-danger">{error}</div>}

                                <div className="mb-3">
                                    <label className="form-label">
                                        Old Password <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter here"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            New Password <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter here"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            Re-enter Password <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter here"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="text-end pt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-danger px-5"
                                        disabled={newPassword !== confirmPassword}
                                    >
                                        Save Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
