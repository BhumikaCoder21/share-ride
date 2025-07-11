import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>
        &copy; {new Date().getFullYear()} ShareRide | Made with ❤️ for NIT
        Arunachal Pradesh
      </p>
    </footer>
  );
};

export default Footer;
