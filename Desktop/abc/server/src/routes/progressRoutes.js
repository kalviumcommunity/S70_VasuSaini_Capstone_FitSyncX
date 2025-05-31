import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';
import Progress from '../models/progressModel.js';

const router = express.Router();

// @desc    Get all progress entries for a user
// @route   GET /api/progress
// @access  Private
router.get('/', protect, asyncHandler(async (req, res) => {
  const progress = await Progress.find({ user: req.user._id }).sort('-date');
  res.json(progress);
}));

// @desc    Get single progress entry
// @route   GET /api/progress/:id
// @access  Private
router.get('/:id', protect, asyncHandler(async (req, res) => {
  const progress = await Progress.findOne({ _id: req.params.id, user: req.user._id });
  
  if (progress) {
    res.json(progress);
  } else {
    res.status(404);
    throw new Error('Progress entry not found');
  }
}));

