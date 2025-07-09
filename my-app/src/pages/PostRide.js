import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PostRide.css";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const PostRide = () => {
  const [ride, setRide] = useState({
    name: "",
    source: "",
    destination: "",
    time: "",
    fare: "",
    seats: "",
    contact: "",
    vehicle: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRide({ ...ride, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "rides"), {
        ...ride,
        createdAt: Timestamp.now(),
      });

      alert("Ride posted successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to post ride. Try again.");
    }
  };

  return (
    <div className="post-ride-container">
      <h2>📝 Post a Ride</h2>
      <form onSubmit={handleSubmit} className="post-ride-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="source"
          placeholder="Source"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          required
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="time"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="fare"
          placeholder="Fare (₹)"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="seats"
          placeholder="Seats Available"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="vehicle"
          placeholder="Vehicle Number"
          required
          onChange={handleChange}
        />

        <button type="submit">Post Ride</button>
      </form>
    </div>
  );
};

export default PostRide;
