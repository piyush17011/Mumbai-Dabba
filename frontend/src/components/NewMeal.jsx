import React, { useState } from "react";
import styles from "../styles/Kitchen.module.css";
import axios from "axios";
import Navbar from "./Navbar";

const NewMeal = () => {
  const [formData, setFormData] = useState({
    mealName: "",
    kitchenLocation: "",
    mealDescription: "",
    mealImage: "",
    price: "",
  });
  
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.mealName || !formData.kitchenLocation || !formData.mealDescription || !formData.mealImage || !formData.price) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      // Ensure all fields are filled before making the request
      if (!formData.mealName || !formData.kitchenLocation || !formData.mealDescription || !formData.mealImage || !formData.price) {
        setMessage("All fields are required.");
        return;
      }
    
      const userDetail = localStorage.getItem("user");
      const user = JSON.parse(userDetail); // Assuming user data is stored in localStorage
      
      const mealData = {
        userId: user.data._id, // Add userId from logged-in user (ensure it's an array as per your schema)
        name: formData.mealName,
        kitchenLocation: formData.kitchenLocation,
        description: formData.mealDescription,
        image: formData.mealImage,
        price: parseFloat(formData.price), // Convert to number
      };
      
      // Debugging: Log the mealData before making the request
      console.log("Sending meal data:", mealData);
    
      const response = await axios.post("http://localhost:5000/api/meals/addmeal", mealData);
    
      if (response.status === 201) {
        setMessage("Meal added successfully!");
        setFormData({ mealName: "", kitchenLocation: "", mealDescription: "", mealImage: "", price: "" });
      } else {
        setMessage("Unexpected response. Please try again.");
      }
    } catch (error) {
      console.error("Error adding meal:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Failed to add meal. Please try again.");
    }
    
  };

  return (

    <>
    <Navbar/>
    <div className={styles.kitchenContainer}>
      <h2>Add a Meal</h2>
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} className={styles.kitchenForm}>
        <div className={styles.formGroup}>
          <label>Meal Name</label>
          <input type="text" name="mealName" value={formData.mealName} onChange={handleChange} placeholder="Enter meal name" />
        </div>
        <div className={styles.formGroup}>
          <label>Kitchen Location</label>
          <input type="text" name="kitchenLocation" value={formData.kitchenLocation} onChange={handleChange} placeholder="Enter kitchen location" />
        </div>
        <div className={styles.formGroup}>
          <label>Meal Description</label>
          <textarea name="mealDescription" value={formData.mealDescription} onChange={handleChange} placeholder="Enter meal description" />
        </div>
        <div className={styles.formGroup}>
          <label>Meal Image URL</label>
          <input type="text" name="mealImage" value={formData.mealImage} onChange={handleChange} placeholder="Enter image URL" />
        </div>
        <div className={styles.formGroup}>
          <label>Price ($)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Enter price" />
        </div>
        <button type="submit" className={styles.submitButton}>Add Meal</button>
      </form>
    </div>

    </>
  );
};

export default NewMeal;