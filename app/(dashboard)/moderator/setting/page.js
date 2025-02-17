"use client";
import { useState, useEffect } from "react";
import { BsPencil, BsFillTrash3Fill } from "react-icons/bs";
import { Modal, Button } from "react-bootstrap";

export default function SettingsPage() {
  const [settings, setSettings] = useState([]);
  const [newSetting, setNewSetting] = useState({ transactionType: "", amount: "" });
  const [addNew, setAddNew] = useState(null);
  const [editing, setEditing] = useState(null);
  const [updatedSetting, setUpdatedSetting] = useState({ transactionType: "", amount: "" });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);


  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const res = await fetch("/api/settings");
    const data = await res.json();
    setSettings(data);
  };

  const handleCreate = async () => {
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSetting),
    });
    if (res.ok) {
      fetchSettings();
      setNewSetting({ transactionType: "", amount: "" });
      setAddNew(null);
    }
  };

  const handleUpdate = async (id) => {
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updatedSetting }),
    });
    if (res.ok) fetchSettings();
    setEditing(null);
  };

  const handleDelete = async (id) => {
    const res = await fetch("/api/settings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchSettings();
  };

  return (
    <>
      <main className="container">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="bold">Your Charges List</h5>
          <button className="btn btn-outline-danger px-5" data-bs-toggle="modal" onClick={() => { setAddNew(true); }} data-bs-target="#addModal">
            Add New
          </button>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive bg-white py-3 rounded-4 shadow-xs">
              <table className="table tablespace text-center ">
                <thead className="thead-bg">
                  <tr>
                    <th className="text-start">Transaction Type</th>
                    <th>Amount</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody className="tbody-bg">
                  {settings.map((setting) => (
                    <tr key={setting._id}>
                      <td className="text-start">{setting.transactionType}</td>
                      <td>${setting.amount}</td>
                      <td className="text-end align-middle">
                        <div className="d-flex justify-content-end gap-1">
                          <button
                            className="btn btn-sm "
                            title="Edit"
                            data-bs-toggle="modal"
                            data-bs-target="#editModal"
                            onClick={() => {
                              setEditing(setting._id);
                              setUpdatedSetting({
                                transactionType: setting.transactionType,
                                amount: setting.amount,
                              });
                            }}
                          >
                            <BsPencil />
                          </button>
                          <button
                            className="btn btn-sm "
                            title="Delete"
                            onClick={() => {
                              setSelectedId(setting._id);
                              setConfirmDelete(true);
                            }}
                          >
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
      </main>

      {/* Confirmation Modal */}
      <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete(selectedId); // Delete selected item
              setConfirmDelete(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Modal */}
      {addNew && (
        <div className="modal fade show d-block" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-white border-0">
                <h1 className="modal-title fs-5">Add New</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setAddNew(null)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Transaction Type</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter here"
                      value={newSetting.transactionType}
                      onChange={(e) => setNewSetting({ ...newSetting, transactionType: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter here"
                      value={newSetting.amount}
                      onChange={(e) => setNewSetting({ ...newSetting, amount: e.target.value })}
                    />
                  </div>
                  <div className="d-grid pt-3">
                    <button type="button" className="btn btn-danger" onClick={handleCreate}>
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="modal fade show d-block" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-white border-0">
                <h1 className="modal-title fs-5">Edit Transaction</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setEditing(null)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Transaction Type</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter here"
                      value={updatedSetting.transactionType}
                      onChange={(e) =>
                        setUpdatedSetting({ ...updatedSetting, transactionType: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter here"
                      value={updatedSetting.amount}
                      onChange={(e) => setUpdatedSetting({ ...updatedSetting, amount: e.target.value })}
                    />
                  </div>
                  <div className="d-grid pt-3">
                    <button type="button" className="btn btn-danger" onClick={() => handleUpdate(editing)}>
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
