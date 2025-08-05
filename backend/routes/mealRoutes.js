const express = require('express');
const { addMeal, getMeals ,getMealById} = require('../controller/mealController');

const router = express.Router();

router.post("/addmeal",addMeal);
router.get("/getmeals",getMeals);
router.get("/getkmeals/:id",getMealById);

module.exports = router;