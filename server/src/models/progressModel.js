//updated

import mongoose from 'mongoose';

const measurementSchema = new mongoose.Schema({
  chest: Number,
  waist: Number,
  hips: Number,
  thighs: Number,
  biceps: Number,
});

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    weight: {
      type: Number,
      required: [true, 'Please add your current weight'],
    },
    bodyFat: {
      type: Number,
      min: 0,
      max: 100,
    },
    measurements: measurementSchema,
    date: {
      type: Date,
      default: Date.now,
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

const Progress = mongoose.model('Progress', progressSchema);

export default Progress; 