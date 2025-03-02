import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import axios from "axios";

function SignUp({loginHandler}) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/signup`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Signup Successful:", response.data);
      alert("Signup successful! Redirecting...");
      loginHandler(true);
      // Redirect user to home page
      navigate("/");

    } catch (error) {
      console.error("Signup Error:", error);
      alert("User already exists.");
    }
  };

  return (
    <div className="container my-md-5 my-3" style={{ minHeight: "60vh" }}>
      <div className="bg-light-subtle border border-primary rounded p-4 shadow-sm col-12 col-md-6 offset-md-3 ">
        <h2 className="text-center">SignUp</h2>
        <form
          noValidate
          className={`needs-validation ${validated ? "was-validated" : ""}`}
          onSubmit={handleSubmit}
        >
          <div className="mb-3 mt-4">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Sonali Sahu"
              className="form-control"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <div className="valid-feedback">Looks good.</div>
            <div className="invalid-feedback">Please enter the username</div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="sonalisahu@dev.in"
              className="form-control"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <div className="invalid-feedback">Please enter your email.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="e.g., 483959jskdfj3"
              className="form-control"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <div className="invalid-feedback">Please provide a strong password.</div>
          </div>
          <button className="btn btn-outline-primary w-100" type="submit">
            Sign Up
          </button>
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link className="login_link" to="/users/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
