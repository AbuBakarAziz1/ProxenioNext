import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function EditUserModal({ show, handleClose, user, fetchUsers }) {
    const [updatedUser, setUpdatedUser] = useState(user || {});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setUpdatedUser(user || {});
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (id) => {
        if (!updatedUser || !updatedUser._id) {
            setError("Invalid user data");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/userroles", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, ...updatedUser }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to update user");

            handleClose(); // Close modal
            fetchUsers();  // Refetch users list to reflect the update
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p className="text-danger">{error}</p>}
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={updatedUser.username || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Select name="role" value={updatedUser.role || ""} onChange={handleChange}>
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                            <option value="user">User</option>
                        </Form.Select>
                    </Form.Group>

                    <div className="d-grid pt-3">
                        <Button variant="danger" onClick={() => handleSubmit(updatedUser._id)} disabled={loading}>
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditUserModal;
