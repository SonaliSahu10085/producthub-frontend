//A product page i have not import this file anywhere....

import React from "react";
import { useState } from "react";

const productData = {
  ProductId: "PROD12345",
  name: "Wireless Headphones",
  price: 199.99,
  featured: true,
  rating: 4.5,
  createdAt: "2025-03-01",
  company: "Sony",
  owner: "Sonali Sahu",
};

function ShowProduct() {
  const [like, setLike] = useState(false);

  function clickHandle() {
    setLike(!like);
  }
  const styles = { color: "red" };
  return (
    <div className="container mt-4">
      <h3 className="text-center">NeckBend</h3>
      <div className="row mt-4 mb-4">
        <div className="d-flex flex-wrap justify-content-center">
          <div key={index} className="card" style={{ width: "18rem" }}>
            <img
              src="/Images/headphone.png"
              className="card-img-top"
              alt="Product"
              style={{ height: "200px" }}
            />
            <div className="card-body">
              <p className="card-text">
                Name: {productData.name} <br />
                Price: {productData.price} <br />
                Rating: {productData.rating} <br />
                CreatedAt: {productData.createdAt} <br />
                Company: {productData.company} <br />
                Owned By : {productData.owner}
              </p>
              <p onClick={clickHandle} style={{ cursor: "pointer" }}>
                Like :{" "}
                {like ? (
                  <i style={styles} className="fa-solid fa-heart"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowProduct;
