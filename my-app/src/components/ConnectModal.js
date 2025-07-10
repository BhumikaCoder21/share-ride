// src/components/ConnectModal.js
import React from "react";
import "../styles/ConnectModal.css";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

const ConnectModal = ({ user, ride, onClose, onConfirm }) => {
    const handleSubmit = async () => {
      console.log("🔍 ride.id:", ride.id);
      console.log("🔍 ride.userEmail:", ride.userEmail);
      console.log("🔍 interestedName:", user?.displayName);
      console.log("🔍 interestedEmail:", user?.email);

      try {
        const docRef = await addDoc(collection(db, "interests"), {
          rideId: ride.id,
          riderEmail: ride.userEmail || "unknown@nitap.ac.in",
          interestedName: user?.displayName || "Unknown",
          interestedEmail: user?.email || "Unknown",
          timestamp: Timestamp.now(),
        });

        console.log("✅ Interest submitted with ID:", docRef.id);
        onConfirm();
      } catch (error) {
        console.error(
          "🔥 Error submitting interest:",
          error.message,
          error.code
        );
        alert("Failed to submit interest: " + error.message);
      }
    };
      

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>Request to Connect</h3>
        <p>
          <strong>Your Name:</strong> {user?.displayName}
        </p>
        <p>
          <strong>Your Email:</strong> {user?.email}
        </p>
        <button className="confirm-btn" onClick={handleSubmit}>
          View Contact Details
        </button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConnectModal;
