import React, { useState } from "react";
import { Modal, Button, Form, Toast, ToastContainer } from "react-bootstrap";

const AddPaymentModal = ({ show, handleClose, refreshTransactions }) => {
  const [paymentData, setPaymentData] = useState({
    userId: "",
    name: "",
    amount: "",
    date: "",
    source: "",
    status: "Pending",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  // Add new payment
  const addPayment = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add payment");

      setShowToast(true); // Show success toast
      setPaymentData({ userId: "", name: "", amount: "", date: "", source: "", status: "Pending" }); // Reset form
      refreshTransactions(); // Refresh the list
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
        <Toast bg="success" show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Body className="text-white">Payment Added Successfully!</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control type="text" name="userId" value={paymentData.userId} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={paymentData.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" name="amount" value={paymentData.amount} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" value={paymentData.date} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Source</Form.Label>
              <Form.Control type="text" name="source" value={paymentData.source} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={paymentData.status} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>

            <div className="d-grid pt-3">
              <Button variant="danger" type="button" onClick={addPayment} disabled={loading}>
                {loading ? "Saving..." : "Save Payment"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddPaymentModal;
