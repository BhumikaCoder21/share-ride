import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate(); // ✅ make sure this is called inside the component

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
        <button className="post-button" onClick={() => navigate("/post")}>
          + Post a Ride
        </button>
        <button className="navbar-logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
