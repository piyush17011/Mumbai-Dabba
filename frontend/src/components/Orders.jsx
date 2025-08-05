import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const Orders = () => {
  const userDetail = localStorage.getItem("user");
  const user = JSON.parse(userDetail);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/userorder/${user.data._id}`
        );
        console.log(response.data)
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.data._id]);

  return (
    <>
      <Navbar />
      <div className="orders-page">
        <h2>Hi, {user.data.username}!</h2>
        <center style={{fontSize:"20px"}}>Your Orders:</center>

        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="orders-container">
            {orders.map((order) => (
              <div className="order-card" key={order._id}>
                <h3>Order ID: {order._id}</h3>
                <p><strong>Amount:</strong> Rs.{order.amount}</p>
                <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>
                  <strong>User:</strong> {order.userId[0]?.username} ({order.userId[0]?.email})
                </p>
                <ul>
                  {order.orderItems.map((item, index) => (
                    <li key={index}>
                      {item.product?.title || item.meal} - <strong>Quantity:</strong> {item.quantity}
                    </li>
                  ))}
                </ul>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
