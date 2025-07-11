import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaUserCircle } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const toggleLogoutPopup = () => {
    setShowLogoutPopup((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/home" className="logo-link">
          <img
            src="https://www.nitap.ac.in/assets/logo_big.jpg"
            alt="Ride Sure Logo"
            className="navbar-logo"
          />
          <span className="navbar-title">Ride Sure</span>
        </a>
      </div>

      <div className="navbar-right">
        {/* === Desktop Buttons === */}
        <button
          className="post-button desktop-only"
          onClick={() => navigate("/post")}
        >
          <FaPlusCircle className="nav-icon" /> Post a Ride
        </button>
        <button className="navbar-logout-btn desktop-only" onClick={onLogout}>
          <FaUserCircle className="nav-icon" /> Logout
        </button>

        {/* === Mobile Icons === */}
        <div className="mobile-icon" onClick={() => navigate("/post")}>
          <FaPlusCircle className="nav-icon" title="Post a Ride" />
        </div>

        <div className="mobile-icon" onClick={toggleLogoutPopup}>
          <FaUserCircle className="nav-icon" title="Logout" />
          {showLogoutPopup && (
            <div className="logout-popup">
              <p>Are you sure you want to logout?</p>
              <button className="confirm-logout-btn" onClick={onLogout}>
                Yes, Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
