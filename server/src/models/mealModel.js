//updated

import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add a meal name'],
    },
    calories: {
      type: Number,
      required: [true, 'Please add calories'],
    },
    protein: {
      type: Number,
      required: [true, 'Please add protein content'],
    },
    carbs: {
      type: Number,
      required: [true, 'Please add carbs content'],
    },
    fats: {
      type: Number,
      required: [true, 'Please add fats content'],
    },
    mealType: {
      type: String,
      required: [true, 'Please select meal type'],
      enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Meal = mongoose.model('Meal', mealSchema);

export default Meal; 