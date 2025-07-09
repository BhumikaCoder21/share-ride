// src/pages/Home.js
import React from "react";
import RideCard from "../components/RideCard";
import { useNavigate } from "react-router-dom";
import { signOut, auth } from "../firebase";
import "../styles/Home.css";

const dummyRides = [
  {
    id: 1,
    name: "Ankit Singh",
    source: "NIT Arunachal",
    destination: "Itanagar",
    time: "10 July 2025, 3:00 PM",
    fare: 150,
    seats: 2,
    contact: "9876543210",
    vehicle: "AS01AB1234",
  },
  {
    id: 2,
    name: "Pooja Rani",
    source: "NIT Arunachal",
    destination: "Guwahati",
    time: "11 July 2025, 8:00 AM",
    fare: 500,
    seats: 1,
    contact: "7890123456",
    vehicle: "AS02XY9876",
  },
];

function Home({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null); // ✅ this updates App.js and redirects
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Failed to log out. Try again.");
    }
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h2>🚗 Available Rides</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="post-button-container">
        <button className="post-button" onClick={() => navigate("/post")}>
          + Post a Ride
        </button>
      </div>

      {dummyRides.map((ride) => (
        <RideCard key={ride.id} ride={ride} />
      ))}
    </div>
  );
}

export default Home;
