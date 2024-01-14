import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const itemsPerPage = 10;

  // Calculate the current page's subset of users
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  useEffect(() => {
    // Fetch users from API
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle search/filter
  useEffect(() => {
    const filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  }, [searchTerm, users]);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  // Pagination logic
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle row selection
  const handleSelectRow = (userId) => {
    const isSelected = selectedRows.includes(userId);
    if (isSelected) {
      setSelectedRows(selectedRows.filter((id) => id !== userId));
    } else {
      setSelectedRows([...selectedRows, userId]);
    }
  };

  // Handle delete selected rows
  const handleDeleteSelected = () => {
    const updatedUsers = users.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedRows([]);
    setSearchTerm("");
    toast.error("Delete Sucessfully !", {
      position: "top-right",
      autoClose: 1700,
      theme: "dark",
    });
  };

  // Handle edit action
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  // Handle save action
  const handleSave = () => {
    // Implement your save logic here
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? editingUser : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setEditingUser(null);
    toast.success("Saved Successfully!", {
      position: "top-right",
      autoClose: 1700,
      theme: "dark",
    });
  };

  // Handle cancel action
  const handleCancel = () => {
    setEditingUser(null);
    toast.error("Not Saved !", {
      position: "top-right",
      autoClose: 1700,
      theme: "dark",
    });
  };

  // Handle delete action
  const handleDelete = (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setSelectedRows(selectedRows.filter((id) => id !== userId));
      toast.error("Delete Sucessfully !", {
        position: "top-right",
        autoClose: 1700,
        theme: "dark",
      });
    }
  };

  const handleSelectAllRows = (event) => {
    const { checked } = event.target;
    const allRowIds = currentUsers.map((user) => user.id);

    if (checked && selectedRows.length !== allRowIds.length) {
      setSelectedRows(allRowIds);
      toast.warn("Hey You Selected All !", {
        position: "top-right",
        autoClose: 1700,
        theme: "dark",
      });
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div className="container">
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="clear-search-button" onClick={() => setSearchTerm("")}>
        Clear Search
      </button>

      <table className="table">
        {/* Table headers */}
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
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            {/* Add other columns as needed */}
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {filteredUsers
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((user) => (
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
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="delete-row"
                    onClick={() => handleDelete(user.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingUser && (
        <div className="modal">
          <div className="modal-content">
            {/* <label>Name: </label>
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
            /> */}
            {/* <label>Email: </label>
            <input
              type="text"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            /> */}
            {/* <label>Role: </label>
            <input
              type="text"
              value={editingUser.role}
              onChange={(e) =>
                setEditingUser({ ...editingUser, role: e.target.value })
              }
            /> */}
            {/* <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button> */}
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
      )}

      {/* Pagination */}
      <div className="pagination">
        {/* Delete selected button */}
        <button
          className="delete-selected-button"
          onClick={() => handleDeleteSelected()}
          disabled={selectedRows.length === 0}
        >
          Delete Selected
        </button>
        <button
          onClick={() => paginate(1)}
          disabled={currentPage === 1}
          className="first-page"
        >
          <i className="fas fa-angle-double-left"></i>
        </button>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="previous-page"
        >
          <i className="fas fa-angle-left"></i>
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="next-page"
        >
          <i className="fas fa-angle-right"></i>
        </button>
        <button
          onClick={() => paginate(totalPages)}
          disabled={currentPage === totalPages}
          className="last-page"
        >
          <i className="fas fa-angle-double-right"></i>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
