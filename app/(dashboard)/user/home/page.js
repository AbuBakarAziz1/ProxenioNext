"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProfileCreation() {
  
  const router = useRouter();
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    _id: "67b0e765690e11c27231aaf9", // Add this to store the profile ID
    username: "",
    age: "",
    city: "",
    religion: "",
    profession: "",
    gender: "",
    phone: "",
    country: "",
    state: "",
    education: "",
    profilePhoto: null,
    aboutMe: "",
    travelInterest: [],  // Change from "" to []
    hobbiesInterest: [],  // Change from "" to []
    videoIntro: null,
  })

 

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.files[0],
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step < 4) {
      setStep(step + 1)
    } else {
      try {
        const response = await fetch("/api/update-profile", {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData }), // Ensure _id is included
      });s

        const result = await response.json()

        console.log(result);

        if (result.success) {
          alert("Profile updated successfully!")
          //router.push("/profile") // Redirect to profile page or dashboard
        } else {
          alert("Error updating profile. Please try again.")
        }
      } catch (error) {
        console.error("Error:", error)
        alert("An error occurred. Please try again.")
      }
    }
  }

  const renderStepIndicator = () => (
    <div className="step-indicator">
      {[1, 2, 3, 4].map((stepNumber) => (
        <Link
          key={stepNumber}
          href="#"
          className="text-decoration-none text-reset"
          onClick={(e) => {
            e.preventDefault()
            setStep(stepNumber)
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <div className={`step ${step === stepNumber ? "active" : ""}`}>{stepNumber}</div>
            <div className="step-title">
              {stepNumber === 1 && "Profile Creation"}
              {stepNumber === 2 && "Profile Details"}
              {stepNumber === 3 && "Video Introduction"}
              {stepNumber === 4 && "Review and Submit"}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <>
    
   <div className="d-flex justify-content-between flex-wrap mb-4">
      {steps.map((step) => (
        <Link key={step.id} href={step.path} legacyBehavior>
          <a className="text-decoration-none text-reset d-flex align-items-center gap-3">
            <div
              className={`d-flex align-items-center justify-content-center rounded-circle border border-danger fw-bold ${
                step.id < currentStep ? "bg-light text-danger" : "bg-danger text-white"
              }`}
              style={{ width: "40px", height: "40px" }}
            >
              {step.id}
            </div>
            <div className="fw-medium text-dark">{step.title}</div>
          </a>
        </Link>
      ))}
    </div>


      <h4 className="mb-4">Profile Creation</h4>
      <div className="row g-3">
        {/* Left Column */}
        <div className="col-md-6">
          <div className="mb-3 row">
            <label className="col-sm-4 col-form-label">
              Full Name <span className="text-danger">*</span>
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter here"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="age" className="col-sm-4 col-form-label">
              Age <span className="text-danger">*</span>
            </label>
            <div className="col-sm-8">
              <input
                type="number"
                className="form-control"
                id="age"
                name="age"
                placeholder="Enter here"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-4 col-form-label">
              Email Address <span className="text-danger">*</span>
            </label>
            <div className="col-sm-8">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter here"
                
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="city" className="col-sm-4 col-form-label">
              City <span className="text-danger">*</span>
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                placeholder="Enter here"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="religion" className="col-sm-4 col-form-label">
              Religion
            </label>
            <div className="col-sm-8">
              <select
                className="form-select"
                id="religion"
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
              >
                <option value="">Select Here</option>
                <option value="Religion 1">Religion 1</option>
                <option value="Religion 2">Religion 2</option>
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="profession" className="col-sm-4 col-form-label">
              Profession
            </label>
            <div className="col-sm-8">
              <select
                className="form-select"
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleInputChange}
              >
                <option value="">Select Here</option>
                <option value="Profession 1">Profession 1</option>
                <option value="Profession 2">Profession 2</option>
              </select>
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="col-md-6">
          <div className="mb-3 row">
            <label htmlFor="gender" className="col-sm-4 col-form-label">
              Gender <span className="text-danger">*</span>
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="gender"
                name="gender"
                placeholder="Enter here"
                value={formData.gender}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="phone" className="col-sm-4 col-form-label">
              Phone Number <span className="text-danger">*</span>
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Enter here"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="country" className="col-sm-4 col-form-label">
              Country <span className="text-danger">*</span>
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                placeholder="Enter here"
                value={formData.country}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="state" className="col-sm-4 col-form-label">
              State/Province <span className="text-danger">*</span>
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                placeholder="Enter here"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="education" className="col-sm-4 col-form-label">
              Education
            </label>
            <div className="col-sm-8">
              <select
                className="form-select"
                id="education"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
              >
                <option value="">Select Here</option>
                <option value="High School">High School</option>
                <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
                <option value="Master's Degree">Master&apos;s Degree</option>
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="profilePhoto" className="col-sm-4 col-form-label">
              Profile Photo <span className="text-danger">*</span>
            </label>
            <div className="col-sm-8">
              <input
                type="file"
                className="form-control"
                id="profilePhoto"
                name="profilePhoto"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )

  const renderStep2 = () => (
    <>
      <h4 className="mb-4">Profile Details</h4>
      <div className="row g-3">
        <div className="col-md-12">
          <div className="mb-3 row">
            <label htmlFor="aboutMe" className="col-sm-2 col-form-label">
              About Me <span className="text-danger">*</span>
            </label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                rows="4"
                id="aboutMe"
                name="aboutMe"
                placeholder="Enter here"
                value={formData.aboutMe}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </div>
        {/* Left Column */}
        <div className="col-md-6">
          <div className="mb-3 row">
            <label htmlFor="travelInterests" className="col-sm-4 col-form-label">
              Travel interests <span className="text-danger">*</span>
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="travelInterest"
                name="travelInterest"
                placeholder="Enter here"
                value={formData.travelInterest}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="col-md-6">
          <div className="mb-3 row">
            <label htmlFor="hobbiesInterest" className="col-sm-4 col-form-label">
              Hobbies and Interests <span className="text-danger">*</span>
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="hobbiesInterest"
                name="hobbiesInterest"
                placeholder="Enter here"
                value={formData.hobbiesInterest}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )

  const renderStep3 = () => (
    <>
      <h4 className="mb-4">Video Introduction</h4>
      <div className="row g-3">
        <div className="col-md-12">
          <div className="mb-3 row">
            <label htmlFor="videoIntro" className="col-sm-2 col-form-label">
              Upload Video <span className="text-danger">*</span>
            </label>
            <div className="col-sm-10">
              <input
                type="file"
                className="form-control"
                id="videoIntro"
                name="videoIntro"
                accept="video/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )

  const renderStep4 = () => (
    <>
      <h4 className="mb-4">Review and Submit</h4>
      <div className="row g-3">
        <div className="col-md-6">
          <h5>Profile Creation</h5>
          <p>
            <strong>Full Name:</strong> {formData.username}
          </p>
          <p>
            <strong>Age:</strong> {formData.age}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>City:</strong> {formData.city}
          </p>
          <p>
            <strong>Religion:</strong> {formData.religion}
          </p>
          <p>
            <strong>Profession:</strong> {formData.profession}
          </p>
          <p>
            <strong>Gender:</strong> {formData.gender}
          </p>
          <p>
            <strong>Phone:</strong> {formData.phone}
          </p>
          <p>
            <strong>Country:</strong> {formData.country}
          </p>
          <p>
            <strong>State/Province:</strong> {formData.state}
          </p>
          <p>
            <strong>Education:</strong> {formData.education}
          </p>
          <p>
            <strong>Profile Photo:</strong> {formData.profilePhoto ? formData.profilePhoto.name : "Not uploaded"}
          </p>
        </div>
        <div className="col-md-6">
          <h5>Profile Details</h5>
          <p>
            <strong>About Me:</strong> {formData.aboutMe}
          </p>
          <p>
            <strong>Travel Interests:</strong> {formData.travelInterests}
          </p>
          <p>
            <strong>Hobbies and Interests:</strong> {formData.hobbiesInterests}
          </p>

          <h5 className="mt-4">Video Introduction</h5>
          <p>
            <strong>Video:</strong> {formData.videoIntro ? formData.videoIntro.name : "Not uploaded"}
          </p>
        </div>
      </div>
    </>
  )

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card shadow-sm border-0 bg-fff p-4 rounded-4">
          {renderStepIndicator()}
          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
            <div className="d-flex justify-content-end mt-4">
              {step > 1 && (
                <button type="button" className="btn btn-secondary px-5 me-2" onClick={() => setStep(step - 1)}>
                  Previous
                </button>
              )}
              <button type="submit" className="btn btn-danger px-5">
                {step < 4 ? "Next" : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

