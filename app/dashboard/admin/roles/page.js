"use client";
import { useState, useEffect } from "react";
import { BsPencil , BsFillTrash3Fill  } from "react-icons/bs";

export default function RoleManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "moderator",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }



  async function addUser() {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error("Failed to add user");
      fetchUsers();
      setNewUser({ name: "", email: "", role: "moderator", password: "" });
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5>Active Roles</h5>
        <button
          className="btn btn-outline-danger px-5"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add New
        </button>
      </div>

      {/* User Table */}
      <div className="table-responsive bg-white p-3 rounded-4 shadow-sm">
        <table className="table text-center">
          <thead className="align-items-center bg-light">
            <tr>
              <th></th>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Password</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={user._id}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>******</td>
                <td className="text-end">
                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-sm ">
                      <BsPencil />
                    </button>
                    <button className="btn btn-sm ">
                      <BsFillTrash3Fill />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding User */}
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-white border-0">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter here"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Roles</label>
                  <select
                    className="form-select"
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                  >
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="*****"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                  />
                </div>

                <div className="d-grid pt-3">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={addUser}
                    data-bs-dismiss="modal"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
