"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BsPencil, BsFillTrash3Fill } from "react-icons/bs";

export default function UserTable() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUserList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="text-center">Loading...</p>; // Show loading message
  if (error) return <p className="text-center text-danger">{error}</p>; // Show error message

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="table-responsive bg-white p-3 rounded-4">
          <table className="table tablespace text-center">
            <thead className="align-items-center thead-bg">
              <tr>
                <th></th>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-grayer tbody-bg">
              {userList.map((user, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" className="form-check-input" />
                  </td>
                  <td>{user.id}</td>
                  <td>
                    <Image
                      src={user.image || "/assets/img/user.png"} // Handle missing images
                      width={40}
                      height={40}
                      className="img-fluid rounded-pill border"
                      alt={user.username || "User"}
                    />
                  </td>
                  <td>{user.fullName}</td>
                  <td>{user.country}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button
                      className={`btn rounded-pill text-capitalize  ${
                        user.status === "active" ? "bg-green-btn" : "bg-light-btn"
                      }`}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td className="text-center align-middle">
                    <div className="d-flex justify-content-center gap-1">
                      <a href="/matches-detail">
                        <button className="btn btn-sm" title="Edit">
                          <BsPencil />
                        </button>
                      </a>
                      <button className="btn btn-sm" title="Delete">
                        <BsFillTrash3Fill className="text-danger" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {userList.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
