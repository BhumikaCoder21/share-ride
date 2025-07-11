import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PostRide.css";
import { db } from "../firebase";
import { auth } from "../firebase";
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
    const user = auth.currentUser;

    if (!user) {
      alert("User not authenticated.");
      return;
    }

    try {
      await addDoc(collection(db, "rides"), {
        ...ride,
        userEmail: user.email, // ✅ store email of the poster
        createdAt: Timestamp.now(),
      });

      alert("Ride posted successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to post ride. Try again.");
    }
  };


  const getLocalDateTime = () => {
    const now = new Date();
    now.setSeconds(0, 0); // Remove seconds/milliseconds for clean comparison

    const offset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - offset * 60 * 1000);
    return local.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:mm'
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
          min={getLocalDateTime()}
          required
          onChange={handleChange}
        />

        <input
          type="number"
          name="fare"
          placeholder="Fare per person (₹)"
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

        <div className="form-buttons">
          <button type="submit">Post Ride</button>
          <button
            type="button"
            className="go-home-btn"
            onClick={() => navigate("/home")}
          >
            Go Back to Home
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostRide;
