import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
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

  // Fetch data from API
  useEffect(() => {
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
    setCurrentPage(1); // Reset to the first page after filtering
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
    toast.error("Delete Successfully!", {
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
    toast.error("Not Saved!", {
      position: "top-right",
      autoClose: 1700,
      theme: "dark",
    });
  };

  // Handle select all rows
  const handleSelectAllRows = (event) => {
    const { checked } = event.target;
    const allRowIds = currentUsers.map((user) => user.id);
  
    if (checked) {
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

  // Handle delete action
  const handleDelete = (userId) => {
    // const confirmDelete = window.confirm("Are you sure you want to delete this user?");

    // if (confirmDelete) {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedRows(selectedRows.filter((id) => id !== userId));
    toast.error("Delete Successfully!", {
      position: "top-right",
      autoClose: 1700,
      theme: "dark",
    });
    // }
  };

  // Calculate the current page's subset of users
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="container">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <UserTable
        currentUsers={currentUsers}
        selectedRows={selectedRows}
        handleSelectRow={handleSelectRow}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleSelectAllRows={handleSelectAllRows}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
      <div className="btn-container">
        <button
          className="delete-selected-button"
          onClick={handleDeleteSelected}
          disabled={selectedRows.length === 0}
        >
          Delete Selected
        </button>
      </div>
      <ToastContainer />
      {editingUser && (
        <Modal
          editingUser={editingUser}
          setEditingUser={setEditingUser}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default App;
