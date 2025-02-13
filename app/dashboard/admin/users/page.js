"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { BsPencil , BsFillTrash3Fill  } from "react-icons/bs";

export default function UserTable() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
      }, []);
    
      async function fetchUsers() {
        try {
          const res = await fetch("/api/users");
          if (!res.ok) throw new Error("Failed to fetch users");
          const data = await res.json();
          setUserList(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      }


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
                  <td><input type="checkbox" /></td>
                  <td>{user.id}</td>
                  <td>
                    <Image
                      src={user.image}
                      width={40}
                      height={40}
                      className="img-fluid rounded-pill border"
                      alt="User"
                    />
                  </td>
                  <td>{user.username}</td>
                  <td>{user.location}</td>
                  <td>{user.contact}</td>
                  <td>
                    <button className={`btn rounded-pill ${user.status === "Active" ? "bg-green-btn" : "bg-light-btn"}`}>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
