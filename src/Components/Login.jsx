import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login({loginHandler}) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

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
        `${API_BASE_URL}/api/users/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Login Successful:", response.data);
      alert(`Login successful! Welcom to Product HUB ${response.data.user.username}`);
      loginHandler(true, response.data.user);

      // Redirect user to home page
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="container my-md-5 my-3" style={{ minHeight: "60vh" }}>
      <div className="bg-light-subtle border border-primary rounded p-4 shadow-sm col-md-6 offset-md-3 col-12 ">
        <h2 className="text-center">LogIn</h2>
        <form
          noValidate
          className={`needs-validation ${validated ? "was-validated" : ""}`}
          onSubmit={handleSubmit}
        >
          <div className="mb-3 mt-4">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Sonali Sahu"
              className="form-control"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <div className="invalid-feedback">Enter username</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="e.g., e9dfjk348sdf"
              className="form-control"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <div className="invalid-feedback">Enter password</div>
          </div>
          <button className="btn btn-outline-primary w-100" type="submit">
            Log In
          </button>
          <p className="mt-3 text-center">
            New User ?
            <Link className="login_link ms-1" to="/users/signup">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
