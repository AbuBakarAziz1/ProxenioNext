"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const TabSection = ({ userId }) => {
  const [activeTab, setActiveTab] = useState("hearts-sent");
  const [data, setData] = useState({ sentHearts: [], receivedHearts: [], matches: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/getmatches?userId=${userId}`);
        const result = await response.json();
        if (response.ok) {
          setData(result);
        } else {
          setError(result.error || "Error fetching data");
        }
      } catch (err) {
        setError("Server error. Try again later.");
      }
      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  // Tab options
  const tabs = [
    { id: "hearts-sent", title: "Hearts Sent", dataKey: "sentHearts" },
    { id: "hearts-received", title: "Hearts Received", dataKey: "receivedHearts" },
    { id: "matches-made", title: "Matches Made", dataKey: "matches" },
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="pb-2">
            {/* Tabs */}
            <ul className="nav" role="tablist">
              {tabs.map((tab) => (
                <li className="nav-item" key={tab.id}>
                  <button
                    className={`nav-link ${activeTab === tab.id ? "color-maroon active" : "text-black"}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.title}
                  </button>
                </li>
              ))}
            </ul>

            {/* Loading/Error Handling */}
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-danger">{error}</p>}

            {/* Tab Content */}
            {!loading && !error && (
              <div className="tab-content pt-3">
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={`tab-pane fade ${activeTab === tab.id ? "show active" : ""}`}
                  >
                    <div className="row g-3">
                      {data[tab.dataKey]?.length > 0 ? (
                        data[tab.dataKey].map((user) => (
                          <div className="col-md-4" key={user._id}>
                            <div className="card">
                              <img src={user.profilePicture || "/assets/img/bg01.png"} className="card-img-top" alt={user.fullName} />
                              <div className="card-body">
                                <h5 className="card-title">{user.fullName}</h5>
                                <p className="card-text">{user.aboutMe || "No description available."}</p>
                                <button className="badge rounded-pill text-bg-light border-0 px-3 py-2">
                                  <i className="bi bi-geo-alt-fill"></i> {user.country || "Unknown"}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-muted">No data available.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default TabSection;
