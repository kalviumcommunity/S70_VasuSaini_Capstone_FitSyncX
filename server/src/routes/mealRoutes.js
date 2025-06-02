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


export default router; 
