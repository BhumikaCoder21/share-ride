// src/components/RideCard.js
import React, { useState } from "react";

const RideCard = ({ ride }) => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        margin: "10px auto",
        maxWidth: "500px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{ride.name}</h3>
      <p>
        <strong>From:</strong> {ride.source}
      </p>
      <p>
        <strong>To:</strong> {ride.destination}
      </p>
      <p>
        <strong>Departure:</strong> {ride.time}
      </p>
      <p>
        <strong>Fare:</strong> ₹{ride.fare}
      </p>
      <p>
        <strong>Seats Available:</strong> {ride.seats}
      </p>

      {showContact ? (
        <>
          <p>
            <strong>Contact:</strong> {ride.contact}
          </p>
          <p>
            <strong>Vehicle No:</strong> {ride.vehicle}
          </p>
        </>
      ) : (
        <button
          onClick={() => setShowContact(true)}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default RideCard;
