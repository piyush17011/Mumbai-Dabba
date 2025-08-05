import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const Korders = () => {
  const userDetail = localStorage.getItem("user");
  const user = JSON.parse(userDetail);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/getkorders/${user.data._id}`  // Replace with the correct user ID
        );
        // http://localhost:5000/api/meals/getkmeals/67a34870d132e7eb1084ddb4
        console.log(response.data)
        setOrders(response.data);  // Set the orders data in the state
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
        <h2>Orders for {user.data.username}</h2>

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
                <p><strong>Created On:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

                <h4>Order Items:</h4>
                <ul>
                  {order.orderItems.map((item, index) => (
                    <li key={index}>
                      <p><strong>Meal:</strong> {item.meal}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Address:</strong> {item.deliveryAddress}</p>
                      <p><strong>Subscription Type:</strong> {item.subscriptionType}</p>
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

export default Korders;
