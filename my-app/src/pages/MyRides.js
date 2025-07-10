// src/components/MyRides.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/MyRides.css";

const MyRides = ({ ride }) => {
  const user = auth.currentUser;
  const [showDetails, setShowDetails] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this ride?"
    );
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "rides", ride.id));
      window.location.reload(); // Optional: better to use state update instead of reload
    } catch (error) {
      console.error("Error deleting ride:", error);
      alert("Failed to delete ride.");
    }
  };

  return (
    <div className="ride-card">
      <h3>{ride.name}</h3>
      <p>
        <strong>From:</strong> {ride.source}
        <br />
        <strong>To:</strong> {ride.destination}
        <br />
        <strong>Departure:</strong> {new Date(ride.time).toLocaleString()}
        <br />
        <strong>Fare:</strong> ₹{ride.fare}
        <br />
        <strong>Seats:</strong> {ride.seats}
      </p>

      {showDetails && (
        <div className="contact-info">
          <p>
            <strong>📞 Contact:</strong> {ride.contact}
          </p>
          <p>
            <strong>🚗 Vehicle:</strong> {ride.vehicle}
          </p>
        </div>
      )}

      {!showDetails && (
        <button className="connect-button" onClick={() => setShowDetails(true)}>
          Connect
        </button>
      )}

      {user?.email === ride.userEmail && (
        <button className="delete-button" onClick={handleDelete}>
          🗑 Delete
        </button>
      )}
    </div>
  );
};

export default MyRides;
