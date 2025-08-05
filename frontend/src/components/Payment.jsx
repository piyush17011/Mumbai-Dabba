import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Payment.css";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Payment = () => {
  // localStorage.setItem("mealDetails", JSON.stringify(meal));
  // const user = JSON.parse(userDetail);
  const mealDetail = localStorage.getItem("mealDetails");
  const meal = JSON.parse(mealDetail);
  console.log(meal.userId);
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const { state } = useLocation(); // Receive data passed from Home.jsx

  const { selectedMeal, formData, billingCycle } = state;
  const [showMap, setShowMap] = useState(false);
  const [address, setAddress] = useState(formData.address);
  const [quantity, setQuantity] = useState(formData.quantity);
  const [billing, setBilling] = useState(billingCycle);

  useEffect(() => {
    if (selectedMeal && showMap) {
      initMap();
    }
  }, [selectedMeal, showMap]);

  const initMap = () => {
    if (mapRef.current && !mapRef.current._leaflet_id) {
      const mumbaiCoordinates = [19.0760, 72.8777];
      const map = L.map(mapRef.current).setView(mumbaiCoordinates, 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      const customIcon = L.icon({
        iconUrl: '/marker.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const marker = L.marker(mumbaiCoordinates, { icon: customIcon, draggable: true }).addTo(map);
      markerRef.current = marker;

      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        fetchAddress(lat, lng);
      });

      mapRef.current.style.cursor = "pointer";
    }
  };

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const newAddress = response.data.display_name;
      setAddress(newAddress);
    } catch (error) {
      console.error("Failed to fetch address:", error);
      alert("Failed to fetch address. Please try again.");
    }
  };

  const calculateTotalPrice = () => {
    const multiplier = billing === "Daily" ? 1 : billing === "Monthly" ? 30 : 365;
    return selectedMeal.price * quantity * multiplier;
  };

  const handlePayment = async () => {
    if (!address) {
      alert("Please select a delivery address.");
      return;
    }

    const userDetail = localStorage.getItem("user");
    const user = JSON.parse(userDetail);

    const amount = calculateTotalPrice();
    try {
      // Step 1: Create Razorpay order
      const { data: order } = await axios.post('http://localhost:5000/api/payments/create-order', {
        amount,
        currency: 'INR',
      });

      // Step 2: Razorpay Checkout Integration
      const options = {
        key: 'rzp_test_lOWyUeXOi1ZOkj', // Replace with your Razorpay key
        amount: order.amount,
        currency: order.currency,
        name: 'Mumbai Dabbewala',
        description: 'Meal Subscription Payment',
        order_id: order.id,
        handler: async (response) => {
          console.log('Razorpay Response:', response);
          
          // Post the payment verification to your backend
          try {
            await axios.post('http://localhost:5000/api/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            // If payment verification is successful, place the order and navigate
            alert('Payment Successful! 🎉');
            await handlePlaceOrder(); // Place order after successful payment
            navigate("/success"); // Navigate to success page
          } catch (error) {
            console.error('Payment Verification Error:', error);
            alert('Failed to verify payment. Please try again.');
          }
        },
        prefill: {
          name: user?.data?.username || "Guest User",
          email: user?.data?.email || "guest@example.com",
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  const userDetail = localStorage.getItem("user");
  const user = JSON.parse(userDetail);
  // const kId = meal.userId;
  const handlePlaceOrder = async () => {
    const orderData = {
      userId: user.data._id,
      kId : meal.userId,
      orderItems: [
        {
          meal: selectedMeal.name,
          deliveryAddress: address,
          subscriptionType: billing,
          quantity: quantity,
        },
      ],
      amount: calculateTotalPrice(),
    };

    try {
      console.log("Order Data:", orderData);
      const response = await axios.post('http://localhost:5000/api/orders/addorder', orderData);
      console.log(response.data);
      navigate('/orders');
    } catch (error) {
      console.error("Order Placement Error:", error);
      alert(error.response?.data?.message || "Failed to place the order.");
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="payment-container">
      <h2>Order Details for {selectedMeal.name}</h2>
      <img src={selectedMeal.image} alt={selectedMeal.name} />
      <form className="payment-form">
        <div className="form-group">
          <label htmlFor="address">Delivery Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Click on map to select address"
          />
        </div>
        <button
          className="toggle-map-button"
          onClick={(e) => {
            e.preventDefault();
            setShowMap((prev) => !prev);
          }}
        >
          {showMap ? "Hide Map" : "Show Map"}
        </button>
        {showMap && (
          <div
            className="map-container"
            ref={mapRef}
            style={{
              width: "100%",
              height: "300px",
              margin: "10px 0",
              cursor: "pointer",
            }}
          ></div>
        )}
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="billingCycle">Billing Cycle</label>
          <select
            id="billingCycle"
            value={billing}
            onChange={(e) => setBilling(e.target.value)}
          >
            <option value="Daily">Daily</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
        <p>Total Price: ₹<span style={{ color: "green" }}>{calculateTotalPrice()}</span></p>
        <button type="button" className="order-button" onClick={handlePayment}>
          Proceed to Payment
        </button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Payment;