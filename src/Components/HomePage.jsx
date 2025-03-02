import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [productData, setProductData] = useState([
    {
      productId: "PROD12345",
      name: "Wireless Headphones",
      price: 199.99,
      featured: true,
      rating: 4.5,
      createdAt: "2025-03-01",
      company: "Sony",
    },
    {
      productId: "PROD67890",
      name: "Bluetooth Speaker",
      price: 99.99,
      featured: false,
      rating: 4.2,
      createdAt: "2025-02-20",
      company: "JBL",
    },
    {
      productId: "PROD11223",
      name: "Smart Watch",
      price: 149.99,
      featured: true,
      rating: 4.8,
      createdAt: "2025-01-15",
      company: "Apple",
    },
  ]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log(API_BASE_URL);

  const getProductData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    //   setProductData(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center">All Products</h3>
      <div className="row mt-4 mb-4">
        <div className="d-flex flex-wrap gap-4 justify-content-center">
          {productData.length &&
            productData.map((item, index) => (
              <div key={index} className="card" style={{ width: "18rem" }}>
                <img
                  src="/Images/headphone.png"
                  className="card-img-top"
                  alt="Product"
                  style={{ height: "200px" }}
                />
                <div className="card-body">
                  <p className="card-text">
                    Name: {item.name} <br />
                    Price: {item.price} <br />
                    Rating: {item.rating} <br />
                    CreatedAt: {item.createdAt} <br />
                    Company: {item.company}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
