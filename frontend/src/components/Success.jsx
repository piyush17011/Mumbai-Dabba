// src/pages/Success.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Success.css";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/orders"); // Redirect to orders page after 2 seconds
    }, 2000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-container">
      <h1>Order Placed Successfully!</h1>
      <p>Your payment was successful. You will be redirected to your orders page shortly.</p>
      {/* <a href="/orders" className="go-to-orders-link">Go to Orders Page</a> */}
    </div>
  );
};

export default Success;
