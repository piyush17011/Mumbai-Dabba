import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import logo from "../images/logo.png"; // Add your logo file in the assets folder

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "user", // Default role
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", user);
      const result = await res.data;
      localStorage.setItem("user", JSON.stringify(result));

      if (res.data.token) {
        const userRole = res.data.data.role;
        navigate(
          userRole === "admin" ? "/admin" : 
          userRole === "kitchen" ? "/kitchen" : 
          "/home"
        );
        
      } else {
        alert("Incorrect login credentials.");
      }
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className={styles.l1}>
      <div className={styles.loginContainer}>
        <div className={styles.logoSection}>
          <img src={logo} alt="Logo" />
          <h1>Mumbai Dabbawala</h1>
        </div>
        <div className={styles.formSection}>
          <h2>Login</h2>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={user.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="kitchen">Kitchen</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className={styles.loginButton}>
              Login as {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </button>
            <p className={styles.newUserText}>
              New user?{" "}
              <span onClick={() => navigate("/signup")} className={styles.signupLink}>
                SignUp
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
