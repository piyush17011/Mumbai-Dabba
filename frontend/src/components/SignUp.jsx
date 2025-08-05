import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styles from "../styles/SignUp.module.css"; // Import CSS module
import logo from "../images/logo.png"; 

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role set to "user"
  });
  

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.username || !formData.email || !formData.phone || !formData.address || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
        role: formData.role,
      });

      if (response.data.message === "Exists") {
        alert("Already exists.");
        setFormData({
          username: "",
          email: "",
          phone: "",
          address: "",
          password: "",
          confirmPassword: "",
          role: "user",
        });
        return;
      }

      setSuccess("Registration successful!");
      navigate("/login");
      setFormData({
        username: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.l2}>
      <div className={styles.registrationContainer}>
        <div className={styles.logoSection}>
          <img src={logo} alt="Logo" />
          <h1>Mumbai Dabbawala</h1>
        </div>
        <div className={styles.formSection}>
          <h2 style={{ paddingLeft: "57px" }}>Register</h2>
          {error && <p className={styles.errorMessage}>{error}</p>}
          {success && <p className={styles.successMessage}>{success}</p>}
          <form onSubmit={handleSubmit} className={styles.registrationForm}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </div>

            {/* Dropdown for selecting role */}
            <div className={styles.formGroup}>
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="kitchen">Kitchen</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </div>
            <button type="submit" className={styles.registerButton}>
              Register
            </button>
            <p className={styles.navigationText}>
              Already a user?{" "}
              <span className={styles.loginLink} onClick={() => navigate("/login")}>
                Login here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
