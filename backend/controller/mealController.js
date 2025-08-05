// const Meal = require("../models/mealModel"); // Import Meal model
const Meal = require('../model/mealModel');
// @desc   Get all meals
// @route  GET /api/meals
// @access Public
const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find(); // Fetch all meals from database
    res.status(200).json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ message: "Server error. Failed to fetch meals." });
  }
};

// @desc   Add a new meal
// @route  POST /api/meals/addmeal
// @access Public
const addMeal = async (req, res) => {
  try {
    const { userId, name, description, image, price, kitchenLocation } = req.body;

    // Validation: Check if all fields are provided
    if (!name || !description || !image || !price || !kitchenLocation) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create new meal instance
    const newMeal = new Meal({
      userId,
      name,
      description,
      image,
      price,
      kitchenLocation,
    });

    // Save meal to database
    const savedMeal = await newMeal.save();
    res.status(201).json(savedMeal);
  } catch (error) {
    console.error("Error adding meal:", error);
    res.status(500).json({ message: "Server error. Could not add meal." });
  }
};

// @desc   Get a meal by ID
// @route  GET /api/meals/:id
// @access Public
const getMealById = async (req, res) => {
  try {
    const userId = req.params.id; // Retrieve the userId from the URL
    const meals = await Meal.find({ userId })  // Find meals by the userId
      .populate('userId', 'username email')  // Optional: Populate user details
      .sort({ createdAt: -1 });  // Sort by creation date

    if (!meals || meals.length === 0) {
      return res.status(404).json({ message: "No meals found for this user." });
    }

    res.status(200).json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ message: "Failed to fetch meals. Please try again later." });
  }
};


// @desc   Delete a meal
// @route  DELETE /api/meals/:id
// @access Public
const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found." });
    }

    await meal.deleteOne();
    res.status(200).json({ message: "Meal deleted successfully." });
  } catch (error) {
    console.error("Error deleting meal:", error);
    res.status(500).json({ message: "Server error. Failed to delete meal." });
  }
};

module.exports = { getMeals, addMeal, getMealById, deleteMeal };
