import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation for checking the current route

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown open/close state
  const location = useLocation(); // Get current route using useLocation()

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Dashboard</h2>
      </div>
      <ul className="sidebar-links">
        <li>
          <Link to="/home" className={isActive("/home")}>Home</Link>
        </li>
        
        {/* Department Dropdown */}
        <li className="dropdown">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            Departments
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/departments/create" className={isActive("/departments/create")}>
                  Create Department
                </Link>
              </li>
              <li>
                <Link to="/departments/view" className={isActive("/departments/view")}>
                  View Departments
                </Link>
              </li>
            </ul>
          )}
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
