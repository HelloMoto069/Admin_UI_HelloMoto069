// UserTable.js
import React from "react";

const UserTable = ({
  currentUsers,
  selectedRows,
  handleSelectRow,
  handleEdit,
  handleDelete,
  handleSelectAllRows,
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectedRows.length === currentUsers.length}
              onChange={handleSelectAllRows}
              className="checkbox-input"
            />
            <span className="checkbox-custom"></span>
          </th>
          {/* Add your table headers here */}
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentUsers.map((user) => (
          <tr
            key={user.id}
            className={selectedRows.includes(user.id) ? "selected" : ""}
          >
            <td>
              <input
                type="checkbox"
                checked={selectedRows.includes(user.id)}
                onChange={() => handleSelectRow(user.id)}
              />
            </td>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button className="edit-row" onClick={() => handleEdit(user)}>
                Edit
              </button>
              <button
                className="delete-row"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
