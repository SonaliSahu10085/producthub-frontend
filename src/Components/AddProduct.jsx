import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    rating: "",
    featured: false,
    company: "",
  });
  
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
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
        `${API_BASE_URL}/api/products/new`,
        formData
      );

      console.log("Product Created:", response.data);
      alert("Product added successfully!");

      // Reset form after submission
      setFormData({
        name: "",
        price: "",
        rating: "",
        company: "",
        featured: false,
      });
      setValidated(false);
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Please log in or sign up.");
    }
  };

  return (
    <div className="my-md-5 my-3">
      <div className="col-md-6 offset-md-3 col-12 offset-0 bg-light-subtle border border-primary rounded p-4 shadow-sm">
        <h3 className="text-center">Add New Product</h3>
        <form
          noValidate
          className={`needs-validation ${validated ? "was-validated" : ""}`}
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="title"
              name="name"
              placeholder="e.g., Wireless Headphone"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Name field is required.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price:
            </label>
            <input
              type="string"
              id="price"
              name="price"
              placeholder="499"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Price field should only contains digits.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="rating" className="form-label">
              Rating:
            </label>
            <input
              id="rating"
              type="string"
              name="rating"
              className="form-control"
              placeholder="e.g., 4.5"
              value={formData.rating}
              onChange={handleChange}
              required
              min="0"
              max="5"
              step="0.1"
            />
            <div className="invalid-feedback">
              Give rating 0 - 5 (e.g., 3.5)
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="company" className="form-label">
              Company:
            </label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="xyz private limited"
              className="form-control"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
            />
            <label className="form-check-label" htmlFor="featured">
              Do you want to add this to your featured products?
            </label>
            <div className="invalid-feedback">
              Please select this option if applicable.
            </div>
          </div>

          <button type="submit" className="btn btn-outline-primary">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
