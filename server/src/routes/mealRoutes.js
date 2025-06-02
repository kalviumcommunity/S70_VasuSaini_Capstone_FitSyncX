import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';
import Meal from '../models/mealModel.js';

const router = express.Router();

// @desc    Get all meals for a user
// @route   GET /api/meals
// @access  Private
router.get('/', protect, asyncHandler(async (req, res) => {
  const meals = await Meal.find({ user: req.user._id });
  res.json(meals);
}));

// @desc    Get single meal
// @route   GET /api/meals/:id
// @access  Private
router.get('/:id', protect, asyncHandler(async (req, res) => {
  const meal = await Meal.findOne({ _id: req.params.id, user: req.user._id });
  
  if (meal) {
    res.json(meal);
  } else {
    res.status(404);
    throw new Error('Meal not found');
  }
}));

// @desc    Create a meal
// @route   POST /api/meals
// @access  Private
router.post('/', protect, asyncHandler(async (req, res) => {
  const { name, calories, protein, carbs, fats, mealType, date } = req.body;

  const meal = await Meal.create({
    user: req.user._id,
    name,
    calories,
    protein,
    carbs,
    fats,
    mealType,
    date: date || Date.now()
  });

  res.status(201).json(meal);
}));

// @desc    Update a meal
// @route   PUT /api/meals/:id
// @access  Private
router.put('/:id', protect, asyncHandler(async (req, res) => {
  const meal = await Meal.findOne({ _id: req.params.id, user: req.user._id });

  if (meal) {
    meal.name = req.body.name || meal.name;
    meal.calories = req.body.calories || meal.calories;
    meal.protein = req.body.protein || meal.protein;
    meal.carbs = req.body.carbs || meal.carbs;
    meal.fats = req.body.fats || meal.fats;
    meal.mealType = req.body.mealType || meal.mealType;
    meal.date = req.body.date || meal.date;

    const updatedMeal = await meal.save();
    res.json(updatedMeal);
  } else {
    res.status(404);
    throw new Error('Meal not found');
  }
}));

// @desc    Delete a meal
// @route   DELETE /api/meals/:id
// @access  Private
router.delete('/:id', protect, asyncHandler(async (req, res) => {
  const meal = await Meal.findOne({ _id: req.params.id, user: req.user._id });

  if (meal) {
    await meal.deleteOne();
    res.json({ message: 'Meal removed' });
  } else {
    res.status(404);
    throw new Error('Meal not found');
  }
}));


export default router; 
