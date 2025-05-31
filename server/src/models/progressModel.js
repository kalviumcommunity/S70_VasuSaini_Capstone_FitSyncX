//updated

import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  weight: {
    type: Number,
    required: [true, 'Please add your current weight']
  },
  bodyFat: {
    type: Number
  },
  measurements: {
    chest: Number,
    waist: Number,
    hips: Number,
    biceps: Number,
    thighs: Number
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: String
}, {
  timestamps: true
});

const Progress = mongoose.model('Progress', progressSchema);

export default Progress; 