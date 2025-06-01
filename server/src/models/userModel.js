//updated

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      validate: [validator.isEmail, 'Please add a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    height: {
      type: Number,
      required: [true, 'Please add your height in cm'],
    },
    currentWeight: {
      type: Number,
      required: [true, 'Please add your current weight in kg'],
    },
    targetWeight: {
      type: Number,
      required: [true, 'Please add your target weight in kg'],
    },
    activityLevel: {
      type: String,
      required: [true, 'Please select your activity level'],
      enum: ['sedentary', 'light', 'moderate', 'active', 'very active'],
    },
    goalType: {
      type: String,
      required: [true, 'Please select your goal'],
      enum: ['lose', 'maintain', 'gain'],
    },
    googleId: String,
    picture: String,
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User; 