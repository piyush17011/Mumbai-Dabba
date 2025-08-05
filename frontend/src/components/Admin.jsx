import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../styles/Admin.css";

const Admin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders/allorder");
        console.log(response.data);
        setOrders(response.data);  
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchAllOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>All Orders</h2>
      <div>
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order._id}>
              {/* Safely access userId */}
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#4CAF50' }}>
                User: 
                {order.userId && order.userId[0] 
                  ? `${order.userId[0].username} (${order.userId[0].email})` 
                  : "Unknown User"}
              </h3>
              <p>Amount: ₹{order.amount}</p>
              <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Order ID: {order._id}</p>

              <ul>
                {order.orderItems.map((item, index) => (
                  <li key={index}>
                    <strong>{item.meal}</strong> - Quantity: {item.quantity} <br />
                    Subscription: {item.subscriptionType} <br />
                    Delivery Address: {item.deliveryAddress}
                  </li>
                ))}
              </ul>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;
