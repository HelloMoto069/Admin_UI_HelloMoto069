import React from "react";

const TableRow = ({
  user,
  selectedRows,
  handleSelectRow,
  handleEdit,
  handleDelete,
}) => {
  return (
    <tr className={selectedRows.includes(user.id) ? "selected" : ""}>
      {/* Table cells */}
    </tr>
  );
};

export default TableRow;
