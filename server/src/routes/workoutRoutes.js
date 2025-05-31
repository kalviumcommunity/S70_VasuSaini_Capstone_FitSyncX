import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';
import Workout from '../models/workoutModel.js';

const router = express.Router();

// @desc    Get all workouts for a user
// @route   GET /api/workouts
// @access  Private
router.get('/', protect, asyncHandler(async (req, res) => {
  const workouts = await Workout.find({ user: req.user._id });
  res.json(workouts);
}));

// @desc    Get single workout
// @route   GET /api/workouts/:id
// @access  Private
router.get('/:id', protect, asyncHandler(async (req, res) => {
  const workout = await Workout.findOne({ _id: req.params.id, user: req.user._id });
  
  if (workout) {
    res.json(workout);
  } else {
    res.status(404);
    throw new Error('Workout not found');
  }
}));

// @desc    Create a workout
// @route   POST /api/workouts
// @access  Private
router.post('/', protect, asyncHandler(async (req, res) => {
  const { name, type, duration, exercises, date, caloriesBurned, notes } = req.body;

  const workout = await Workout.create({
    user: req.user._id,
    name,
    type,
    duration,
    exercises,
    date: date || Date.now(),
    caloriesBurned,
    notes
  });

  res.status(201).json(workout);
}));

// @desc    Update a workout
// @route   PUT /api/workouts/:id
// @access  Private
router.put('/:id', protect, asyncHandler(async (req, res) => {
  const workout = await Workout.findOne({ _id: req.params.id, user: req.user._id });

  if (workout) {
    workout.name = req.body.name || workout.name;
    workout.type = req.body.type || workout.type;
    workout.duration = req.body.duration || workout.duration;
    workout.exercises = req.body.exercises || workout.exercises;
    workout.date = req.body.date || workout.date;
    workout.caloriesBurned = req.body.caloriesBurned || workout.caloriesBurned;
    workout.notes = req.body.notes || workout.notes;

    const updatedWorkout = await workout.save();
    res.json(updatedWorkout);
  } else {
    res.status(404);
    throw new Error('Workout not found');
  }
}));

// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
// @access  Private
router.delete('/:id', protect, asyncHandler(async (req, res) => {
  const workout = await Workout.findOne({ _id: req.params.id, user: req.user._id });

  if (workout) {
    await workout.deleteOne();
    res.json({ message: 'Workout removed' });
  } else {
    res.status(404);
    throw new Error('Workout not found');
  }
}));

export default router; 