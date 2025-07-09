import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PostRide from "./pages/PostRide";

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Show login if not logged in */}
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Login setUser={setUser} />}
        />

        {/* Home page - protected */}
        <Route
          path="/home"
          element={user ? <Home setUser={setUser} /> : <Navigate to="/" />}
        />

        {/* Post a ride - protected */}
        <Route
          path="/post"
          element={user ? <PostRide /> : <Navigate to="/" />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
