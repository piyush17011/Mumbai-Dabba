import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import styles from "../styles/Kitchen.module.css"; // Assuming you're using CSS modules

const Kitchen = () => {
  const userDetail = localStorage.getItem("user");
  const user = JSON.parse(userDetail);

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/meals/getkmeals/${user.data._id}`
        );
        setMeals(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch meals. Please try again later.');
        setLoading(false);
      }
    };

    fetchMeals();
  }, [user.data._id]);

  return (
    <>
      <Navbar />
      <div className="kitchen-page">
        <h2>Hi, {user.data.username}!</h2>
        <center style={{ fontSize: "20px" }}>Meals Added By You:</center>

        {loading ? (
          <p>Loading meals...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : meals.length === 0 ? (
          <p>No meals found.</p>
        ) : (
          <div className={styles.cardContainer}>
            {meals.map((meal) => (
              <div key={meal._id} className={styles.card}>
                <h3>{meal.name}</h3>
                <img className={styles.cardImg} src={meal.image} alt={meal.name} />
                <p><strong>Description:</strong> {meal.description}</p>
                <p><strong>Price:</strong> Rs.{meal.price}</p>
                <p><strong>Added On:</strong> {new Date(meal.createdAt).toLocaleDateString()}</p>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Kitchen;
