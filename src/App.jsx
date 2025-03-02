import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import SignUp from "./Components/SignUp.jsx";
import Login from "./Components/Login.jsx";
import HomePage from "./Components/HomePage.jsx";
import AddProduct from "./Components/AddProduct.jsx";
import Footer from "./Components/Footer.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logInUser, setLogInUser] = useState({});

  const loginHandler = (value, user) => {
    setIsLoggedIn(value);
    setLogInUser({...user});
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar isLoggedIn={isLoggedIn} loginHandler={loginHandler} />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/users/signup"
              element={<SignUp loginHandler={loginHandler} />}
            />
            <Route
              path="/users/login"
              element={<Login loginHandler={loginHandler} />}
            />
            <Route path="/products/new" element={<AddProduct />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
