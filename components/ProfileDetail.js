import { useState } from "react";
import "./ProfileCreation.css"; // Import CSS file for styling

const ProfileCreation = () => {
    const [formData, setFormData] = useState({
        aboutMe: "",
        travelInterests: "",
        hobbies: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card shadow-sm border-0 bg-fff p-4 rounded-4">
                    {/* Step Indicator */}
                    <div className="step-indicator">
                        {[
                            "Profile Creation",
                            "Profile Details",
                            "Video Introduction",
                            "Review and Submit"
                        ].map((title, index) => (
                            <a href={`#`} className="text-decoration-none text-reset step-container" key={index}>
                                <div className={`d-flex align-items-center gap-3 step ${index === 1 ? "active-step" : "inactive-step"}`}>
                                    <div className="step-circle">{index + 1}</div>
                                    <div className="step-title">{title}</div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit}>
                        <h4 className="mb-4">Profile Details</h4>
                        <div className="row g-3">
                            <div className="col-md-12">
                                <div className="mb-3 row">
                                    <label htmlFor="aboutMe" className="col-sm-2 col-form-label">About Me <span className="text-danger">*</span></label>
                                    <div className="col-sm-10">
                                        <textarea className="form-control" rows="4" id="aboutMe" placeholder="Enter here" onChange={handleChange}></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3 row">
                                    <label htmlFor="travelInterests" className="col-sm-4 col-form-label">Travel Interests <span className="text-danger">*</span></label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="travelInterests" placeholder="Enter here" onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3 row">
                                    <label htmlFor="hobbies" className="col-sm-4 col-form-label">Hobbies and Interests <span className="text-danger">*</span></label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="hobbies" placeholder="Enter here" onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                            <button type="submit" className="btn btn-danger px-5">Next</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileCreation;