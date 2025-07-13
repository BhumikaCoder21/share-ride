// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ConnectModal from "../components/ConnectModal";
import Navbar from "./Navbar";
import RideCard from "../pages/RideCard";
import "../styles/Home.css";
import bannerImg from "../assets/Banner.png";
import Footer from "../components/Footer";





function Home() {
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [visibleContact, setVisibleContact] = useState({});
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchRides = async () => {
      const querySnapshot = await getDocs(collection(db, "rides"));
      const now = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setDate(now.getDate() - 30);

      const validRides = [];

      for (const rideDoc of querySnapshot.docs) {
        const data = rideDoc.data();
        const rideTime = new Date(data.time);

        if (rideTime > now) {
          // Show upcoming ride
          validRides.push({
            id: rideDoc.id,
            ...data,
            time: rideTime,
            createdAt: data.createdAt?.toDate(),
          });
        } else if (rideTime < oneMonthAgo) {
          // Delete rides older than 30 days
          try {
            await deleteDoc(doc(db, "rides", rideDoc.id));
            console.log("Deleted expired ride:", rideDoc.id);
          } catch (err) {
            console.error("Failed to delete expired ride:", err);
          }
        }
        // else (expired within 30 days) → keep but don't show
      }

      setRides(validRides);
      setFilteredRides(validRides);
    };

    fetchRides();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Try again.");
    }
  };

  const openConnectForm = (ride) => setSelectedRide(ride);
  const closeConnectForm = () => setSelectedRide(null);

  const handleConfirmConnect = () => {
    setVisibleContact((prev) => ({ ...prev, [selectedRide.id]: true }));
    closeConnectForm();
  };

  const handleSearch = () => {
    const filtered = rides.filter((ride) => {
      const matchesSource = source
        ? ride.source.toLowerCase().includes(source.toLowerCase())
        : true;
      const matchesDest = destination
        ? ride.destination.toLowerCase().includes(destination.toLowerCase())
        : true;
      const matchesDate = date
        ? ride.time.toISOString().slice(0, 10) === date
        : true;
      return matchesSource && matchesDest && matchesDate;
    });

    setFilteredRides(filtered);
  };

  const handleDelete = async (rideId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this ride?"
    );
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "rides", rideId));
      setRides((prev) => prev.filter((r) => r.id !== rideId));
      setFilteredRides((prev) => prev.filter((r) => r.id !== rideId));
      alert("Ride deleted.");
    } catch (error) {
      console.error("Error deleting ride:", error);
      alert("Failed to delete ride.");
    }
  };

  return (
    <div className="home-container">
      <Navbar onLogout={handleLogout} />

      <div className="banner-wrapper">
        <img src={bannerImg} alt="Banner" className="banner-img" />
      </div>

      <div className="ride-search-wrapper">
        <div className="ride-search-bar">
          <div className="ride-input-icon">
            <span>📍</span>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="From"
            />
          </div>

          <div className="ride-input-icon">
            <span>📍</span>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="To"
            />
          </div>

          <div className="ride-input-icon">
            <span>📅</span>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button className="ride-search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {filteredRides.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          No rides available.
        </p>
      ) : (
        <div className="rides-grid">
          {filteredRides.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
              showContact={visibleContact[ride.id]}
              onConnect={() => openConnectForm(ride)}
              onDelete={ride.userEmail === user?.email ? handleDelete : null}
            />
          ))}
        </div>
      )}

      {selectedRide && (
        <ConnectModal
          user={user}
          ride={selectedRide}
          onClose={closeConnectForm}
          onConfirm={handleConfirmConnect}
        />
      )}
      <Footer />
    </div>
    
  );
}

export default Home;
