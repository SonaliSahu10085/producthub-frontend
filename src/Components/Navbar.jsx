import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar({ isLoggedIn, loginHandler }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // 

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/logout`, {
        withCredentials: true, // 
      });

      setIsLoggedIn(false); // 
      alert("Logged out successfully!");
      navigate("/"); //
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Logout failed! Please try again.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <b>ProductHUB</b>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products/new">Create Your Product</Link>
            </li>

            {!isLoggedIn && (
              <>
                <li className="nav-item" >
                  <Link className="nav-link" to="/users/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users/login">Log In</Link>
                </li>
              </>
            )}

            {isLoggedIn && (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => (loginHandler(false))}>
                  Log Out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
