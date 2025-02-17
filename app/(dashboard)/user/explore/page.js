"use client";
"use client";
import { useState, useEffect, useMemo } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const ProfilePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    gender: "",
    ageRange: "",
    location: "",
    religion: "",
    education: "",
    profession: "",
  });

  // Fetch users from API
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("/api/getallUsers");
        if (!response.ok) throw new Error("Failed to fetch profiles");
        const data = await response.json();
        setProfiles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  // Handle filter change
  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Optimized filtering with case insensitivity & null checks
  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      const gender = profile.gender?.toLowerCase() || "";
      const location = profile.location?.toLowerCase() || "";
      const religion = profile.religion?.toLowerCase() || "";
      const education = profile.education?.toLowerCase() || "";
      const profession = profile.profession?.toLowerCase() || "";
      const age = profile.age || 0;

      return (
        (!filters.gender || gender === filters.gender.toLowerCase()) &&
        (!filters.location || location === filters.location.toLowerCase()) &&
        (!filters.religion || religion === filters.religion.toLowerCase()) &&
        (!filters.education || education === filters.education.toLowerCase()) &&
        (!filters.profession || profession === filters.profession.toLowerCase()) &&
        (!filters.ageRange ||
          (filters.ageRange === "18-25" && age >= 18 && age <= 25) ||
          (filters.ageRange === "26-35" && age >= 26 && age <= 35) ||
          (filters.ageRange === "36-45" && age >= 36 && age <= 45) ||
          (filters.ageRange === "46+" && age >= 46))
      );
    });
  }, [profiles, filters]);

  const handleMatch = async (receiverId) => {
    try {
      const senderId = "67b2139e66a17f0c7869a85b"; // Replace with logged-in user's ID
      const response = await fetch("/api/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId, receiverId }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Match created!");
      } else {
        alert(data.message || "Error creating match");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  if (loading) return <p className="text-center">Loading profiles...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="row">
      {/* Profile Cards Section */}
      <div className="col-12 col-md-8">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <div key={profile._id || profile.id} className="profile-card rounded-3 mb-4 border-0 shadow-sm">
              <img src={profile.profilePicture} alt={profile.username} onError={(e) => e.target.src = "/assets/img/bg01.png"} className="object-fit img-fluid" style={{ width: "100%", height:"300px" }} />
              <div className="bottom-left text-black my-2">
                <h5>{profile.fullName}</h5>
                <p>{profile.aboutMe}</p>
                <span className="badge rounded-pill text-bg-light px-3 py-2 me-2"><FaLocationDot /> {profile.country}</span>
                <span className="badge rounded-pill text-bg-light px-3 py-2">{profile.religion}</span>
              </div>

              <div className="bottom-right text-black my-2">
                <span className="badge bg-danger rounded-circle p-3"  onClick={() => handleMatch(profile._id)}><FaHeart className="fs-28" /></span>
              </div>
            </div>

            
          ))
        ) : (
          <p className="text-center text-muted">No profiles match the selected filters.</p>
        )}
      </div>

      {/* Filter Section */}
      <div className="col-12 col-md-4">
        <h5 className="mb-4">Filter your search!</h5>

        {[
          { label: "Gender", name: "gender", options: ["Male", "Female", "Other"] },
          { label: "Age Range", name: "ageRange", options: ["18-25", "26-35", "36-45", "46+"] },
          { label: "Location", name: "location", options: ["New York", "Los Angeles", "Chicago"] },
          { label: "Religion", name: "religion", options: ["Christianity", "Islam", "Hinduism", "Atheism"] },
          { label: "Education", name: "education", options: ["High School", "Bachelor's Degree", "Master's Degree"] },
          { label: "Profession", name: "profession", options: ["Engineer", "Doctor", "Artist", "Entrepreneur", "Architect"] },
        ].map((field) => (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>
            <select className="form-select" name={field.name} value={filters[field.name]} onChange={handleChange}>
              <option value="">Select Here</option>
              {field.options.map((option, index) => (
                <option key={index} value={option.toLowerCase()}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
