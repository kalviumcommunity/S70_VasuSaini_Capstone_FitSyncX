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

