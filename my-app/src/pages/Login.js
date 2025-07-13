import React from "react";
import { auth, provider, signInWithPopup } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import loginBg from "../assets/login_bg4.jpg";

function Login({ setUser }) {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      if (!email.endsWith("@nitap.ac.in")) {
        alert("Please login using your official college email (nitap.ac.in)");
        return;
      }

      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);
      navigate("/home");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Try again.");
    }
  };

  return (
    <div
      className="login-container"
      style={{ "--login-bg": `url(${loginBg})` }}
    >
      <div className="mobile-banner">
        <img src={loginBg} alt="Login Banner" />
      </div>

      <div className="login-content">
        <div className="login-box">
          <h2>Welcome to NIT-AP Ride Sure</h2>
          <button className="login-button" onClick={handleLogin}>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
