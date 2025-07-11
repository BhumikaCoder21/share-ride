// src/components/RideCard.js
import React from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaChair,
  FaPhone,
  FaCar,
  FaStickyNote,
  FaPaperPlane,
  FaTrash,
} from "react-icons/fa";
import "../styles/RideCard.css";

const RideCard = ({ ride, showContact, onConnect, onDelete }) => {
  return (
    <div className="ride-card">
      <h3>
        <FaUser className="icon blue" /> {ride.name}
      </h3>

      <p>
        <FaMapMarkerAlt className="icon red" /> <strong>From:</strong>{" "}
        {ride.source}
      </p>
      <p>
        <FaMapMarkerAlt className="icon green" /> <strong>To:</strong>{" "}
        {ride.destination}
      </p>
      <p>
        <FaCalendarAlt className="icon orange" /> <strong>Departure:</strong>{" "}
        {new Date(ride.time).toLocaleString()}
      </p>
      <p>
        <FaMoneyBillAlt className="icon yellow" /> <strong>Fare:</strong> ₹
        {ride.fare}
      </p>
      <p>
        <FaChair className="icon purple" /> <strong>Seats:</strong> {ride.seats}
      </p>

      {ride.note && (
        <p>
          <FaStickyNote className="icon grey" /> <strong>Note:</strong>{" "}
          {ride.note}
        </p>
      )}

      {showContact && (
        <div className="ride-contact-info">
          <p>
            <FaPhone className="icon green" /> <strong>Contact:</strong>{" "}
            {ride.contact}
          </p>
          <p>
            <FaCar className="icon blue" /> <strong>Vehicle:</strong>{" "}
            {ride.vehicle}
          </p>
        </div>
      )}

      <div className="ride-buttons">
        {!showContact && onConnect && (
          <button className="connect-btn" onClick={onConnect}>
            <FaPaperPlane className="btn-icon" /> Connect
          </button>
        )}

        {onDelete && (
          <button className="delete-btn" onClick={() => onDelete(ride.id)}>
            <FaTrash className="btn-icon" /> Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default RideCard;
