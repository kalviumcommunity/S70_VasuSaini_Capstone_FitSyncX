import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { protect } from '../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken';
import passport from '../config/passport.js';

const router = express.Router();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret_key_here', {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

// Only add Google OAuth routes if credentials are available
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  // @desc    Auth with Google
  // @route   GET /api/users/auth/google
  // @access  Public
  router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  // @desc    Google auth callback
  // @route   GET /api/users/auth/google/callback
  // @access  Public
  router.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
      res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        picture: req.user.picture,
        token: generateToken(req.user._id),
      });
    }
  );
}

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
router.post('/', asyncHandler(async (req, res) => {
  const { name, email, password, height, currentWeight, targetWeight, activityLevel, goalType } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    height,
    currentWeight,
    targetWeight,
    activityLevel,
    goalType,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      height: user.height,
      currentWeight: user.currentWeight,
      targetWeight: user.targetWeight,
      activityLevel: user.activityLevel,
      goalType: user.goalType,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
}));

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      height: user.height,
      currentWeight: user.currentWeight,
      targetWeight: user.targetWeight,
      activityLevel: user.activityLevel,
      goalType: user.goalType,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
}));

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      height: user.height,
      currentWeight: user.currentWeight,
      targetWeight: user.targetWeight,
      activityLevel: user.activityLevel,
      goalType: user.goalType,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
}));

export default router;