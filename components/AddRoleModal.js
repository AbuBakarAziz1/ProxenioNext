import React, { useState } from "react";
import { Modal, Button, Form, Toast, ToastContainer } from "react-bootstrap";

const AddUserModal = ({ show, handleClose }) => {
  const [newUser, setNewUser] = useState({
    username: "",
    role: "user",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Function to add user
  const addUser = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add user");

      setShowToast(true); // Show success toast
      setNewUser({ username: "", role: "user", email: "", password: "" }); // Reset form
      handleClose(); // Close modal
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="success"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">User Added Successfully!</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter here"
                value={newUser.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Roles</Form.Label>
              <Form.Select name="role" value={newUser.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
               
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="name@example.com"
                value={newUser.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="*******"
                value={newUser.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-grid pt-3">
              <Button variant="danger" type="button" onClick={addUser} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddUserModal;




// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form } from "react-bootstrap";

// const AddUserModal = ({ fetchUsers }) => {
//   const [show, setShow] = useState(false);
//   const [newUser, setNewUser] = useState({
//     name: "",
//     email: "",
//     role: "moderator",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Open/Close Modal
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   // Handle Input Change
//   const handleChange = (e) => {
//     setNewUser({ ...newUser, [e.target.name]: e.target.value });
//   };

//   // Add User API Call
//   async function addUser() {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetch("/api/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newUser),
//       });

//       if (!res.ok) throw new Error("Failed to add user");

//       // Refresh User List
//       fetchUsers();
//       setNewUser({ name: "", email: "", role: "moderator", password: "" });
//       handleClose();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <>
//       {/* Add New Button */}
//       <Button className="btn btn-outline-danger px-5" onClick={handleShow}>
//         Add New
//       </Button>

//       {/* Modal */}
//       <Modal show={show} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {error && <div className="alert alert-danger">{error}</div>}
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 placeholder="Enter here"
//                 value={newUser.name}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Roles</Form.Label>
//               <Form.Select name="role" value={newUser.role} onChange={handleChange}>
//                 <option value="moderator">Moderator</option>
//                 <option value="admin">Admin</option>
//                 <option value="user">User</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 placeholder="name@example.com"
//                 value={newUser.email}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="password"
//                 placeholder="*****"
//                 value={newUser.password}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <div className="d-grid pt-3">
//               <Button variant="danger" type="button" onClick={addUser} disabled={loading}>
//                 {loading ? "Saving..." : "Save"}
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default AddUserModal;
