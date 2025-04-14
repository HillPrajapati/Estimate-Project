import React, { useState, useEffect } from "react";
import './Component.css';  // Import the CSS file

const Table = ({
  columns,
  rows,
  onEdit,
  onDelete,
  rowsPerPage = 5,   // Default value of 5 rows per page
  currentPage = 1,  // Default value of current page as 1
  setCurrentPage,
  setRowsPerPage,
  totalRow, 
  roleName
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: null, 
    direction: 'asc' // By default, sorting is ascending
  });

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setRowsPerPage(pageNumber);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setCurrentPage(parseInt(event.target.value, 10)); // Reset to the first page when rows per page change
    setRowsPerPage(1);
  };

  const totalPages = Math.ceil(totalRow / rowsPerPage);

  // Sorting logic
  const sortRows = (rows) => {
    if (sortConfig.key) {
      return rows.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        // Check if the values are numbers or strings and compare accordingly
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc' 
            ? aValue - bValue 
            : bValue - aValue;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return 0; // Handle cases where the value is neither a string nor a number
      });
    }
    return rows;
  };

  const handleColumnClick = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const currentRows = sortRows(rows); // Sort rows based on the current sorting config

  const renderWithLineBreaks = (content) => {
    if (typeof content === 'string') {
      return content.split('\n').map((str, index) => (
        <span key={index}>{str}<br /></span>
      ));
    }
    return content;
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.value} onClick={() => handleColumnClick(column.value)}>
                {column.name}
                {sortConfig.key === column.value ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}
              </th>
            ))}
            {roleName === "Manager" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.value}>
                  {column.value === 'assignedEmployees'
                    ? renderWithLineBreaks(row[column.value])
                    : (row[column.value] || '-')}
                </td>
              ))}
              {roleName === "Manager" && <td>
                <button
                  onClick={() => onEdit(row)}
                  className="edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(row.id)}
                  className="delete"
                >
                  Delete
                </button>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Rows per page control */}
      <div className="rows-per-page">
        <label htmlFor="rowsPerPage">Rows per page: </label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
        >
          {[5, 10, 15, 20].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="prev-btn"
        >
          Prev
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="next-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
