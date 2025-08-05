import React from 'react'
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";


const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <b style={{ fontFamily: "initial", fontSize: "20px" }}>Welcome</b>
          <span style={{ color: '#FF5722', textDecoration: 'underline', fontFamily: "initial", fontSize: "18px" }}>
            {JSON.parse(localStorage.getItem("user")).data.username}
          </span>
        </div>
        {
  (JSON.parse(localStorage.getItem("user")).data.role === "admin") ? (
    <div>
      <button className="view-users-button" onClick={() => navigate("/admin")}>View Orders</button>
      <button className="view-users-button" onClick={() => navigate("/users")}>View Users</button>
    </div>
  ) : (JSON.parse(localStorage.getItem("user")).data.role === "kitchen") ? (
    <div>
      <button className="view-orders-button" onClick={() => navigate("/kitchen")}>Kitchen Dashboard</button>
      <button className="view-orders-button" onClick={() => navigate("/newmeal")}>Add Order</button>
      <button className="view-orders-button" onClick={() => navigate("/korders")}>View Orders</button>
    </div>
  ) : (
    <div>
      <button className="view-orders-button" onClick={() => navigate("/home")}>Home</button>
      <button className="view-orders-button" onClick={() => navigate("/orders")}>View Orders</button>
    </div>
  )
}
        
        <button className="logout-button" onClick={() => navigate("/login")}>
          Logout
        </button>
      </nav>
    </div>
  )
}

export default Navbar
