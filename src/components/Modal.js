import React from "react";

const Modal = ({ editingUser, setEditingUser, handleSave, handleCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Details</h3>
        <p>ID: {editingUser.id}</p>
        <p>
          Name:{" "}
          <input
            type="text"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
          />
        </p>
        <p>
          Email:{" "}
          <input
            type="text"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />
        </p>
        <p>
          Role:{" "}
          <input
            type="text"
            value={editingUser.role}
            onChange={(e) =>
              setEditingUser({ ...editingUser, role: e.target.value })
            }
          />
        </p>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
