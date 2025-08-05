import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Navbar from "./Navbar";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    quantity: 1,
  });
  const [billingCycle, setBillingCycle] = useState("Daily");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch meals dynamically from the API
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/meals/getmeals");
        setMeals(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load meals. Please try again later.");
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const handleSelectMeal = (meal) => {
    
    setSelectedMeal(meal);
    navigate('/payment', {
      state: { selectedMeal: meal, formData, billingCycle }
    });
  };

  return (
    <div className="Home">
      <Navbar />
      <div className="hero-section">
        <h2>Choose Your Meal</h2>
        <div className="card-container">
          {loading ? (
            <p>Loading meals...</p>
          ) : error ? (
            <p className="errorMessage">{error}</p>
          ) : meals.length === 0 ? (
            <p>No meals available.</p>
          ) : (
            meals.map((meal) => (
              <div key={meal._id} className="card">
                <h3>{meal.name}</h3>
                <img className="card-img" src={meal.image} alt={meal.name} />
                <p>{meal.description}</p>
                <button onClick={() => handleSelectMeal(meal)}>View Details</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
