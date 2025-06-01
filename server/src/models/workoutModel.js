//updated

import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  notes: String
});

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Please add a workout name']
  },
  type: {
    type: String,
    required: [true, 'Please select workout type'],
    enum: ['strength', 'cardio', 'hiit', 'flexibility', 'other']
  },
  duration: {
    type: Number,
    required: [true, 'Please add workout duration in minutes']
  },
  exercises: [exerciseSchema],
  date: {
    type: Date,
    default: Date.now
  },
  caloriesBurned: {
    type: Number,
    required: [true, 'Please add calories burned']
  },
  notes: String
}, {
  timestamps: true
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout; 