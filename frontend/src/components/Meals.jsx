import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Meals.module.css"; // Assuming you have a CSS file for styling

const Meals = () => {
    const [meals, setMeals] = useState([]); // Initialize as empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
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
  
    return { meals, loading, error };
  };
  

//   return (
//     <div className={styles.mealsContainer}>
//       <h2>Available Meals</h2>
//       {loading ? (
//         <p>Loading meals...</p>
//       ) : error ? (
//         <p className={styles.errorMessage}>{error}</p>
//       ) : meals.length === 0 ? (
//         <p>No meals available.</p>
//       ) : (
//         <div className={styles.mealsGrid}>
//           {meals.map((meal) => (
//             <div key={meal._id} className={styles.mealCard}>
//               <img src={meal.image} alt={meal.name} className={styles.mealImage} />
//               <h3>{meal.name}</h3>
//               <p>{meal.description}</p>
//               <p className={styles.mealPrice}>₹{meal.price}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

export default Meals;
