import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ConnectModal from "../components/ConnectModal";
import Navbar from "./Navbar";
import "../styles/Home.css";
import bannerImg from "../assets/shareRide_banner.jpg";

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
      const fetchedRides = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        time: new Date(doc.data().time),
        createdAt: doc.data().createdAt?.toDate(),
      }));
      setRides(fetchedRides);
      setFilteredRides(fetchedRides);
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
        <p>No rides available.</p>
      ) : (
        <div className="rides-grid">
          {filteredRides.map((ride) => (
            <div key={ride.id} className="ride-card">
              <h2>👤 {ride.name}</h2>
              <p>
                <strong>From:</strong> {ride.source} <br />
                <strong>To:</strong> {ride.destination} <br />
                <strong>Departure:</strong> {ride.time.toLocaleString()} <br />
                <strong>Fare:</strong> ₹{ride.fare} <br />
                <strong>Seats:</strong> {ride.seats}
              </p>

              {visibleContact[ride.id] ? (
                <>
                  <p>
                    <strong>Contact:</strong> {ride.contact}
                  </p>
                  <p>
                    <strong>Vehicle:</strong> {ride.vehicle}
                  </p>
                </>
              ) : (
                <button
                  className="connect-btn"
                  onClick={() => openConnectForm(ride)}
                >
                  Request to Connect
                </button>
              )}

              {ride.userEmail === user?.email && (
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(ride.id)}
                >
                  Delete Ride
                </button>
              )}
            </div>
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
    </div>
  );
}

export default Home;
